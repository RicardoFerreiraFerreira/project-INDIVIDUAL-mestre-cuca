import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../Loading';

const Recipes = () => {
    const [divisers, setRecipeDivisers] = useState(null);

    useEffect(() => {
        fetch(`/api/getRecipeDivisers`)
            .then(response => response.json())
            .then(data => {
                //const filteredProducts = data.data.filter(product => product.category === category);
                setRecipeDivisers(data.data);
                console.log(data);
            })
            .catch(error => console.error('fetching error', error));
    },[]);

    return(   
        <div className="container" style={{backgroundColor: "#ff83000a"}}>
            <div className="d-flex justify-content-center align-items-center mb-2 mb-lg-0" style={{color: "#F69322", fontSize: "46px", paddingTop: "20px"}}>
                <div className="row">
                    <div className="col">
                        <p style={{textAlign: "center"}}>Chose one recipe diviser</p>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <div class="row row-cols-1 row-cols-sm-2 g-3" style={{width: "750px", marginBottom: "50px"}}>
                { divisers ?
                    divisers.map(diviser => (
                    <div class="col" key={diviser._id}>
                        <Link style={{textDecoration: "none"}} to={`/divisers/${diviser.type}`}>
                            <div class="card">
                                <img src={diviser.imagePath} class="card-img-top img-fluid rounded" style={{height: "40vh", width: "100%", objectFit: "fill"}} alt={diviser.type}/>
                            </div>
                            <h5 style={{color: "#F69322", textAlign: "center", paddingTop: "20px"}}>{diviser.type}</h5>
                        </Link>
                    </div>
                ))
                :<Loading />
                }
                </div>
            </div>
        </div>
    )
}

export default Recipes