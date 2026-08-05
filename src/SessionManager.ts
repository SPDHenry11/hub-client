import {
	activityInstanceId,
} from "./DiscordManager";

const API_BASE = "/api";

let socket:
	WebSocket | null = null;

export async function
initializeSession() {

	const response =
		await fetch(
			`${API_BASE}/session/${activityInstanceId}`,
			{
				method: "POST",
			}
		);

	if (!response.ok) {
		throw new Error(
			"Failed to initialize session."
		);
	}

	// =========================
	// Test WebSocket Connection
	// =========================

	socket =
		new WebSocket(
			`${location.origin.replace(
				/^http/,
				"ws"
			)}${API_BASE}/session/${activityInstanceId}/ws`
		);

	socket.onopen =
		() => {

			console.log(
				"WebSocket connected."
			);
		};

	socket.onmessage =
		event => {

			console.log(
				"WebSocket message:",
				event.data
			);
		};

	socket.onerror =
		error => {

			console.error(
				"WebSocket error:",
				error
			);
		};

	socket.onclose =
		event => {

			console.log(
				"WebSocket closed:",
				event.code,
				event.reason
			);

			socket = null;
		};
}

export async function
launchMinigame(
	minigameId: string
) {

	const response =
		await fetch(
			`${API_BASE}/session/${activityInstanceId}/minigame`,
			{
				method: "POST",

				headers: {
					"Content-Type":
						"application/json",
				},

				body:
					JSON.stringify({
						minigameId,
					}),
			}
		);

	if (!response.ok) {
		throw new Error(
			"Failed to launch minigame."
		);
	}

	return await response.json();
}

export async function
getSessionState() {

	const response =
		await fetch(
			`${API_BASE}/session/${activityInstanceId}`
		);

	if (!response.ok) {
		throw new Error(
			"Failed to fetch session state."
		);
	}

	return await response.json();
}