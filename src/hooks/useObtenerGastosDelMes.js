import {useState,useEffect} from 'react';
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../contextos/AuthContext";
import { startOfMonth, endOfMonth, getUnixTime } from "date-fns";

const useObtenerGastosDelMes = () => {

    const [gastosPorCategoria, establecerGastosPorCategoria] = useState([]);
    const {usuario} = useAuth();

    useEffect(() => {

        //Debemos transformar la fecha en formato getUnixTime osea en sugundos, de otra forma no entraria en al base de datos, porque solo acepta es formato getUnixTime la base de datos. 
        const inicioDeMes = getUnixTime(startOfMonth(new Date()));
        const finDeMes = getUnixTime(endOfMonth(new Date()));

        if (usuario) {
            const unsuscribe =  db.collection('gastos')
            .orderBy('fecha', 'desc')
            .where('fecha', '>=' , inicioDeMes) //debemos solo mostrar los gastos dentro del mes actual, asi que hay que hacer un rango entre inicioDeMes y finDeMes.
            .where('fecha', '<=' , finDeMes)
            .where('uidUsuario', '==', usuario.uid)
            .onSnapshot((snapshot) => {
                establecerGastosPorCategoria(snapshot.docs.map((documento) => {
                    return {...documento.data(), id: documento.id}  
                }))
            })
            
            // Use Effect tiene que retornar una funcion que se va a ejecutar cuando se desmonte el componente.
			// En este caso queremos que ejecute el unsuscribe a la coleccion de firestore.
            return unsuscribe;
        }
        
    },[usuario])
    return[gastosPorCategoria]
}
 
export default useObtenerGastosDelMes ;
