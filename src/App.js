import Login from './Login';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Signup';
import Home from './Home';
import RealHome from './RealHome';
import Admin from './admin/Admin';
//admin
import ListaAdmin from './admin/ListaAdmin';
import ListaUser from './admin/ListaUser';
import ListaCase from './admin/ListaCase';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RealHome />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<Home />}></Route>
        
        {/* ADMIN */}
        <Route path='/admin/admin' element={<Admin />}></Route>
        <Route path='/admin/listaAdmin' element={<ListaAdmin />} />
        <Route path='/admin/listaUser' element={<ListaUser />} />
        <Route path='/admin/listaCase' element={<ListaCase />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;