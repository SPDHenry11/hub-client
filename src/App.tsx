import { useEffect, useState } from "react";
import {
	initializeDiscord,
	subscribeToParticipants,
} from "./DiscordManager";

import Header from "./components/Header";
import MinigameSelection from "./components/MinigameSelection";
import GameOverlay from "./components/GameOverlay";

import type { Player } from "./components/PlayerSlot";

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

	const [
		players,
		setPlayers,
	] = useState<Player[]>([]);

	useEffect(() => {

		let unsubscribe:
			(() => void) | undefined;

		async function initialize() {

			try {

				await initializeDiscord();

				unsubscribe =
					subscribeToParticipants(
						setPlayers
					);

				setIsDiscord(true);
				setDiscordReady(true);
			}
			catch (error) {

				console.warn(
					"Running outside Discord.",
					error
				);

				setIsDiscord(false);
				setDiscordReady(true);
			}
		}

		initialize();

		return () => {

			if (unsubscribe) {
				unsubscribe();
			}
		};

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

			<Header
				players={
					players
				}
			/>
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