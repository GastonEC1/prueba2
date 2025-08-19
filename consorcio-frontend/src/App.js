import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';




function App() {
 return(
  <Router>
    <AppNavbar>
      <Container>
        <Routes>
          <Route path='/consorcio' element={}></Route>
        </Routes>
      </Container>
    </AppNavbar>
  </Router>
 )
}

export default App;