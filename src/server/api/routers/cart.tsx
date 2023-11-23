import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const cartRouter = createTRPCRouter({
  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        size: z.number(),
        quantity: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      console.log(userId);

      // if user is logged in get cart from db
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
          try {
            const productDetails = await ctx.db.priceAndsize.findUnique({
              where: {
                id: input.size,
              },
            });
            if (!productDetails) {
              throw new Error("Product not found");
            }

            await ctx.db.cart.create({
              data: {
                userId: userId,
                items: {
                  create: {
                    priceAndsizeId: productDetails?.id,
                    quantity: input.quantity,
                  },
                },
              },
            });
          } catch (error) {
            console.log(error);
          }
        }
      }

      //TODO: if user is not logged in get cart from cookie
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
      }
    }),
});
