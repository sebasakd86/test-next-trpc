import { trpc } from "@/util/trpc";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const hello = trpc.hello.useQuery({ text: "client" });
	if (!hello.data)
		return (
			<div className="w-screen h-screen flex z-50 items-center justify-center">
				<span className="text-3xl">Loading...</span>
			</div>
		);
	return (
		<main className="w-screen h-screen bg-white">
			{hello.data.greeting}
		</main>
	);
}
