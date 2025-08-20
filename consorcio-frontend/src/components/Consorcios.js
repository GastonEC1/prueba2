import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

function Consorcios() {
    const [consorcios, setConsorcios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const backendUrl = 'https://solid-umbrella-p4vr965jp5v39p96-5000.app.github.dev/api/consorcios';
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(backendUrl, {
            headers: { 'x-auth-token': token }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                setConsorcios(response.data);
            } else {
                setConsorcios([]);
            }
            setLoading(false);
        })
        .catch(error => {
            setError('Error al cargar los consorcios. Por favor, revisa la conexión.');
            setLoading(false);
        });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendUrl}/${id}`, {
                headers: { 'x-auth-token': token }
            });
            // Si la eliminación es exitosa, actualiza la lista en el frontend
            setConsorcios(consorcios.filter(cons => cons._id !== id));
        } catch (err) {
            setError('Error al eliminar el consorcio.');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <h2>Cargando Consorcios...</h2>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Lista de Consorcios ({consorcios.length})</h2>
                <Link to="/add-consorcio">
                    <Button variant="primary">+ Agregar Consorcio</Button>
                </Link>
            </div>
            {consorcios.length > 0 ? (
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consorcios.map(consorcio => (
                            <tr key={consorcio._id}>
                                <td>
                                    <Link to={`/consorcios/${consorcio._id}`}>
                                        {consorcio.nombre}, {consorcio.direccion}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="info" className="mt-3">
                    No hay consorcios para mostrar.
                </Alert>
            )}
        </Container>
    );
}

export default Consorcios;