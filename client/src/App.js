import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      CHAT ROOM APP
      <div>
        {socket ? (
          <div className="chat-container">
            CONNECTED
          </div>
        ) : (
          <div>Not Connected</div>
        )}
      </div>
    </div>
  );
}

export default App;
