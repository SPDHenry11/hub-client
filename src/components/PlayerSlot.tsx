import "./PlayerSlot.css";

export type Player = {
	id: string;
	username: string;
	avatar: string;
	score: number;
};

type Props = {
	player?: Player;
};

function PlayerSlot(
	{
		player,
	}: Props
) {

    if (!player) {
        return (
            <button
                className="
                    player-slot
                    invite-slot
                "
            >

                <div
                    className="
                        player-slot-icon
                    "
                >
                    +
                </div>

                <div
                    className="
                        player-slot-text
                    "
                >
                    Invite
                </div>

            </button>
        );
    }

	return (
		<div
			className="player-slot occupied-slot"
		>

			<img
				className="player-avatar"
				src={player.avatar}
				alt={player.username}
			/>

			<div
				className="player-name"
			>
				{player.username}
			</div>

		</div>
	);
}

export default PlayerSlot;