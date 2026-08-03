const API_BASE = "/api";

let currentInstanceId:
	string | null = null;

export async function
initializeSession(
	instanceId: string
) {

	currentInstanceId =
		instanceId;

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
						instanceId,
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
getInstanceId() {

	if (!currentInstanceId) {
		throw new Error(
			"Session has not been initialized."
		);
	}

	return currentInstanceId;
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
						instanceId:
							getInstanceId(),

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
					instanceId:
						getInstanceId(),
				}),
		}
	);
}

export async function
getSessionState() {

	const response =
		await fetch(
			`${API_BASE}/session/${getInstanceId()}`
		);

	if (!response.ok) {
		throw new Error(
			"Failed to fetch session state."
		);
	}

	return await response.json();
}