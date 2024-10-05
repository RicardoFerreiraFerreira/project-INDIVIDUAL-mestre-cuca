import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../context/LoggedInUserProvider";

const Header = () => {

  const { loggedInUser, logOut } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  const handleClick = (e, logInOut) => {
    e.preventDefault();
    if(logInOut === "login")
      navigate("/login");
    else if(logInOut === "logout") {
      logOut();
    }
  }

  const handleClickSignUp = (e, signUp) => {
    e.preventDefault();
    if(signUp === "signup")
      navigate("/sign-up");
    else if(signUp === "modify") {
      navigate("/account");
    }
  }

  return(
    <div class="container">
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom">
        <div class="col-md-3 mb-2 mb-md-0">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img className="bi me-2" width="80" height="80" src="/assets/cookHat.png" alt="A hat" />
            <div style={{color: "#F69322"}}>
                Mestre Cuca
            </div>
          </a>
        </div>
        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><a href="/" className="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="/recipes" className="nav-link px-2 text-dark">Recipes</a></li>
          <li><a href="#" className="nav-link px-2 text-dark">Favorites</a></li>
          <li><a href="#" className="nav-link px-2 text-dark">Contact</a></li>
        </ul>
        <div class="col-md-3 text-end">
          { loggedInUser === null && <button type="button" className="btn btn-light me-2" onClick={(e) => handleClick(e, "login")}>Login</button>}
          { loggedInUser && <button type="button" className="btn btn-light me-2" onClick={(e) => handleClick(e, "logout")}>Logout</button>}
          { loggedInUser === null && <button type="button" className="btn btn-warning" onClick={(e) => handleClickSignUp(e, "signup")}>Sign-up</button>}
          { loggedInUser && <button type="button" className="btn btn-warning" onClick={(e) => handleClickSignUp(e, "modify")}>Account</button>}
        </div>
      </header>
    </div>
  )
}

export default Header;


