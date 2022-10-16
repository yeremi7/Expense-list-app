import React, {useContext, useEffect, useState} from 'react';
import useObtenerGastosDelMes from "../hooks/useObtenerGastosDelMes";

const totalGastadoContext = React.createContext();

const useTotalDelMes = () => useContext(totalGastadoContext);

const TotalGastadoProvider = ({children}) => {

    const [total, cambiarTotal] = useState(0);
    const [gastoPorCategoria] = useObtenerGastosDelMes();

    useEffect(() => {
        let acumulado = 0;
        gastoPorCategoria.forEach((gasto) => acumulado += gasto.cantidad );
        cambiarTotal(acumulado);    
    },[gastoPorCategoria]) 

    return ( 
        <totalGastadoContext.Provider value={{total}}>
			{children}
		</totalGastadoContext.Provider>
     );
}
 
export {TotalGastadoProvider, useTotalDelMes};
