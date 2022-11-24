import { useState } from 'react'
import './Message.css'

function Message() {
    const [messages, setMessages] = useState([]);

    function setNewMessage(msg:any) {
        setMessages([
          ...messages,
          msg
        ]);
      }

      function sendMessage(e:any) {
        e.preventDefault();
        const msg = {
          username: e.target.username.value,
          text: e.target.text.value
        };
        setNewMessage(msg);
      }

  return (
    <div>
      <h1>GoofyChat</h1>
      <div>
        <p>
          Choisissez avec qui vous voulez discuter
        </p>
        <div>
          {/* Mettre ici la liste des personnes avec qui on peut discuter */}
          <div><button>Alice</button></div>
          <div><button>Bob</button></div>
        </div>
      </div>
    </div>
  )
}

export default Message
