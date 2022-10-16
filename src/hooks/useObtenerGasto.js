import {useEffect, useState} from 'react';
import {db} from './../firebase/firebaseConfig';
import {useHistory} from 'react-router-dom';

//Aqui estoy agarrando un solo documento de acuerdo al id que le pase, osea que nada mas estoy agarrando un solo gasto
const useObtenerGasto = (id) => {
	const history = useHistory();
	const [gasto, establecerGasto] = useState('');
	
	useEffect(() => {
		db.collection('gastos').doc(id).get()
		.then((doc) => {
			if(doc.exists){
				establecerGasto(doc);
			} else {	
				history.push('/lista');
			}
		})
	}, [history, id]);

	return [gasto];
}
 
export default useObtenerGasto;
