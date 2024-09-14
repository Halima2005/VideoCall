import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
    const { roomId } = useParams();
    const [transcript, setTranscript] = useState("");

    // Initialize Web Speech API's SpeechRecognition
    const initSpeechRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true; // Keep recognizing speech until manually stopped
        recognition.interimResults = true; // Show interim results as the user speaks
        recognition.lang = 'en-US'; // Set the recognition language

        recognition.onresult = (event) => {
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    setTranscript((prev) => prev + event.results[i][0].transcript + " ");
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            console.log(interimTranscript); // Log the interim transcript for debugging
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
            console.log("Speech recognition stopped.");
        };

        recognition.start(); // Start recognizing speech
    };

    const myMeeting = async (element) => {
        const appID = 1665625276;
        const serverSecret = "2f1b260997d6c111850d2194e7f521a0";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "Halima Yasmin");

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `http://localhost:3000/room/.${roomId}`,
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,
        });
    };

    useEffect(() => {
        initSpeechRecognition();
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <div ref={myMeeting} style={{ width: '100%', height: '100%' }} />
            <div style={{ position: 'absolute', bottom: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', padding: '10px' }}>
                <h4>Speech-to-Text Output:</h4>
                <p>{transcript}</p>
            </div>
        </div>
    );
};

export default Room;
