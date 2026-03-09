import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Fragment } from "react/jsx-runtime";

import Clientes from './componentes/clientes/Clientes.js';
import { Barranavegacion } from "./componentes/layout/Bnavegacion.js";
import { Header } from "./componentes/layout/Header.js";
import { Pedidos } from './componentes/pedidos/Pedidos.js';
import { Productos } from './componentes/productos/Productos.js';


function App() {
  return (
    <Router>
      <Fragment> 

      <Header />
      <div className="grid contenedor contenido-principal">
        <Barranavegacion />
        <main class="caja-contenido col-9">
          <Routes> 
            <Route path='/' element = {<Clientes />}/>
            <Route path='/pedidos' element = {<Pedidos />}/>
            <Route path='/productos' element = {<Productos />}/>
          </Routes>
        </main>
      </div>

      </Fragment>
    </Router>

  )
}

export default App;