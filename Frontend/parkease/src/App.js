import logo from './assets/img/bggdccfa.png';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router className="contenedor-global">
      <div className="contenedor">
        <img className="logo" src={logo} alt="si" ></img>
        <a href="/">Iniciar</a>
      </div>
      
    </Router>
  );
}

export default App;
