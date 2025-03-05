import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/index.css';
import Home from './pages/Home.jsx';
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Library from "./pages/Library.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/library" element={<Library />} />
            </Routes>
        </Router>
    </StrictMode>
);
