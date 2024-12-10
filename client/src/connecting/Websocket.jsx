// import axios from "axios";
// import { useEffect, useState, useRef } from "react";

// const WebSocketConnect = () => {
//   const [messages, setMessages] = useState([]);
//   const [value, setValue] = useState("");
//   const socket = useRef();
//   const [connected, setConnected] = useState(false);
//   const [username, setUsername] = useState("");

//   function connect() {
//     socket.current = new WebSocket(`ws://localhost:5000`);

//     socket.current.onopen = () => {
//       setConnected(true);
//       const message = {
//         event: "connected",
//         username,
//         id: Date.now(),
//       };
//       console.log(`Connected`);

//       socket.current.send(JSON.stringify(message));
//     };

//     socket.current.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       setMessages((prev) => [message, ...prev]);
//     };

//     socket.current.onclose = () => {
//       console.log(`Socket closed`);
//     };

//     socket.current.onerror = () => {
//       console.log(`Socket error`);
//     };
//   }

//   const sendMessage = async () => {
//     const message = {
//         username,
//         message: value,
//         id: Date.now(),
//         event: "message"
//     }

//     socket.current.send(JSON.stringify(message))
//     setValue("")
//   };

//   if (!connected) {
//     return (
//       <div className="center">
//         <div className="form">
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.currentTarget.value)}
//             type="text"
//             placeholder="Enter your name"
//           />
//           <button onClick={connect}>Sing in</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="center">
//       <div>
//         <div className="form">
//           <input
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//             type="text"
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>

//         <div className="messages">
//           {messages.map((mess) => (
//             <div className="message" key={mess.id}>
//               {mess.event === "connection" ? (
//                 <div className="connection_message">
//                   User {mess.username} connected
//                 </div>
//               ) : (
//                 <div className="message">
//                   {mess.username}. {mess.message}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WebSocketConnect;

import { useRef, useState } from "react";

const WebSocketConnect = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState("");
  const socket = useRef();

  function connect() {
    socket.current = new WebSocket(`ws://localhost:5000`);


    socket.current.onopen = () => {
        setConnected(true);
  
        const message = {
          event: "connection",
          userName,
          id: Date.now(),
        };
        socket.current.send(JSON.stringify(message));
      };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };

    socket.current.onclose = () => {
      console.log("Socket closed");
    };

    socket.current.onerror = () => {
      console.log(`Socket error`);
    };
  }

  const sendMessage = async () => {
    if(!value) return
    const message = {
      userName,
      message: value,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={connect}>Sing in</button>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div>
        <div className="form">
          <input
            type="text"
            placeholder="Enter message"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>

        <div className="messages">
          {messages.map((mess) => (
            <div key={mess.id}>
              {mess.event === "connection" ? (
                <div className="connection_message">
                  User {mess.userName} connected
                </div>
              ) : (
                <div>
                  {mess.userName}. {mess.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebSocketConnect;
