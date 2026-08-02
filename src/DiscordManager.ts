import {
	DiscordSDK,
	Events,
	type Types,
} from "@discord/embedded-app-sdk";

import type { Player } from "./components/PlayerSlot";

let discordSdk:
	DiscordSDK | null = null;

let initialized = false;

let activityInstanceId:
	string | null = null;

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
			"/api/token",
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

	activityInstanceId =
		discordSdk.instanceId;

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

export function
getActivityInstanceId() {

	if (!activityInstanceId) {
		throw new Error(
			"Activity instance ID not available."
		);
	}

	return activityInstanceId;
}

export function
subscribeToParticipants(
	callback: (players: Player[]) => void
) {

	const discordSdk =
		getDiscordSdk();

	async function
	updateParticipants(
		participants:
			Types.GetActivityInstanceConnectedParticipantsResponse
	) {

		const players =
			participants.participants.map(
				participant => ({

					id:
						participant.id,

					username:
						participant.global_name ||
						participant.username,

					avatar:
						participant.avatar
							? `https://cdn.discordapp.com/avatars/${participant.id}/${participant.avatar}.png`
							: `https://cdn.discordapp.com/embed/avatars/${(BigInt(participant.id) >> 22n) % 6n}.png`,

					score: 0,
				})
			);

		callback(players);
	}

	discordSdk.subscribe(
		Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE,
		updateParticipants
	);

	return () => {

		discordSdk.unsubscribe(
			Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE,
			updateParticipants
		);
	};
}