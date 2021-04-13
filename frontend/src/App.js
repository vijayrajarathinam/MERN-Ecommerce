import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import { Header, Footer } from "./components/layout";
import ProductDetails from "./components/products/ProductDetails";
import Login from "./components/user/Login";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <div className="container container-fluid">
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/product/:id" component={ProductDetails} />
        <Route path="/login" component={Login} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
