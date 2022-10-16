import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from "./app";
import WebFont from "webfontloader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Contenedor from "./elementos/Contenedor";
import EditarGasto from "./componentes/EditarGasto";
import GastosPorCategorias from "./componentes/GastosPorCategorias";
import InicioSesion from "./componentes/InicioSesion";
import ListasDeGastos from "./componentes/ListasDeGastos";
import RegistroUsuarios from "./componentes/RegistroUsuarios";
import {Helmet} from "react-helmet";
import favicon from "./imagenes/logo.png";
import Fondo  from "./elementos/Fondo";
import { AuthProvider } from "./contextos/AuthContext";
import RutaPrivada from "./componentes/RutaPrivada";
import { TotalGastadoProvider } from "./contextos/TotalGastadoEnElMesContext";


WebFont.load({
    google: {
      families: ['Work Sans:400,500,600', 'sans-serif']
    }
  });


const Index = () => {
  return (
    <>
    <Helmet>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href={favicon} type="image/x-icon" />
    </Helmet>
    <AuthProvider>
      <TotalGastadoProvider>
        <BrowserRouter>
          <Contenedor>
            <Switch>
              <Route path='/iniciar-sesion' component={InicioSesion} />
              <Route path='/crear-cuenta' component={RegistroUsuarios} />
              
              <RutaPrivada path='/categorias' >
                <GastosPorCategorias/>
              </RutaPrivada>
              <RutaPrivada path='/lista'  >
                <ListasDeGastos/>
              </RutaPrivada>
              
              <RutaPrivada path='/editar/:id' >
                <EditarGasto/>
              </RutaPrivada>
              {/* <App/> */}
              
              <RutaPrivada path='/' >
                <App/>
              </RutaPrivada>
              {/* <Route path='/categorias' component={GastosPorCategorias} />
              <Route path='/lista' component={ListasDeGastos} />
              <Route path='/editar/:id' component={EditarGasto} />
              <Route path='/' component={App} /> */}
            </Switch>               
          </Contenedor>
        </BrowserRouter>
      </TotalGastadoProvider>
    </AuthProvider>
    
    <Fondo/>
    </>
  );
};

ReactDOM.render(<Index />,document.getElementById('root'));




