import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LoggedInUserContext } from "../../../context/LoggedInUserProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { loggedInUser, logIn, logOut } = useContext(LoggedInUserContext);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  let location = useLocation();

  const handleChange = (key, value) => {
    setStatus("idle");
    setFormData({
      ...formData,
      [key]: value
    })
  }

  const handleSubmit = (e, formData) => {
    console.log(formData);
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
      form.classList.add('was-validated')
      if (!form.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        setStatus("fetching");
        e.preventDefault();

        fetch("/api/postUser", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)                
        })
        .then(response => response.json())
        .then(data => {
          if (data.status === 201) {
            console.log("Passa aqui")
            logIn(data);
            navigate("/");
          } else if (data.status === 404) {
            setStatus(data.message);
            console.log(status)
            throw new Error(data.message);
          }
        })
        .catch((error) => {
          console.error(error);
          setStatus(error.message);
        })
      }
  })
}

return(
  <div className="container" style={{backgroundColor: "#ff83000a"}}>
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="d-flex justify-content-center col-md-9 col-lg-6 col-xl-5">
        <img src="/assets/cookWoman.png" class="img-fluid" alt="Sample image" style={{height: "440px", marginTop: "30px", marginBottom: "30px"}}/>
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        {location.pathname === "/login" && <h5 class="mb-3 pb-3 text-center" style={{letterSpacing: "1px", color: "#F69322", fontSize: "38px"}}>Sign into your account</h5>}
        {location.pathname === "/sign-up" && <h5 class="mb-3 pb-3 text-center" style={{letterSpacing: "1px", color: "#F69322", fontSize: "38px"}}>Create an account</h5>}
        {location.pathname === "/account" && <h5 class="mb-3 pb-3 text-center" style={{letterSpacing: "1px", color: "#F69322", fontSize: "38px"}}>Modify an account</h5>}

        <form className="needs-validation" onSubmit={(e) => handleSubmit(e, formData)} noValidate >
          <div className="row g-3">
            <div className="col-12">
              <input type="email" className="form-control" id="email" placeholder="Enter your email adress" onChange={(e) => handleChange("email", e.target.value)} required/>
              <div className="invalid-feedback">
                Please enter a valid email address.
              </div>
            </div>
            <div className="col-12">
              <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={(e) => handleChange("password", e.target.value)} required/>
              <div className="invalid-feedback">
                Please enter your password.
              </div>
            </div>
          </div>
          {location.pathname === "/login" && <button type="submit" className="w-100 btn btn-primary btn-lg my-4">Login</button>}
          {location.pathname === "/sign-up" && <button type="submit" className="w-100 btn btn-primary btn-lg my-4">Create account</button>}
          {location.pathname === "/account" && <button type="submit" className="w-100 btn btn-primary btn-lg my-4">Modify account</button>}
          {status !== "idle" && status !== "fetching" && <div className="invalid-feedback" style={{display:"block"}}>{status}</div>}
        </form>
          <div class="text-center text-lg-start mt-1 pt-2 mb-3">
            {location.pathname === "/login" && <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account?&nbsp;
                <a href="/sign-up" class="link-danger">
                    Sign-up here
                </a>
            </p>}
            {location.pathname === "/sign-up" && <p class="small fw-bold mt-2 pt-1 mb-0">Have already an account?&nbsp;
                <a href="/login" class="link-danger">
                    Login here
                </a>
            </p>}
          </div>
        
      </div>
      </div>
        </div>
    )
}

export default Login