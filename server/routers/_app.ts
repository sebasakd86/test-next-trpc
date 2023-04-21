import { z } from "zod";
import { procedure, router } from "../trpc";

const addNumbersInput = z.object({ numbers: z.array(z.number()) });

const addNumbers = procedure.input(addNumbersInput).query(({ input }) => ({
	result: input.numbers.reduce((pv, cv) => pv + cv, 0),
}));

const mutateSomethingInput = z.object({
	user: z.string(),
	text: z.string(),
});

const mutateSomething = procedure
	.input(mutateSomethingInput)
	.mutation(({ input }) => {
		console.info(`${input.user} -> ${input.text}`);
		return {
			ok: 1,
		};
	});

export const appRouter = router({
	addNumbers,
	mutateSomething,
});

// export type definition of API
export type AppRouter = typeof appRouter;
