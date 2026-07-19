import { useEffect, useState } from "react";
import { getDiscordSdk } from "./DiscordManager";

function App() {

	const [discordReady, setDiscordReady] = useState(false);

	useEffect(() => {

		async function initializeDiscord() {
			try {
				const discordSdk = getDiscordSdk();

				await discordSdk.ready();

				console.log("Discord SDK ready!");

				setDiscordReady(true);
			}
			catch (error) {
				console.error(
					"Discord SDK initialization failed:",
					error
				);
			}
		}

		initializeDiscord();

	}, []);

	return (
		<div>
			<h1>HUB</h1>

			{
				discordReady
					? <p>Discord SDK initialized successfully!</p>
					: <p>Waiting for Discord...</p>
			}
		</div>
	);
}

export default App;