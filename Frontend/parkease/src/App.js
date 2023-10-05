import {Routes, Route, BrowserRouter} from 'react-router-dom'
import ShowUsuarios from './components/ShowUsuarios'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<ShowUsuarios></ShowUsuarios>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;