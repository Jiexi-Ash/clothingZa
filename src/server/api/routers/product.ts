import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const productRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  addProduct: protectedProcedure.input(z.object({
    name: z.string(),
    description: z.string(),
    smallPrice: z.coerce.number().optional(),
    mediumPrice: z.coerce.number().optional(),
    largePrice: z.coerce.number().optional(),
    extraLargePrice: z.coerce.number().optional(),
    extraExtraLargePrice: z.coerce.number().optional(),
    smallSize: z.coerce.number().optional(),
    mediumSize: z.coerce.number().optional(),
    largeSize: z.coerce.number().optional(),
    extraLargeSize: z.coerce.number().optional(),
    extraExtraLargeSize: z.coerce.number().optional(),
    image_key: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const { name, description, smallPrice, mediumPrice, largePrice, extraLargePrice, extraExtraLargePrice, smallSize, mediumSize, largeSize, extraLargeSize, extraExtraLargeSize, image_key } = input;
    const userId = ctx.userId;

    const store = await ctx.db.store.findFirst({
      where: {
        userId
      }
    });

    if (!store) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error updating store",
      });
    }

    // create array of objects with size and price
    const productQuantitySizeAndPriceArray = [
      { size: "small", price: smallPrice, quantity: smallSize },
      { size: "medium", price: mediumPrice, quantity: mediumSize },
      { size: "large", price: largePrice, quantity: largeSize },
      { size: "extra large", price: extraLargePrice, quantity: extraLargeSize },
      { size: "extra extra large", price: extraExtraLargePrice, quantity: extraExtraLargeSize },
    ];

    try {
      await ctx.db.product.create({
        data: {
          name,
          description,
          store: {
            connect: {
              id: store.id,
            },
          },
          price: {
            create: productQuantitySizeAndPriceArray.map((item) => ({
              price: item.price ?? 0,
              size: {
                create: {
                  quantity: item.quantity ?? 0,
                  size: item.size,
                },
              },
            })),
          },
          images: {
            create: {
              key: image_key,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error creating product",
      });
    }
  }),

});
