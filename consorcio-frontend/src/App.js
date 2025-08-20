import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Componentes
import AppNavbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import Consorcios from './components/Consorcios';
import ConsorcioDetail from './components/ConsorcioDetail';
import AddConsorcio from './components/AddConsorcio';
import AddInquilino from './components/AddInquilinos'; // ¡Asegúrate de importar esto!




import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const handleAuth = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            {isAuthenticated ? (
                <>
                    <AppNavbar onLogout={handleLogout} />
                    <Container>
                        <Routes>
                            <Route path="/" element={<Consorcios />} />
                            <Route path="/consorcios" element={<Consorcios />} />
                            <Route path="/consorcios/:id" element={<ConsorcioDetail />} />
                            <Route path="/add-consorcio" element={<AddConsorcio />} />
                            <Route path="/add-inquilino" element={<AddInquilino />} /> 
                        </Routes>
                    </Container>
                </>
            ) : (
                <AuthForm onAuth={handleAuth} />
            )}
        </Router>
    );
}

export default App;