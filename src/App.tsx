import { useEffect, useState } from "react";

import {
	initializeDiscord,
	subscribeToParticipants,
	getActivityInstanceId,
} from "./DiscordManager";

import {
	initializeSession,
	launchMinigame,
} from "./SessionManager";

import Header from "./components/Header";
import MinigameSelection from "./components/MinigameSelection";
import GameOverlay from "./components/GameOverlay";

import type { Player } from "./components/PlayerSlot";

import "./App.css";

function App() {

	const [
		discordReady,
		setDiscordReady,
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

				await initializeSession(
					getActivityInstanceId()
				);

				unsubscribe =
					subscribeToParticipants(
						setPlayers
					);

				setDiscordReady(true);
			}
			catch (error) {

				console.error(
					"Failed to initialize Discord:",
					error
				);

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

	async function handleLaunchGame(
		minigameId: string
	) {

		try {

			const result =
				await launchMinigame(
					minigameId
				);

			setActiveGameUrl(
				result.url
			);
		}
		catch (error) {

			console.error(
				"Failed to launch minigame:",
				error
			);
		}
	}

	function handleOpenStore() {

		// TODO:
		// Open the store panel.
	}

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

			<div
				className="section-separator"
			/>

			<MinigameSelection
				onLaunchGame={
					handleLaunchGame
				}
				onOpenStore={
					handleOpenStore
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