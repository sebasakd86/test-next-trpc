import { trpc } from "@/util/trpc";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const numbers = [1, 2, 3, 4, 5, 6, 7];
	const total = trpc.addNumbers.useQuery({ numbers });
	if (!total.data)
		return (
			<div className="w-screen h-screen flex z-50 items-center justify-center">
				<span className="text-3xl">Loading...</span>
			</div>
		);
	return (
		<main className="w-screen h-screen bg-white">
			<span className="p-2 text-blue-600 ">
				Sum of [{numbers.join(" , ")}] =&nbsp;
			</span>
			<span className="text-blue-800 font-bold">{total.data.result}</span>
		</main>
	);
}
