import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect} from "react";
import Loading from '../Loading';

const Diviser = () => {
  const userParam = useParams();
	const [countriesCategories, setCountriesCategories] = useState(null);

  let location = useLocation();
  console.log(location)
  useEffect(() => {
		fetch(`/api/getCountriesCategories/${userParam.id}`)
			.then(response => response.json())
			.then(data => {
				setCountriesCategories(data.data)
        console.log(data);
			})
	}, [userParam.id])

  return(
    <div className="container" style={{backgroundColor: "#ff83000a"}}>
      <div className="d-flex justify-content-center align-items-center" style={{color: "#F69322", fontSize: "46px", paddingTop: "20px"}}>
        <div class="row ">
          <div class="col">
            {location.pathname === "/divisers/Countries" && <p>Chose a country</p>}
            {location.pathname === "/divisers/Categories" && <p>Chose a category</p>}
          </div>
        </div>
      </div>
    <div className="d-flex justify-content-center align-items-center">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{width: "900px", marginBottom: "50px"}}>
      { countriesCategories ?
        countriesCategories.map(countryCategory => (
          <div class="col" key={countryCategory._id}>
            <div class="card">
              <img src={countryCategory.imagePath} class="card-img-top img-fluid rounded" alt={countryCategory.strAreaCategory}/>
              <div class="card-body">
                <h5 class="card-title">{countryCategory.strAreaCategory}</h5>
              </div>
            </div>
          </div>
          ))
      :<Loading />
      }</div>
      </div>
    </div>
    )
}

export default Diviser