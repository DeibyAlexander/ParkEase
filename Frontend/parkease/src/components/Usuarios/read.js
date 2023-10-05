import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Table, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function Read(){
    const [APIData, setAPIData] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:4466/parkease/getUsuarios`)
        .then((response)=>{
            console.log(response.data);
            setAPIData(response.data)
        })
    },[])

    const setData = (data) =>{
        let {_id, nombre, correo, contraseña, telefono } = data;
        localStorage.setItem('_id', _id)
        localStorage.setItem('nombre', nombre)
        localStorage.setItem('correo', correo)
        localStorage.setItem('contraseña', contraseña)
        localStorage.setItem('telefono', telefono)
    }

    const getData = ()=>{
        axios.get(`http://localhost:4466/parkease/getUsuarios`)
        .then((getData)=>{
            setAPIData(getData.data)
        })
    }

    const oneDelete = (id)=>{
        axios.delete(`http://localhost:4466/parkease/deleteUsuario/${id}`)
        .then((getData)=>{
            setAPIData(getData.data)
        })
    }

    return(
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>_id</Table.HeaderCell>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Correo</Table.HeaderCell>
                        <Table.HeaderCell>Contraseña</Table.HeaderCell>
                        <Table.HeaderCell>Telefono</Table.HeaderCell>
                        <Table.HeaderCell>Actualizar</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        APIData.map((data)=>{
                            return(
                                <Table.Row>
                                    <Table.Cell>{data._id}</Table.Cell>
                                    <Table.Cell>{data.nombre}</Table.Cell>
                                    <Table.Cell>{data.correo}</Table.Cell>
                                    <Table.Cell>{data.contraseña}</Table.Cell>
                                    <Table.Cell>{data.telefono}</Table.Cell>
                                    <Link to='/update'>
                                        <Table.Cell>
                                            <Button onClick={()=>setData(data)}>Actualizar</Button>
                                        </Table.Cell>
                                    </Link>
                                    <Link>
                                        <Table.Cell>
                                            <Button onClick={()=>setData(data)}>Actualizar</Button>
                                        </Table.Cell>
                                    </Link>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
        </div>
    )
}