import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
// import { logoutAction } from "../../actions/loginActions";
import { LoginContext } from "../../context/LoginContext";
import { deleteUserFromCookie } from "../../cookies/cookies";
import { logOut } from "../../server/auth"

const Header = () => {
	const { userData, dispatchUserData } = useContext(LoginContext);
	const history = useHistory();

	const onClickLogout = () => {
		logOut(userData.token)
		dispatchUserData({token: '', user: null });
		deleteUserFromCookie();
		history.push("/home");

	};

	return (
		<div className="header">
			<div className="header__nav">
				<div className="header__title">
					World Of Draughts</div>
				<div>
					{
						!!userData.user ?
							<div className="header__logout-nav" onClick={ onClickLogout }>Logout</div> : ""
					}
				</div>
			</div>
		</div>
	);
};

export default Header;
