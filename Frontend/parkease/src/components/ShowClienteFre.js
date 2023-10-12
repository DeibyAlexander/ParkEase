import React, {useEffect, useState} from "react";
/* import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions"; */
import Aside from "./Aside";
import '../assets/css/aside.css'
import '../assets/css/main.css'

const ShowClientesFre = ()=>{
    const url = 'http://localhost:4466/parkease/getClientesFre'
    const [clientes,setClientes] = useState([])

/*     const [isLoading, setLoading] = useState(true)


    useEffect(()=>{
        getClientesFre()
        .then(()=>{
            setLoading(false)
        })
        .catch((error)=>{
            console.log('Error en la solicitud:', error);
            show_alerta('Error')
            setLoading(false)
        })
    })

 */


    const getClientesFre = async () =>{
        try {
            const respuest = await fetch(url)
            const datos = await respuest.json()
            console.log(datos);
            setClientes(datos)
        } catch (error) {
            console.log('Error en la solicitud:', error);
        }
    }

         
    useEffect(()=>{
        getClientesFre()
    },[])

    return (
        <>
        <Aside/>
        <div className="App">
            <h2 className="subtitulos">Clientes Frecuentes</h2>
            
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-4">
                        <div className="d-grid mx-auto">
                            <button /* onClick={()=> openModal(1)} */ className="btn btn-dark" data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                                <i className='fa-solid fa-circle-plus'></i> Añadir
                            </button>

                        </div>

                    </div>

                </div>
                
                <div className="row mt-3 contenido-tabla">
                    <div className="col-12 col-lg-12 offset-0 offset-lg-14">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>#</th>
                                       
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                              
                                 {/* Mostrar contenido una vez que isLoading sea falso */}
                                 {clientes.map((cliente, i) => (
                                    <tr key={cliente._id}>
                                        <td>{cliente._id}</td>
                                        <td>{cliente.puntos}</td>
                                        <td>{cliente.usuario_id.nombre}</td>

                                        <td>
                                        <button /* onClick={()=> openModal(2, usuario._id, usuario.nombre, usuario.correo, usuario.contraseña, usuario.telefono)} */  className="btn btn-warning">
                                            <i className="fa-solid fa-edit" data-bs-toggle="modal" data-bs-target="#modalUsuarios"></i>
                                        </button>
                                        &nbsp;
                                        <button /* onClick={()=>deleteUsuario(usuario._id, usuario.nombre)}  */className="btn btn-danger">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                        </td>
                                    </tr>
                                    ))}
                                
                                </tbody>
                            </table>

                        </div>
                        
     
                       
                    </div>
                   
                </div>
              
            </div>
            </div>
        </>
    );
}

export default ShowClientesFre

