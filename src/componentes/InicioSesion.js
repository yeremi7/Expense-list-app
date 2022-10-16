import React, {useState}  from 'react';
import { Helmet } from "react-helmet";
import {Header, Titulo, ContenedorHeader} from "../elementos/Header";
import Boton from "../elementos/Boton";
import {Formulario, Input, ContenedorBoton} from "../elementos/ElementosDeFormulario";
import styled from 'styled-components';
import { ReactComponent as SvgLogin } from "../imagenes/login.svg";
import { useHistory } from "react-router-dom";
import Alerta from "../elementos/Alerta";
import { auth } from "../firebase/firebaseConfig";

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem;
    margin-botton: 1.25rem;
`
const InicioSesion = () => {

    //Estados para los inputs
    const [correo, establecerCorreo] = useState('');
    const [password, establecerPassword] = useState('');
    
    //Esto es para que me envie a la pagina de inicio
    const history = useHistory();

    //Estados para las alertas
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    //Para el value y el onChange
    const handleChange = (e) => {
        if (e.target.name === 'email') {
            establecerCorreo(e.target.value)
        }
        if (e.target.name === 'password') {
            establecerPassword(e.target.value)
        }
    };

    //Para enviar los datos
    const handleSubmit = async (e) => {
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});


        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

        //El signo de exclamacion es para false, osea sino es verdadera o sino cumple con la formula de la expresionRegular has esta logica
        if (!expresionRegular.test(correo)) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje: 'Por favor ingrese un correo valido'
            })
            return;
        };
        if (correo === '' || password === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje: 'Por favor rellene todos los datos'
            })
            return;
        };

        //mandamos los datos al auth de firebase
        try {
            await auth.signInWithEmailAndPassword(correo, password);
            /* console.log('Has ingresado a la cuenta con exito'); */
            history.push('/');

        } catch (error) {

            cambiarEstadoAlerta(true);

            let mensaje;

            switch (error.code) {
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta.'
                break;
                case 'auth/user-not-found':
					mensaje = 'No se encontro ninguna cuenta con este usuario'
				break;
				case 'auth/invalid-email':
					mensaje = 'El correo electrónico no es válido.'
				break;
				default:
					mensaje = 'Hubo un error al intentar ingresar a la cuenta.'
				break;
            };

            cambiarAlerta({tipo:'error', mensaje:mensaje})
        };
    };

    return ( 
        <>
            <Helmet>
                <title>Iniciar Sesion</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesion</Titulo>
                    <div>
                        <Boton to='/crear-cuenta' >Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit} >
                <Svg/>
                <Input
                    type='email'
                    name='email'
                    placeholder='Correo Electrónico'
                    value={correo}
                    onChange={handleChange}
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={handleChange}
                />

                <ContenedorBoton>
                    <Boton as='button' primario type='submit'>Iniciar Sesion</Boton>
                </ContenedorBoton>
            </Formulario>

            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />

        </>
     );
};
 
export default InicioSesion;