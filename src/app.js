import React from 'react';
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from "./elementos/Header";
import Boton from "./elementos/Boton.js";
import BotonCerrarSesion from "./elementos/BotonCerrarSesion";
import FormularioGasto from "./componentes/FormularioGasto";
import BarraTotalGastado from "./componentes/BarraTotalGastado";

const App = () => { 
    return(
        <>
            <Helmet>
                <title>Agregar Gastos</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Agregar Gastos</Titulo>
                    <ContenedorBotones>
                        <Boton to= '/categorias'>Categorias</Boton>
                        <Boton to= '/lista'>Lista de Gastos</Boton>
                        <BotonCerrarSesion />
                    </ContenedorBotones>
                </ContenedorHeader>
            </Header>

            <FormularioGasto />

            <BarraTotalGastado />

        </>
    )

}
export {App};
