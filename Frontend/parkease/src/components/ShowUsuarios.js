import React, {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import wihtReactContent from 'sweetalert2-react-content'
import { show_alerta } from "../functions";
import Aside from "./Aside";
import '../assets/css/aside.css'
import '../assets/css/main.css'


import loadingImage from '../assets/img/VAyR.gif'; // Ruta a tu imagen de carga
 // Estilo CSS para la imagen de carga

const ShowUsuarios = ()=>{
    const url = 'http://localhost:4466/parkease/getUsuarios'
    const urlpost = 'http://localhost:4466/parkease/postUsuario'
    const urlupdate = `http://localhost:4466/parkease/updateUsuario`
    const urldelete = `http://localhost:4466/parkease/deleteUsuario`
    const [usuarios, setUsuarios] = useState([])
    const [_id,setId] = useState({})

    const [nombre,setNombre] = useState('')
    const [correo,setCorreo] = useState('')
    const [contraseña,setContraseña] = useState('')
    const [telefono,setTelefono] = useState('')
    const [operation,setOperation] = useState(1)
    const [title, setTitle] = useState('')

    const [isLoading, setLoading] = useState(true); // Agregar estado para el indicador de carga



    useEffect(() => {
        // Realiza la carga de datos aquí
        getUsuarios()
          .then(() => {
            setLoading(false); // Una vez que los datos se cargan, establece isLoading en false
          })
          .catch((error) => {
            console.error('Error en la solicitud:', error);
            show_alerta('Error en la solicitud');
            setLoading(false); // Asegúrate de cambiar el estado incluso en caso de error
          });
      }, []);

      
    const getUsuarios = async () => {
        try {
          const respuesta = await fetch(url);
          
          const datos = await respuesta.json();
          console.log(datos);
          setUsuarios(datos);
          
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      }
      
      useEffect(()=>{
        getUsuarios()
    },[])

    const openModal = (op, _id, nombre, correo, contraseña, telefono) =>{
        setId('')
        setNombre('')
        setCorreo('')
        setContraseña('')
        setTelefono('')
        setOperation(op)
        if (op === 1) {
            setTitle('Registrar Producto')
        }
        else if( op ===2){
            setTitle('Editar Producto')
            setId(_id)
            setNombre(nombre)
            setCorreo(correo)
            setContraseña(contraseña)
            setTelefono(telefono)
        }
        window.setTimeout(function(){
            document.getElementById('nombre')
        },500)
    }

    const enviarSolicitud = async (metodo, parametros) => {
        const MySwal = wihtReactContent(Swal);
        try {
          const response = await fetch(urlpost, {
            method: metodo,
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify(parametros),
          });            

          const data = await response.json();
          console.log(data);
          const tipo = 'success';
          
          MySwal.fire({
            title: `Usuario Registrado`,
            icon: 'success',     
            timer: 1500
            })

            if (tipo === 'success') {     
                getUsuarios();
             /*    setTimeout(function(){
                    window.location = 'http://localhost:3000/'
                },1500) */
            }

    

          
        } catch (error) {
          console.error('Error en la solicitud:', error);
          show_alerta('Error en la solicitud');
        }
      }; 
        
    const actualizar = async (metodo, parametros, _id ) => {

        try {
            
            const response = await fetch(`${urlupdate}/${_id}`, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parametros),
            });
        
            const data = await response.json();
            console.log(data);
        
            const tipo = data[0];
            const msj = data[1];
            show_alerta(msj, tipo);
        
            if (tipo === 'success') {
            getUsuarios();
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            show_alerta('Error en la solicitud');
        }
    };
      

    const validar = () =>{
        var parametros;
        var metodo;
        if (nombre.trim() === '') {
            show_alerta('Escribe tu nombre de usuario')
        }
        else if (correo.trim() === '') {
            show_alerta('Escribe tu correo de usuario')
        }
        else if (contraseña.trim() === '') {
            show_alerta('Escribe tu contraseña de usuario')
        }
        else if (telefono.trim() === '') {
            show_alerta('Escribe tu telefono de usuario')
        }else{
            if(operation ===1 ){
                parametros = {nombre:nombre.trim(), correo:correo.trim(), contraseña:contraseña.trim(),telefono:telefono.trim()}
                metodo= 'POST'
                enviarSolicitud(metodo, parametros)
            }
            else if(operation ===2){
                parametros = {nombre:nombre.trim(), correo:correo.trim(), contraseña:contraseña.trim(),telefono:telefono.trim()}
                metodo= 'PATCH'
                actualizar(metodo, parametros)
            }
            
            
        }
    }

    const deleteUsuario = async (_id, nombre)=>{
        const MySwal = wihtReactContent(Swal);
        MySwal.fire({
            title: `¿Seguro que quiere eliminar al usuario ${nombre}`,
            icon: 'question',
            text: 'No se podra dar marcha atras',
            showCancelButton:true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'Cancelar'
        }).then( async (result)=>{
            if(result.isConfirmed) {
                
                try {
                    // Realiza la solicitud DELETE utilizando fetch
                    const response = await fetch(`${urldelete}/${_id}`, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });
            
                    const data = await response.json();
                    console.log(data);
                    const tipo = 'success';
            
                    MySwal.fire({
                        title: `Usuario eliminado`,
                        icon: 'success',     
                        timer: 1500
                    })
            
                    if (tipo === 'success') {     
                        getUsuarios();
                      }
                  } catch (error) {
                    console.error('Error en la solicitud:', error);
                    show_alerta('Error en la solicitud');
                  }
            }else{
                show_alerta('El usuario no fue eliminado','info')
            }
        })


    }

    return(
        <>
        <Aside/>
        <div className="App">
        {isLoading ? (
            <div className="cargando" >
                <img src={loadingImage} style={{width: "100%"}} alt="Loading" className="loading-image" />        
            </div>
                
            
        ) : (
            <>
                    
            
            </>
        )}
            <h2 className="subtitulos">Clientes</h2>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-4">
                        <div className="d-grid mx-auto">
                            <button onClick={()=> openModal(1)} className="btn btn-dark" data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
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
                                        <th>Contraseña</th>
                                        <th>Telefono</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                              
                                 {/* Mostrar contenido una vez que isLoading sea falso */}
                                 {usuarios.map((usuario, i) => (
                                        <tr key={usuario._id}>
                                            <td>{usuario._id}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.correo}</td>
                                            <td>{usuario.contraseña}</td>
                                            <td>{usuario.telefono}</td>
                                            <td>
                                            <button onClick={()=> openModal(2, usuario._id, usuario.nombre, usuario.correo, usuario.contraseña, usuario.telefono)}  className="btn btn-warning">
                                                <i className="fa-solid fa-edit" data-bs-toggle="modal" data-bs-target="#modalUsuarios"></i>
                                            </button>
                                            &nbsp;
                                            <button onClick={()=>deleteUsuario(usuario._id, usuario.nombre)} className="btn btn-danger">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            </td>
                                        </tr>
                                        ))}
                                
                                </tbody>
                            </table>

                        </div>
                        <h2 className="subtitulos">Clientes Frecuentes</h2>
     
                       
                    </div>
                   
                </div>
              
            </div>
           
            <div id="modalUsuarios" className="modal fade" aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                                <label className="h5">{title}</label>
                                <button type="button" className="btn-close" data-bd-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id='id'></input>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                                <input type="text" id="nombre" className="form-control" placeholder="Nombre" value={nombre} onChange={(e)=> setNombre(e.target.value)}></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                                <input type="text" id="correo" className="form-control" placeholder="Correo" value={correo} onChange={(e)=> setCorreo(e.target.value)}></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                                <input type="text" id="contraseña" className="form-control" placeholder="Contraseña" value={contraseña} onChange={(e)=> setContraseña(e.target.value)}></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                                <input type="text" id="telefono" className="form-control" placeholder="Telefono" value={telefono} onChange={(e)=> setTelefono(e.target.value)}></input>
                            </div>
                            <div className="d-grid col-6 mx-auto">
                                    <button onClick={()=> validar()} className="btn btn-success">
                                        <i className="fa-solid fa-floppy-disk"></i> Guardar
                                    </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id= "btnCerrar" className="btn btn-secondary" data-bs-dismiss='modal'>Cerrar</button>

                        </div>

                    </div>

                </div>
                
            </div>

           

        </div>
        </>
    )
}

export default ShowUsuarios