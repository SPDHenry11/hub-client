import "./Header.css";

import PlayerSlot,
{
	type Player
}
from "./PlayerSlot";

type Props = {
	players: Player[];
};

function Header({
	players,
}: Props) {

	return (
		<header
			className="header"
		>

			{
				Array.from(
					{ length: 8 },
					(_, index) => (
						<PlayerSlot
							key={index}
							player={
								players[index]
							}
						/>
					)
				)
			}

		</header>
	);
}

export default Header;