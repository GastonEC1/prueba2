import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirigir después de añadir

function AddInquilino() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [unidad, setUnidad] = useState('');
    const [consorcio, setConsorcio] = useState(''); // Para el ID del consorcio
    const [consorciosList, setConsorciosList] = useState([]); // Para la lista de opciones
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook para la navegación

    const backendUrl = 'https://solid-umbrella-p4vr965jp5v39p96-5000.app.github.dev/api'; // URL base del backend
    const token = localStorage.getItem('token');

    // Cargar la lista de consorcios al iniciar el componente
    useEffect(() => {
        const fetchConsorcios = async () => {
            try {
                const response = await axios.get(`${backendUrl}/consorcios`, {
                    headers: { 'x-auth-token': token }
                });
                setConsorciosList(response.data);
            } catch (err) {
                console.error('Error al cargar la lista de consorcios:', err);
                setErrorMessage('No se pudo cargar la lista de consorcios.');
            }
        };
        fetchConsorcios();
    }, [backendUrl, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        
        try {
            const newInquilino = { nombre, email, telefono, unidad, consorcio };
            
            // Petición POST al backend para crear el inquilino
            const response = await axios.post(`${backendUrl}/inquilinos`, newInquilino, {
                headers: { 'x-auth-token': token }
            });

            // Si se crea con éxito, actualizamos el consorcio para añadir el inquilino
            const inquilinoCreado = response.data;
            await axios.put(`${backendUrl}/consorcios/${consorcio}`, {
                $push: { inquilinos: inquilinoCreado._id } // Añadir el ID del nuevo inquilino
            }, {
                headers: { 'x-auth-token': token }
            });
            
            setSuccessMessage('Inquilino creado y asociado con éxito.');
            // Limpiar el formulario
            setNombre('');
            setEmail('');
            setTelefono('');
            setUnidad('');
            setConsorcio(''); // Restablecer el selector
            
            // Opcional: redirigir a la página de detalles del consorcio
            navigate(`/consorcios/${inquilinoCreado.consorcio}`);

        } catch (err) {
            setErrorMessage('Error al crear el inquilino. Por favor, revisa los datos.');
            console.error('Error al enviar el formulario:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Agregar Nuevo Inquilino</h2>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            
            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Juan Pérez" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="juan.perez@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTelefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="11-2233-4455" 
                        value={telefono} 
                        onChange={(e) => setTelefono(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUnidad">
                    <Form.Label>Unidad</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="3B" 
                        value={unidad} 
                        onChange={(e) => setUnidad(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConsorcio">
                    <Form.Label>Consorcio</Form.Label>
                    <Form.Select 
                        value={consorcio} 
                        onChange={(e) => setConsorcio(e.target.value)} 
                        required
                    >
                        <option value="">Selecciona un consorcio...</option>
                        {consorciosList.map((cons) => (
                            <option key={cons._id} value={cons._id}>
                                {cons.nombre} ({cons.direccion})
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                    Crear Inquilino
                </Button>
            </Form>
        </Container>
    );
}

export default AddInquilino;