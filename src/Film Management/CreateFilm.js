import React, { useState } from 'react';
import axios from 'axios';

const CreateFilm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const createFilm = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/cinemaProject/api/cinema/createFilm?name=${name}&description=${description}`);
            setSuccessMessage('Film created successfully!');
            setError('');
        } catch (err) {
            setError('Failed to create film.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Create New Film</h2>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Film Name" 
            />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Film Description" 
            />
            <button onClick={createFilm}>Create</button>
            {successMessage && <p className="success">{successMessage}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default CreateFilm;
