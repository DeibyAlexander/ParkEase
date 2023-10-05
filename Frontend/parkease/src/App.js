import './App.css'
import Read from './components/Usuarios/read';
import { BrowserRouter as Router, Route } from 'react-router-dom';




function App() {
  return (
    <Router>
      <div className='main'>
        <h2 className='main-header'>Usuarios</h2>
        <div style={{marginTop:20}}>
          <Route exact path='/' component={Read}></Route>
        </div>
      </div>
    </Router>

  );
}

export default App;
