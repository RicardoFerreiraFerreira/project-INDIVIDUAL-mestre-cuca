const HomePage = () => {
    return(
        <div className="container" style={{backgroundColor: "#ff83000a"}}>
            <div className="d-flex justify-content-center align-items-center" style={{color: "#F69322", fontSize: "46px", paddingTop: "20px"}}>
                <div className="row">
                    <div className="col">
                        <p style={{textAlign: "center"}}>Welcome to Mestre Cuca</p>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <div className="row" style={{width: "900px", marginBottom: "10px"}}>
                    <div className="col">
                        <div className="d-flex justify-content-center mb-2 mb-lg-0">
                            <img className="img-fluid" width="385" height="385" src="/assets/chef.png" alt="Chef" />            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage