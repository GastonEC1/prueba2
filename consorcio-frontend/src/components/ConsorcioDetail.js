import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Alert, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

function ConsorcioDetail() {
    const { id } = useParams();
    const [consorcio, setConsorcio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState('');
    const [deleteError, setDeleteError] = useState('');

    const backendUrl = 'https://solid-umbrella-p4vr965jp5v39p96-5000.app.github.dev/api/consorcios';
    const inquilinosBackendUrl = 'https://solid-umbrella-p4vr965jp5v39p96-5000.app.github.dev/api/inquilinos';


    const fetchConsorcio = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${backendUrl}/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setConsorcio(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los detalles del consorcio.');
            setLoading(false);
            console.error(err);
        }
    };

    useEffect(() => {
        fetchConsorcio();
    }, [id]);

    const handleDeleteInquilino = async (inquilinoId) => {
        setDeleteSuccess('');
        setDeleteError('');
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${inquilinosBackendUrl}/${inquilinoId}`, {
                headers: { 'x-auth-token': token }
            });
            setDeleteSuccess('Inquilino eliminado con éxito.');
            // Actualizar el estado del consorcio para remover el inquilino eliminado
            setConsorcio(prevConsorcio => ({
                ...prevConsorcio,
                inquilinos: prevConsorcio.inquilinos.filter(inquilino => inquilino._id !== inquilinoId)
            }));
        } catch (err) {
            setDeleteError('Error al eliminar el inquilino. Inténtalo de nuevo.');
            console.error('Error al eliminar inquilino:', err);
        }
    };


    if (loading) {
        return <Container className="mt-5 text-center"><h2>Cargando...</h2></Container>;
    }

    if (error) {
        return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
    }

    if (!consorcio) {
        return <Container className="mt-5"><Alert variant="info">Consorcio no encontrado.</Alert></Container>;
    }

    return (
        <Container className="mt-5">
            <Link to="/consorcios" className="btn btn-secondary mb-3">
                Volver a Consorcios
            </Link>

            {/* Fila principal que contendrá las dos columnas: Izquierda (8 unidades) y Derecha (4 unidades) */}
            <Row>
                {/* Columna Izquierda (md={8}): Detalles del Consorcio e Inquilinos */}
                <Col md={8}>
                    {/* Detalles del Consorcio */}
                    <Card className="mb-4">
                        <Card.Header as="h2">{consorcio.nombre}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>Dirección:</strong> {consorcio.direccion}<br/>
                                <strong>Pisos:</strong> {consorcio.pisos}<br/>
                                <strong>Unidades:</strong> {consorcio.unidades}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    {/* Sección de Inquilinos */}
                    <Card className="mb-4">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <h3>Inquilinos</h3>
                            <Link to="/add-inquilino">
                                <Button variant="primary">+ Agregar Inquilino</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            {deleteSuccess && <Alert variant="success">{deleteSuccess}</Alert>}
                            {deleteError && <Alert variant="danger">{deleteError}</Alert>}
                            {consorcio.inquilinos && consorcio.inquilinos.length > 0 ? (
                                <Table striped bordered hover responsive className="mt-3">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Unidad</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {consorcio.inquilinos.map(inquilino => (
                                            <tr key={inquilino._id}>
                                                <td>
                                                    <Link to={`/inquilinos/${inquilino._id}`}>
                                                        {inquilino.nombre}
                                                    </Link>
                                                </td>
                                                <td>{inquilino.email}</td>
                                                <td>{inquilino.unidad}</td>
                                                <td>
                                                    <Link to={`/edit-inquilino/${inquilino._id}`} className="btn btn-warning btn-sm me-2">
                                                        <FaEdit /> Editar
                                                    </Link>
                                                    <Button 
                                                        variant="danger" 
                                                        size="sm" 
                                                        onClick={() => handleDeleteInquilino(inquilino._id)}
                                                    >
                                                        <FaTrash /> Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                // Cambiado de Alert a un párrafo simple
                                <p className="text-muted mt-3">No hay inquilinos para este consorcio.</p>
                            )}
                        </Card.Body>
                    </Card>
                    
                    {/* Sección de Historial de Gastos ELIMINADA */}

                </Col>

                {/* Columna Derecha (md={4}): Activos y Alertas de Mantenimiento */}
                <Col md={4}>
                    {/* Sección de Activos */}
                    <Card className="mb-4">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <h3>Activos</h3>
                            <Link to="/add-activo">
                                <Button variant="primary">+ Agregar Activo</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            {consorcio.activos && consorcio.activos.length > 0 ? (
                                <Table striped bordered hover responsive className="mt-3">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Marca</th>
                                            <th>Ubicación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {consorcio.activos.map(activo => (
                                            <tr key={activo._id}>
                                                <td>
                                                    <Link to={`/activos/${activo._id}`}>
                                                        {activo.nombre}
                                                    </Link>
                                                </td>
                                                <td>{activo.marca}</td>
                                                <td>{activo.ubicacion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                // Cambiado de Alert a un párrafo simple
                                <p className="text-muted mt-3">No hay activos para este consorcio.</p>
                            )}
                        </Card.Body>
                    </Card>

                    {/* Alertas de Mantenimiento - Ahora debajo de los Activos en la columna derecha */}
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5 className="card-title">Alertas de Mantenimiento</h5>
                            <p className="text-muted">
                                {/* Puedes reemplazar esto con tu lógica y datos de alertas reales */}
                                No hay alertas de mantenimiento en esta demo.
                            </p>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
    );
}

export default ConsorcioDetail;