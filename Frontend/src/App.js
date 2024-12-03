import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AsideComponent from './components/Aside-component';
import ConsultaView from './views/Consulta-view';
import CrearRegistroView from './views/CrearRegistro-view';
import HomeView from './views/Home-view';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <AsideComponent />
      <Routes>
        <Route path="/consulta" element={<ConsultaView />} />
        <Route path="/crear" element={<CrearRegistroView />} />
        <Route path="/editar/:id" element={<CrearRegistroView />} />
        <Route exact path="/" element={<HomeView />}/>
        <Route path="*" element={<HomeView />}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}
export default App;