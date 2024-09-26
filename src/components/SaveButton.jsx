import { useState } from 'react';

function SaveButton () {
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
        }, 1000); // Duración de la animación
    };

    return (
        <button
            className={`save-button ${isSaved ? 'saved' : ''}`}
            onClick={handleSave}
        >
            {isSaved ? 'Guardado!' : 'Guardar'}
        </button>
    );
};

export default SaveButton;
