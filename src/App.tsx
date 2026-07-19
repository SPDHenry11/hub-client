import { useEffect, useState } from "react";
import { getDiscordSdk } from "./DiscordManager";

import Header from "./components/Header";
import MinigameSelection from "./components/MinigameSelection";
import GameOverlay from "./components/GameOverlay";

function App() {

	const [
		discordReady,
		setDiscordReady,
	] = useState(false);

	const [
		isDiscord,
		setIsDiscord,
	] = useState(false);

	const [
		activeGameUrl,
		setActiveGameUrl,
	] = useState<string | null>(
		null
	);

	useEffect(() => {

		async function initializeDiscord() {

			try {

				const discordSdk =
					getDiscordSdk();

				await discordSdk.ready();

				console.log(
					"Discord SDK ready!"
				);

				setIsDiscord(true);
				setDiscordReady(true);
			}
			catch (error) {

				console.warn(
					"Running outside Discord.",
					error
				);

				// Allow local browser testing
				setIsDiscord(false);
				setDiscordReady(true);
			}
		}

		initializeDiscord();

	}, []);

	if (!discordReady) {
		return (
			<div>
				Initializing Discord...
			</div>
		);
	}

	return (
		<div className="app">

			<Header />

			{
				!isDiscord &&
				<div>
					Local Development Mode
				</div>
			}

			<MinigameSelection
				onLaunchGame={
					setActiveGameUrl
				}
			/>

			{
				activeGameUrl &&
				<GameOverlay
					url={
						activeGameUrl
					}
					onClose={() =>
						setActiveGameUrl(
							null
						)
					}
				/>
			}

		</div>
	);
}

export default App;