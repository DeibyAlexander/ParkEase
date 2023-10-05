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

    useEffect(()=>{
        getProducts()
    },[])

    const getProducts = async ()=>{
        const respuesta = await axios.get(url)
        setUsuarios(respuesta.data)
    }  


    return(
        <div className="App">
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-4">
                        <div className="d-grid mx-auto">
                            <button className="btn btn-dark" data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
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
                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ShowUsuarios