import "./Header.css";

import PlayerSlot,
{
	type Player
}
from "./PlayerSlot";

function Header() {

	const players: Player[] = [];

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