import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import wihtReactContent from 'sweetalert2-react-content'
import { show_alerta } from "../functions";


const ShowUsuarios = ()=>{
    const url = 'http://localhost:4466/parkease/getUsuarios'
    const [usuarios, setUsuarios] = useState([])
    const [id,setId] = useState('')
    const [nombre,setNombre] = useState('')
    const [correo,setCorreo] = useState('')
    const [contraseña,setContraseña] = useState('')
    const [telefono,setTelefono] = useState('')
    const [operation,setOperation] = useState(1)
    const [title, setTitle] = useState('')



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

    const openModal = (op, id, nombre, correo, contraseña, telefono) =>{
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
            setId(id)
            setNombre(nombre)
            setCorreo(correo)
            setContraseña(contraseña)
            setTelefono(telefono)
        }
        window.setTimeout(function(){
            document.getElementById('nombre').focus()
        },500)
    }

/*      const enviarSolicitud = async(metodo, parametros)=>{
        await axios({method:metodo, url:url, data:parametros}).then(function(respuesta){
            var tipo = respuesta.data[0]
            var msj = respuesta.data[1]
            show_alerta(msj,tipo)
            if (tipo === 'success') {
                document.getElementById('btnCerrar').click()
                getUsuarios()
                
            }
        })
        .catch(function(error){
            console.log(error);
            show_alerta('Error en la solicitud')
        })

    }  */
    const enviarSolicitud = async (metodo, parametros) => {
        try {
          const response = await fetch(url, {
            method: metodo,
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify(parametros),
          });
      
      
          const data = await response.json();
      
          const tipo = data[0];
          const msj = data[1];
          show_alerta(msj, tipo);
      
          if (tipo === 'success') {
            document.getElementById('btnCerrar').click();
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
            }
            else{
                parametros = {nombre:nombre.trim(), correo:correo.trim(), contraseña:contraseña.trim(),telefono:telefono.trim()}
                metodo= 'PATCH'
            }
            enviarSolicitud(metodo, parametros)
        }
    }


    return(
        <div className="App">
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
                <div className="row mt-3">
                    <div className="col-12 col-lg-8 offset-0 offset-lg-12">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Contraseña</th>
                                        <th>Telefono</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                {usuarios.map((usuario, i) => (
                                    <tr key={usuario.id}>
                                        <td>{i + 1}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.contraseña}</td>
                                        <td>{usuario.telefono}</td>
                                        <td>
                                        <button onClick={()=> openModal(2, usuario.id, usuario.nombre, usuario.correo, usuario.contraseña, usuario.telefono)}  className="btn btn-warning">
                                            <i className="fa-solid fa-edit" data-bs-toggle="modal" data-bs-target="#modalUsuarios"></i>
                                        </button>
                                        &nbsp;
                                        <button className="btn btn-danger">
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
    )
}

export default ShowUsuarios