import { useEffect, useState, React, createContext } from "react";

export const LoggedInUserContext = createContext();

const LoggedInUserProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

	const logIn =  (userObject) => {
		setLoggedInUser(userObject);
	}

	const logOut =  () => {
		setLoggedInUser(null);
	}

	return (
		<LoggedInUserContext.Provider value={{ loggedInUser, logIn, logOut }}>
			{children}
		</LoggedInUserContext.Provider>
	)
}

export default LoggedInUserProvider