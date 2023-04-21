import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
	addNumbers: procedure
		.input(z.object({ numbers: z.array(z.number()) }))
		.query(({ input }) => ({
			result: input.numbers.reduce((pv, cv) => pv + cv, 0),
		})),
	mutateSomething: procedure
		.input(
			z.object({
				user: z.string(),
				text: z.string(),
			})
		)
		.mutation(({ input }) => {
			console.info(`${input.user} -> ${input.text}`);
			return {
				ok: 1,
			};
		}),
});

// export type definition of API
export type AppRouter = typeof appRouter;
