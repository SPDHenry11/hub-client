const API_BASE = "/api";

let currentSessionId:
	string | null = null;

export async function
initializeSession(
	sessionId: string
) {

	currentSessionId =
		sessionId;

	const response =
		await fetch(
			`${API_BASE}/session`,
			{
				method: "POST",

				headers: {
					"Content-Type":
						"application/json",
				},

				body:
					JSON.stringify({
						sessionId,
					}),
			}
		);

	if (!response.ok) {
		throw new Error(
			"Failed to initialize session."
		);
	}
}

export function
getSessionId() {

	if (!currentSessionId) {
		throw new Error(
			"Session has not been initialized."
		);
	}

	return currentSessionId;
}

export async function
launchMinigame(
	minigameId: string
) {

	const response =
		await fetch(
			`${API_BASE}/session/minigame`,
			{
				method: "POST",

				headers: {
					"Content-Type":
						"application/json",
				},

				body:
					JSON.stringify({
						sessionId:
							getSessionId(),

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
leaveMinigame() {

	await fetch(
		`${API_BASE}/session/leave`,
		{
			method: "POST",

			headers: {
				"Content-Type":
					"application/json",
			},

			body:
				JSON.stringify({
					sessionId:
						getSessionId(),
				}),
		}
	);
}

export async function
getSessionState() {

	const response =
		await fetch(
			`${API_BASE}/session/${getSessionId()}`
		);

	if (!response.ok) {
		throw new Error(
			"Failed to fetch session state."
		);
	}

	return await response.json();
}