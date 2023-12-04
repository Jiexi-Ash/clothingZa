import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";

export const cartRouter = createTRPCRouter({
  addToCart: publicProcedure
    .input(
      z.object({
        productId: z.number(),
        size: z.number(),
        quantity: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const cookieStore = cookies();
      const userId = ctx.user?.id;
      console.log(userId);

      const getCart = async () => {
        if (userId) {
          const cart = await ctx.db.cart.findFirst({
            where: {
              userId: userId,
            },
            include: {
              items: {
                include: {
                  priceAndsize: true,
                },
              },
            },
          });

          if (!cart) return null;

          return cart;
        } else {
          const cartId = cookieStore.get("cartId")?.value;

          const cart = cartId
            ? await ctx.db.cart.findUnique({
                where: {
                  id: cartId,
                },
                include: {
                  items: {
                    include: {
                      priceAndsize: {
                        include: {
                          product: {
                            include: {
                              images: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              })
            : null;

          return cart;
        }
      };

      const createCart = async () => {
        if (userId) {
          const cart = await ctx.db.cart.create({
            data: {
              userId: userId,
            },

            include: {
              items: {
                include: {
                  priceAndsize: true,
                },
              },
            },
          });

          return cart;
        } else {
          const cart = await ctx.db.cart.create({
            data: {
              userId: userId,
            },

            include: {
              items: {
                include: {
                  priceAndsize: true,
                },
              },
            },
          });

          cookieStore.set("cartId", cart.id);

          return cart;
        }
      };

      const cart = (await getCart()) ?? (await createCart());

      if (cart) {
        const cartItem = cart.items.find(
          (item) =>
            item.priceAndsize.productId === input.productId &&
            item.priceAndsize.id === input.size,
        );

        if (cartItem) {
          cartItem.quantity += input.quantity;
          await ctx.db.cart.update({
            where: {
              id: cart.id,
            },
            data: {
              items: {
                update: {
                  where: {
                    id: cartItem.id,
                  },
                  data: {
                    quantity: cartItem.quantity,
                  },
                },
              },
            },
          });
        } else {
          const size = await ctx.db.priceAndsize.findUnique({
            where: {
              id: input.size,
            },
          });

          if (size) {
            await ctx.db.cart.update({
              where: {
                id: cart.id,
              },
              data: {
                items: {
                  create: {
                    priceAndsizeId: size.id,
                    quantity: input.quantity,
                  },
                },
              },
            });
          }
        }
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Cart not found",
        });
      }
    }),

  getUserCart: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.id;
    console.log(userId);

    if (userId) {
      const cart = await ctx.db.cart.findFirst({
        where: {
          userId: userId,
        },
        include: {
          items: {
            include: {
              priceAndsize: {
                include: {
                  product: {
                    include: {
                      images: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return cart;
    } else {
      const cookieStore = cookies();
      const cartId = cookieStore.get("cartId")?.value;

      if (cartId) {
        const cart = await ctx.db.cart.findUnique({
          where: {
            id: cartId,
          },
          include: {
            items: {
              include: {
                priceAndsize: {
                  include: {
                    product: {
                      include: {
                        images: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        return cart;
      }
    }

    //TODO: if user is not logged in get cart from cookie
  }),

  removeItemFromCart: publicProcedure
    .input(
      z.object({
        itemId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user?.id;

      if (userId) {
        const cart = await ctx.db.cart.findFirst({
          where: {
            userId: userId,
          },
        });

        if (!cart) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Cart not found",
          });
        }

        await ctx.db.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            items: {
              delete: {
                id: input.itemId,
              },
            },
          },
        });
      } else {
        const cookieStore = cookies();
        const cartId = cookieStore.get("cartId")?.value;

        if (!cartId) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "CarId not found",
          });
        }

        const cart = await ctx.db.cart.findUnique({
          where: {
            id: cartId,
          },
        });

        if (!cart) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Cart not found",
          });
        }

        await ctx.db.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            items: {
              delete: {
                id: input.itemId,
              },
            },
          },
        });
      }
    }),

  increaseItemQuantity: publicProcedure
    .input(
      z.object({
        itemId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user?.id;

      if (userId) {
        const cart = await ctx.db.cart.findFirst({
          where: {
            userId: userId,
          },
        });

        if (!cart) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Cart not found",
          });
        }

        await ctx.db.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            items: {
              update: {
                where: {
                  id: input.itemId,
                },
                data: {
                  quantity: {
                    increment: 1,
                  },
                },
              },
            },
          },
        });
      } else {
        const cookieStore = cookies();
        const cartId = cookieStore.get("cartId")?.value;

        if (!cartId) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "CarId not found",
          });
        }

        const cart = await ctx.db.cart.findUnique({
          where: {
            id: cartId,
          },
        });

        if (!cart) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Cart not found",
          });
        }

        await ctx.db.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            items: {
              update: {
                where: {
                  id: input.itemId,
                },
                data: {
                  quantity: {
                    increment: 1,
                  },
                },
              },
            },
          },
        });
      }
    }),

  decreaseItemQuantity: publicProcedure
    .input(
      z.object({
        itemId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user?.id;

      if (userId) {
        const cart = await ctx.db.cart.findFirst({
          where: {
            userId: userId,
          },
        });

        if (!cart) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Cart not found",
          });
        }

        await ctx.db.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            items: {
              update: {
                where: {
                  id: input.itemId,
                },
                data: {
                  quantity: {
                    decrement: 1,
                  },
                },
              },
            },
          },
        });
      } else {
        const cookieStore = cookies();
        const cartId = cookieStore.get("cartId")?.value;

        if (!cartId) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "CarId not found",
          });
        }

        const cart = await ctx.db.cart.findUnique({
          where: {
            id: cartId,
          },
        });

        if (!cart) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Cart not found",
          });
        }

        await ctx.db.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            items: {
              update: {
                where: {
                  id: input.itemId,
                },
                data: {
                  quantity: {
                    decrement: 1,
                  },
                },
              },
            },
          },
        });
      }
    }),
});
