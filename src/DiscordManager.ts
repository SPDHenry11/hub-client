import {
	DiscordSDK
} from "@discord/embedded-app-sdk";

let discordSdk:
	DiscordSDK | null = null;

let initialized = false;

export async function
initializeDiscord() {

	if (initialized) {
		return discordSdk;
	}

	if (!discordSdk) {
		discordSdk =
			new DiscordSDK(
				import.meta.env
					.VITE_DISCORD_CLIENT_ID
			);
	}

	await discordSdk.ready();

	const { code } =
		await discordSdk.commands
			.authorize({
				client_id:
					import.meta.env
						.VITE_DISCORD_CLIENT_ID,

				response_type:
					"code",

				state: "",

				prompt:
					"none",

				scope: [
					"identify",
					"applications.commands",
				],
			});

	const response =
		await fetch(
			`${import.meta.env.VITE_SERVER_URL}/api/token`,
			{
				method: "POST",

				headers: {
					"Content-Type":
						"application/json",
				},

				body:
					JSON.stringify({
						code,
					}),
			}
		);

	const {
		access_token,
	} = await response.json();

	await discordSdk.commands
		.authenticate({
			access_token,
		});

	initialized = true;

	return discordSdk;
}

export function
getDiscordSdk() {

	if (!discordSdk) {
		throw new Error(
			"Discord SDK not initialized."
		);
	}

	return discordSdk;
}