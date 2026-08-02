import "./MinigameSelection.css";

type Minigame = {
	id: string;
	title: string;
	image: string;
};

type StoreCard = {
	id: string;
	title: string;
	image: string;
};

type Props = {
	onLaunchGame: (
		minigameId: string
	) => void;

	onOpenStore: () => void;
};

const minigames: Minigame[] = [

	{
		id: "cups-and-balls",
		title: "Cups & Balls",
		image: "/minigames/cups-and-balls.png",
	},

	{
		id: "memory-match",
		title: "Memory Match",
		image: "/minigames/memory-match.png",
	},

	{
		id: "snake",
		title: "Snake",
		image: "/minigames/snake.png",
	},
];

const store: StoreCard = {
	id: "store",
	title: "Store",
	image: "/minigames/store.png",
};

function MinigameSelection({
	onLaunchGame,
	onOpenStore,
}: Props) {

	return (
		<section
			className="minigame-selection"
		>

			<div
				className="minigame-grid"
			>

				{
					minigames.map(
						minigame => (

							<button
								key={
									minigame.id
								}
								className="minigame-card"
								onClick={() =>
									onLaunchGame(
										minigame.id
									)
								}
							>

								<img
									className="minigame-card-image"
									src={
										minigame.image
									}
									alt={
										minigame.title
									}
								/>

								<div
									className="minigame-card-title"
								>
									{
										minigame.title
									}
								</div>

							</button>
						)
					)
				}

				<button
					className="minigame-card"
					onClick={
						onOpenStore
					}
				>

					<img
						className="minigame-card-image"
						src={
							store.image
						}
						alt={
							store.title
						}
					/>

					<div
						className="minigame-card-title"
					>
						{
							store.title
						}
					</div>

				</button>

			</div>

		</section>
	);
}

export default MinigameSelection;