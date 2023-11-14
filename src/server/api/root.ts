import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { storeRouter } from "./routers/store";
import { productRouter } from "./routers/product";
import { cartRouter } from "./routers/cart";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  store: storeRouter,
  product: productRouter,
  cart:cartRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
