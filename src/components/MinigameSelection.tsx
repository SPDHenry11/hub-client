import "./MinigameSelection.css";

export type Minigame = {
	id: string;
	title: string;
	image: string;
	url: string;
};

type Props = {
	onLaunchGame: (url: string) => void;
};

const minigames: Minigame[] = [
	{
		id: "cups-and-balls",
		title: "Cups & Balls",
		image: "/minigames/cups-and-balls.png",
		url: "https://example.com/cups-and-balls",
	},
		{
		id: "cups-and-balls",
		title: "Cups & Balls",
		image: "/minigames/cups-and-balls.png",
		url: "https://example.com/cups-and-balls",
	},
		{
		id: "cups-and-balls",
		title: "Cups & Balls",
		image: "/minigames/cups-and-balls.png",
		url: "https://example.com/cups-and-balls",
	},
		{
		id: "cups-and-balls",
		title: "Cups & Balls",
		image: "/minigames/cups-and-balls.png",
		url: "https://example.com/cups-and-balls",
	},
		{
		id: "cups-and-balls",
		title: "Cups & Balls",
		image: "/minigames/cups-and-balls.png",
		url: "https://example.com/cups-and-balls",
	},
		{
		id: "cups-and-balls",
		title: "Cups & Balls",
		image: "/minigames/cups-and-balls.png",
		url: "https://example.com/cups-and-balls",
	},
		{
		id: "cups-and-balls",
		title: "Cups & Balls",
		image: "/minigames/cups-and-balls.png",
		url: "https://example.com/cups-and-balls",
	},
];

function MinigameSelection({
	onLaunchGame,
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
								className="
									minigame-card
								"
								onClick={() =>
									onLaunchGame(
										minigame.url
									)
								}
							>

								<img
									className="
										minigame-card-image
									"
									src={
										minigame.image
									}
									alt={
										minigame.title
									}
								/>

								<div
									className="
										minigame-card-title
									"
								>
									{
										minigame.title
									}
								</div>

							</button>
						)
					)
				}

			</div>

		</section>
	);
}

export default MinigameSelection;