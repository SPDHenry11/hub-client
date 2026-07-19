import { DiscordSDK } from "@discord/embedded-app-sdk";

let discordSdk: DiscordSDK | null = null;

export function getDiscordSdk() {
	if (!discordSdk) {
		discordSdk = new DiscordSDK(
			import.meta.env.VITE_DISCORD_CLIENT_ID
		);
	}

	return discordSdk;
}