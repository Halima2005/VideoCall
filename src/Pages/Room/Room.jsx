import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
    const { roomId } = useParams();

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

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <div ref={myMeeting} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}

export default Room;
