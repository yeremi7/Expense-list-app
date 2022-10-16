import {useState ,useEffect} from 'react';
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../contextos/AuthContext";

const useObternerGastos = () => {

    const {usuario} = useAuth();
    const [gastos, cambiarGastos] = useState([]);
    const [ultimoGasto, cambiarUltimoGasto] = useState(null);
	const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);
    
    //Paso 2
    const obtenerMasGastos = () => {
		db.collection('gastos')
		.where('uidUsuario', '==', usuario.uid)
		.orderBy('fecha', 'desc')
		.limit(10)
		.startAfter(ultimoGasto) //En esta parte comienza la magia, porque aqui le estamos pasando el ultimo gasto de la vieja lista osea de la primera, porque de ese ultimo gasto voy empezar a cargar la nueva lista
		.onSnapshot((snapshot) => {

            //Aqui ejecutamos el onClick, y va a preguntar despues del ultimoGasto hay mas lista si es true dame el nuevo ultimoGasto de esa nueva lista, y tambien me vas a ejecuatar esta logica: el metodo concat es para unir la nueva lista con la vieja y luego me vas a mapear esa nueva lista y me reornaras de esa lista los gasto.data() y me lo vas a guardar en el estado de gastos. Si es false osea que no hay lista no me muestres el boton de 'Cargar Mas' 
			if(snapshot.docs.length > 0){
				cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);

				cambiarGastos(gastos.concat(snapshot.docs.map((gasto) => {
					return {...gasto.data(), id: gasto.id}
				})))
			} else {
				cambiarHayMasPorCargar(false);
			}
		})
	};

    //Paso 1
	useEffect(() => {
		const unsuscribe = db.collection('gastos')
		.where('uidUsuario', '==', usuario.uid) //Aqui ponemos el usuario.uid para identificar el usuario que inicia sesion, para que cargue sus datos de la base de datos. sin esta condicion se estaria cargando todos los datos de todos los usuarios registrados y eso es lo que no queremos 
		.orderBy('fecha', 'desc')
		.limit(10)
		.onSnapshot((snapshot) => {

            //Cuando carga por primera vez la lista de 10 gastos, vamos a preguntar si el length en mayor a 0: si es mayor a 0 dame el ultimo de la lista esto se guardara en el estado ultimoGasto para luego pasarsela a la funcion del onClick que esta arriba que es obtenerMasGastos; El cambiarHayMasPorCargar es para mostrar el boton 'Cargar Mas'
			if(snapshot.docs.length > 0){
				cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);
				cambiarHayMasPorCargar(true);
			} else {
				cambiarHayMasPorCargar(false);
			}
			
			cambiarGastos(snapshot.docs.map((gasto) => { //Aqui mapeamos o recorremos el arreglo de la base de datos, por eso lo dejamos hasta docs porque en docs no da el arreglo 

				return {...gasto.data(), id: gasto.id} //Aqui extraemos los objetos del arreglo con sus mismas propiedades con: ...gasto.data(); y lo colocamos en un nuevo objeto para agregarle una propiedad adicional o nueva que va ser: id:gasto.id. 
                                                       //Todo esto al final se agrega en el arreglo de gasto osea del estado de gasto con los mismos objetos y con la nueva propiedad que es el id:gasto.id. Este 'id:gasto.id' es el id del documento que esta dentro de la collecion de la base de datos, y no es del uidUsuario.
            }));
        });
        

		return unsuscribe;
	}, [usuario]);
    
    return [gastos, obtenerMasGastos, hayMasPorCargar];
}

export default useObternerGastos;

