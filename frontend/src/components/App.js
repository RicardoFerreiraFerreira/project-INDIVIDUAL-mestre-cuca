import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Header from "../components/Header/index"
import HomePage from "./Body/HomePage";
import Login from "./Body/Login";
import Recipes from "./Body/Recipes";
import Diviser from "./Body/Diviser";
import Footer from "./Footer/index"

const App = () => {
    return(
        <Router>
            <Header />
            <Switch>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<Login />} />
                <Route path="/account" element={<Login />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/divisers/:id" element={<Diviser />} />
            </Switch>
            <Footer />
        </Router>        
    )
}

export default App;
