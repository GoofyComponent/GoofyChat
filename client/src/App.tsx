import { useState } from "react";
import { Login } from "./components/auth/Login";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App h-screen w-screen bg-[#abadaa]">
      <Login />
    </div>
  );
}

export default App;
