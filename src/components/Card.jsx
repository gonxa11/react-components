import { useState } from 'react'
import img from '../assets/react.svg'

function Card() {
    const [seguir, setSeguir] = useState(false);

    const handleSeguir = () => {
        setSeguir(!seguir);
    }

    return (
        <div className="article">
            <div className="header">
                <img src={img} alt="React logo" />
                <div>
                    <strong>Eider Gonzalez Sanchez</strong>
                    <span>eiderandresg@gmail.com</span>
                </div>
            </div>

            <aside>
                <button className={!seguir ? '' : 'seguir'} onClick={handleSeguir}>
                    {!seguir ? 'Seguir' : 'Siguiendo'}
                </button>
            </aside>
        </div>
    )
}

export default Card