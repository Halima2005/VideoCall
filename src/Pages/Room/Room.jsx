import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();
  const meetingContainerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeMeeting = async () => {
      try {
        const appID = process.env.NEXT_PUBLIC_APP_ID;
        const serverSecret = process.env.NEXT_PUBLIC_SERVER_SECRET;

        if (!appID || !serverSecret) {
          throw new Error(
            "Missing API keys. Check your environment variables."
          );
        }

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          Date.now().toString(),
          "Halima Yasmin"
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
          container: meetingContainerRef.current,
          sharedLinks: [
            {
              name: "Copy Link",
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/room/${roomId}`,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: false,
        });
      } catch (err) {
        console.error("Error initializing meeting:", err);
        setError("Failed to start the video call. Please try again.");
      }
    };

    initializeMeeting();
  }, [roomId]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {error ? (
        <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          {error}
        </p>
      ) : (
        <div
          ref={meetingContainerRef}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
};

export default Room;
