import Loading from "@/components/loading";
import { trpc } from "@/util/trpc";
import { Inter } from "next/font/google";
import { FormEvent, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	// Testing only, no need to move the state and functions into hooks
	const [numbers, setnumbers] = useState<number[]>([]);
	const [number, setnumber] = useState<number>(0);
	const total = trpc.addNumbers.useQuery({ numbers }, [numbers]);
	const mutate = trpc.mutateSomething.useMutation();

	const isInt = (value: unknown) => {
		return (
			!isNaN(value) &&
			parseInt(Number(value)) == value &&
			!isNaN(parseInt(value, 10))
		);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.stopPropagation();
		e.preventDefault();
		if (isInt(number)) {
			mutate.mutate({
				text: `Added ${number} to numbers`,
				user: "John Doe",
			});
			setnumbers([...numbers, parseInt(number)]);
			setnumber(0);
		}
	};

	if (!total.data) return <Loading />;

	return (
		<main className="w-screen h-screen bg-white p-4 flex flex-col gap-2">
			<div className="stats shadow max-w-xs">
				<div className="stat">
					<div className="stat-title">[{numbers.join(" , ")}]</div>
					<div className="stat-value">{total.data.result}</div>
					<div className="stat-description">
						Sum of every number on the list
					</div>
				</div>
			</div>
			<form onSubmit={handleSubmit} className="flex space-x-2 flex-row">
				<input
					type="text"
					className={`input input-bordered ${
						isInt(number) ? "input-success" : "input-error"
					}`}
					placeholder="Add number to the list.."
					value={number}
					onChange={(e) => setnumber(e.target.value)}
				/>
				<button className="btn btn-primary">
					Add Number to the list
				</button>
			</form>
		</main>
	);
}
