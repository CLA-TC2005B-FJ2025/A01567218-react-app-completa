import React, { useState, useEffect } from 'react';
import { getAllPersonajes } from '../api';
import Profesor from './Profesor';

function ListaPersonajes() {
    const [personajes, setPersonajes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showProfesor, setShowProfesor] = useState(false);

    useEffect(() => {
        const fetchPersonajes = async () => {
            try {
                const data = await getAllPersonajes();
                setPersonajes(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPersonajes();
    }, []);

    const handleDeleteClick = () => {
        setShowProfesor(true);
    };

    if (loading) {
        return <p>Cargando personajes...</p>;
    }

    if (error) {
        return <p>Error al cargar personajes: {error}</p>;
    }

    if (showProfesor) {
        return <Profesor />;
    }

    return (
        <div>
            <h2>Lista de Personajes</h2>
            {personajes.length > 0 ? (
                <ul>
                    {personajes.map(personaje => (
                        <li key={personaje.id}>
                            ID: {personaje.id}, Nombre: {personaje.name}, Email: {personaje.email}
                            <button onClick={handleDeleteClick}>Eliminar Personaje</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay personajes registrados.</p>
            )}
        </div>
    );
}

export default ListaPersonajes;