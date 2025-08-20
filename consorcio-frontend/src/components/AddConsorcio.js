import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

function AddConsorcio() {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [pisos, setPisos] = useState('');
    const [unidades, setUnidades] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

  
    const backendUrl = 'https://solid-umbrella-p4vr965jp5v39p96-5000.app.github.dev/api/consorcios';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        
        try {
            const newConsorcio = { nombre, direccion, pisos, unidades };
            const token = localStorage.getItem('token');
            
            await axios.post(backendUrl, newConsorcio, { // Aquí se usa la URL directa
                headers: { 'x-auth-token': token }
            });
            
            setSuccessMessage('Consorcio creado con éxito.');
            setNombre('');
            setDireccion('');
            setPisos('');
            setUnidades('');
            
        } catch (err) {
            setErrorMessage('Error al crear el consorcio. Por favor, revisa los datos.');
            console.error(err);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Agregar Nuevo Consorcio</h2>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            
            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Edificio Las Palmas" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDireccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Av. del Libertador 1234" 
                        value={direccion} 
                        onChange={(e) => setDireccion(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPisos">
                    <Form.Label>Pisos</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="10" 
                        value={pisos} 
                        onChange={(e) => setPisos(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUnidades">
                    <Form.Label>Unidades</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="20" 
                        value={unidades} 
                        onChange={(e) => setUnidades(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                    Crear Consorcio
                </Button>
            </Form>
        </Container>
    );
}

export default AddConsorcio;