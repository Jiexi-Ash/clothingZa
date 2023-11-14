import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const cartRouter = createTRPCRouter({
  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        size: z.string(),
        quantity: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      // if user is logged in get cart from db
      if (userId) {
        const cart = await ctx.db.cart.findFirst({
          where: {
            userId: userId,
          },
          include: {
            items: {
              include: {
                product: {
                  include: {
                    images: {
                      select: {
                        id: true,
                        key: true,
                      },
                    },
                    priceAndsize: {
                      select: {
                        id: true,
                        price: true,
                        size: true,
                        quantity: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        if (cart) {
          const cartItem = cart.items.find(
            (item) =>
              item.productId === input.productId && item.size === input.size,
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
            await ctx.db.cart.update({
              where: {
                id: cart.id,
              },
              data: {
                items: {
                  create: {
                    productId: input.productId,
                    size: input.size,
                    quantity: input.quantity,
                  },
                },
              },
            });
          }
        } else {
          try {
            await ctx.db.cart.create({
              data: {
                userId: userId,
                items: {
                  create: {
                    productId: input.productId,
                    size: input.size,
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
    }),
});
