import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const storeRouter = createTRPCRouter({
    createStore: protectedProcedure.input(z.object({ name: z.string().min(3), address: z.string().min(3) })).mutation(async ({ ctx, input }) => {
        const { name, address } = input;
        const userId = ctx.userId;

        try {
            await ctx.db.store.create({
                data: {
                    name,
                    address,
                    userId
                },
            });
        } catch (error) {
            console.log(error);
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Error creating store",
            });
        }
    }),

    getUserStore: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.userId;

        const store = await ctx.db.store.findFirst({
            where: {
                userId

            },
            select: {
                id: true,
                name: true,
                address: true,
                banner_key: true,
            }
        });

        return store;

    
    }),

    updateStore: protectedProcedure.input(z.object({ name: z.string().min(3), address: z.string().min(3), banner_key:z.string() })).mutation(async ({ ctx, input }) => {
        const { name, address, banner_key } = input;

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

        await ctx.db.store.update({
            where: {
                userId,
                id: store.id
            },
            data: {
                name,
                address,
                banner_key
            },
        });

        
    }),

    getS3Url: publicProcedure.input(z.object({file_key:z.string()})).query(({input}) => {
        const { file_key } = input;
        if (!file_key) {
            return "";
        }
        const url = `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.af-south-1.amazonaws.com/${file_key.replace(' ', '+')}`;
        
        return url;
    }),

    getAllStoreProducts: protectedProcedure.query(async ({ ctx }) => {
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
    
        const products = await ctx.db.product.findMany({
          where: {
            storeId: store.id
          },
          include: {
            priceAndsize: {
                select: {
                    size: true,
                    price: true,
                    quantity: true,
                }
            },
            images: {
                select: {
                    id: true,
                    key: true,
                }
            },  
          }   
        });
    
        return products;
      }),
});
