import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React from "react";
import { useParams } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID = 1787041124;
    const serverSecret = "eb127ffbc700e56f464636d2cf2c3e13";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Halima Yasmin"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:3000/room/.${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
    });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div ref={myMeeting} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Room;
