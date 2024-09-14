import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import video from './video.mp4';

const Home = () => {
    const [value, setValue] = useState(''); // Room code state
    const [showOptions, setShowOptions] = useState(false); // To show/hide options
    const navigate = useNavigate();

    // Handle Join button click
    const handleJoinRoom = useCallback(() => {
        if (value.trim() === '') {
            alert("Please enter a valid room code.");
            return;
        }
        setShowOptions(true); // Show options when Join button is clicked
    }, [value]);

    // Handle Signed/Non-Signed button click
    const handleOptionClick = (option) => {
        navigate(`/room/${value}?type=${option}`);
    };

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
                    disabled={showOptions} // Disable input when options are shown
                />

                {/* Conditionally render Join or Signed/Non-Signed buttons */}
                {!showOptions ? (
                    <button onClick={handleJoinRoom} className='centered-button'>
                        Join
                    </button>
                ) : (
                    <div className='options-container'>
                        <button 
                            onClick={() => handleOptionClick('signed')} 
                            className='option-button'
                        >
                            Signed
                        </button>
                        <button 
                            onClick={() => handleOptionClick('non-signed')} 
                            className='option-button'
                        >
                            Non-Signed
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
