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

    
    })
});
