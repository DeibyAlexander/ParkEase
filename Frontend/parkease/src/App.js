import {Routes, Route, BrowserRouter} from 'react-router-dom'
import ShowUsuarios from './components/ShowUsuarios'
import ShowClientesFre from './components/ShowClienteFre';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<ShowUsuarios></ShowUsuarios>}></Route>
          <Route path='/hola' element={<ShowClientesFre></ShowClientesFre>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;