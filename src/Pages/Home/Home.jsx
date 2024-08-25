import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import video from './video.mp4';
const Home = () => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleJoinRoom = useCallback(() => {
        navigate(`/room/${value}`);
    }, [navigate, value]);

    return (
        <div className='home-container'>
             <h2 className='logo'>Bhasa-Setu</h2> 
            {/* Background Video */}
            <video autoPlay loop muted playsInline className='background-video'>
                <source src={video} type="video/mp4" />
            </video>
            <div className='content'>
                <input 
                    className='bcentered-button' 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    type="text" 
                    placeholder="Enter Room code" 
                />
                <button onClick={handleJoinRoom} className='centered-button'>Join</button>
            </div>
        </div>
    );
}

export default Home;
