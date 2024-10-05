const Footer = () => {
    return (
<div class="container" style={{backgroundColor: "#ff83000a"}}>
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
    <p class="col-md-4 mb-0 text-body-secondary">&copy; 2024 Company, Inc</p>

    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <img className="bi me-2" width="80" height="80" src="/assets/cookHat.png" alt="A Hat" />
                <div style={{color: "#F69322"}}>
                Mestre Cuca
              </div>

    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-dark">Recipes</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-dark">Favorites</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-dark">Contact</a></li>
    </ul>
  </footer>
</div>
    )
}

export default Footer