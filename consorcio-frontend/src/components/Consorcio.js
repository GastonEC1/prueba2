import React, { useEffect, useState } from "react";
import axios from "axios"
import {Container,Table,Alert} from "react-bootstrap"


function Consorcios(){
    const [consorcios, setConsorcios] = useState([])
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() =>{
        const backendUrl = 'https://solid-umbrella-p4vr965jp5v39p96-5000.app.github.dev/'

        axios.get(backendUrl)
          .then(response => {
            if(Array.isArray(response.data)){
                setConsorcios(response.data)
            }else{
                console.error('La API no devolvio un array:', response.data)
                setConsorcios([])
            }
            setLoading(false)
          })
        .catch(error => {
            console.error('Hubo un error al conectar',error)
            setError('Error al cargar los consorcios, por favor revisar la conexion')
            setLoading(false)
        })

    },[])

    if (loading){
        return(
            <Container className="mt-5 text-center">
                <h2>Cargando Consorcios...</h2>
            </Container>
        )
    }

    if(error){
        return(
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        )
    }

    return(
        <Container className="mt-5">
            <h2>Lista de Consorcios({consorcios.length})</h2>
            {consorcios.length > 0 ?(
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Direccion</th>
                            <th>Pisos</th>
                            <th>Unidades</th>
                        </tr>
                    </thead>

                </Table>
            )
            }
        </Container>
    )
}