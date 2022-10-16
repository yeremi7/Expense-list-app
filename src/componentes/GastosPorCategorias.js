import React from 'react';
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import BtnRegresar from "../elementos/BtnRegresar";
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosDelMes from "../hooks/useObtenerGastosDelMes";
import {ListaDeCategorias,ElementoListaCategorias,Categoria,Valor,ContenedorSubtitulo,Subtitulo} from "../elementos/elementosDeLista";
import IconoCategoria from "../elementos/IconoCategoria";
import convertirAMoneda from "../funciones/convertirAMoneda";

const GastosPorCategorias = () => {
    
    const [gastosPorCategoria] = useObtenerGastosDelMes();

    return ( 
        <>
            <Helmet>
                <title>Gastos por categorias</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <BtnRegresar/>
                    <Titulo>Gastos por categorias</Titulo>
                </ContenedorHeader>
            </Header>

            
            <ListaDeCategorias>
				{gastosPorCategoria.map((elemento, index) => {
					return(
						<ElementoListaCategorias key={index}>
							<Categoria>
								<IconoCategoria nombre={elemento.categoria}/>
									{elemento.categoria}
								</Categoria>
							<Valor>{convertirAMoneda(elemento.cantidad)}</Valor>
						</ElementoListaCategorias>
					);
				})}
			</ListaDeCategorias>

            {gastosPorCategoria.length === 0 &&
                <ContenedorSubtitulo>
                    <Subtitulo>No hay categoria que mostar</Subtitulo>
                </ContenedorSubtitulo>
            }

            <BarraTotalGastado/>
        </>
     );
}
 
export default GastosPorCategorias;