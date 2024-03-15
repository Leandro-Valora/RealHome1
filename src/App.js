import Login from './Login';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Signup';
import RealHome from './RealHome';
//homepage
import About from './info/About';
import Contatti from './info/Contatti';
import CaseSpeciali from './info/CaseSpeciali';
import HomeSearchGeneric from './HomeSearchGeneric';
//admin
import Admin from './admin/Admin';
import ListaAdmin from './admin/ListaAdmin';
import ListaUser from './admin/ListaUser';
import ListaCase from './admin/ListaCase';
import ListaContatti from './admin/ListaContatti';
import ListaAgente from './admin/ListaAgente';
import ListaPropietario from './admin/ListaPropietario';
import CreateAdmin from './admin/crudAdmin/CreateAdmin';
import CreateUser from './admin/crudAdmin/CreateUser';
import CreateCasa from './admin/crudAdmin/CreateCasa';
import CreateAgente from './admin/crudAdmin/CreateAgente';
import CreatePropierario from './admin/crudAdmin/CreatePropietario';
import ModificaUser from './admin/crudAdmin/ModificaUser';
import ModificaPropietario from './admin/crudAdmin/ModificaPropietario';
import ModificaAgente from './admin/crudAdmin/ModificaAgente';
import ModificaAdmin from './admin/crudAdmin/ModificaAdmin';
import ModificaCasa from './admin/crudAdmin/ModificaCasa';
import AddImageCasa from './admin/crudAdmin/AddImageCasa';
import ModificaImage from './admin/crudAdmin/ModificaImage';
import CaseVendute from './admin/CaseVendute';
import HomeSearchAdmin from './admin/HomeSearchAdmin';
import DettagliCasaAdmin from './admin/DettagliCasaAdmin';
//client
import HomeClient from './Client/HomeClient';
import InfoClient from './Client/InfoClient';
import ModificaClient from './Client/ModificaClient';
import HomeSearch from './Client/HomeSearch';
import DettagliCasa from './Client/DettagliCasa';
import MessaggiClient from './Client/MessaggiClient';
import CasePreferite from './Client/CasePreferite';
//agente
import HomeAgente from './agente/HomeAgente';
import InfoAgente from './agente/InfoAgente';
import ModificaAgent from './agente/ModificaAgent';
import Messaggi from './agente/Messaggi';
import CaseAgente from './agente/CaseAgente';
import MostraImages from './agente/MostraImages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RealHome />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/info/about' element={<About />}></Route>
        <Route path='/info/contatti' element={<Contatti />}></Route>
        <Route path='/info/caseSpeciali' element={<CaseSpeciali />}></Route>
        <Route path='/homesearch' element={<HomeSearchGeneric />}></Route>
        
        {/* ADMIN */}
        <Route path='/admin/admin' element={<Admin />}></Route>
        <Route path='/admin/listaAdmin' element={<ListaAdmin />} />
        <Route path='/admin/listaUser' element={<ListaUser />} />
        <Route path='/admin/listaCase' element={<ListaCase />} />
        <Route path='/admin/listaAgente' element={<ListaAgente />} />
        <Route path='/admin/listaPropietario' element={<ListaPropietario />} />
        <Route path='/admin/listaContatti' element={<ListaContatti />} />
        <Route path='/admin/crudAdmin/createAdmin' element={<CreateAdmin />} />
        <Route path='/admin/crudAdmin/createUser' element={<CreateUser />} />
        <Route path='/admin/crudAdmin/createCasa' element={<CreateCasa />} />
        <Route path='/admin/crudAdmin/createAgente' element={<CreateAgente />} />
        <Route path='/admin/crudAdmin/createPropierario' element={<CreatePropierario />} />
        <Route path='/admin/crudAdmin/modificaUser' element={<ModificaUser />} />
        <Route path='/admin/crudAdmin/modificaPropietario' element={<ModificaPropietario />} />
        <Route path='/admin/crudAdmin/modificaAgente' element={<ModificaAgente />} />
        <Route path='/admin/crudAdmin/modificaAdmin' element={<ModificaAdmin />} />
        <Route path='/admin/crudAdmin/modificaCasa' element={<ModificaCasa />} />
        <Route path='/admin/crudAdmin/addimageCasa' element={<AddImageCasa />} />
        <Route path='/admin/crudAdmin/modificaImage' element={<ModificaImage />} />
        <Route path='/admin/caseVendute' element={<CaseVendute />} />
        <Route path='/admin/homesearch' element={<HomeSearchAdmin />} />
        <Route path='/admin/dettaglicasa' element={<DettagliCasaAdmin />} />
        
        {/* CLIENT */}
        <Route path='/Client/homeClient' element={<HomeClient />} />
        <Route path='/Client/infoClient' element={<InfoClient />} />
        <Route path='/Client/modificaClient' element={<ModificaClient />} />
        <Route path='/Client/homesearch' element={<HomeSearch />} />
        <Route path='/Client/dettaglicasa' element={<DettagliCasa />} />
        <Route path='/Client/messaggi' element={<MessaggiClient />} />
        <Route path='/Client/preferiti' element={<CasePreferite />} />

        {/* AGENTE */}
        <Route path='/agente/homeAgente' element={<HomeAgente />} />
        <Route path='/agente/infoAgente' element={<InfoAgente />} />
        <Route path='/agente/modificaAgent' element={<ModificaAgent />} />
        <Route path='/agente/messaggi' element={<Messaggi />} />
        <Route path='/agente/case' element={<CaseAgente />} />
        <Route path='/agente/images' element={<MostraImages />} />

      </Routes> 
    </BrowserRouter>
  );
}

export default App;