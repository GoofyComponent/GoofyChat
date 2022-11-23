import { SetStateAction, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import "./App.css";
import Login from "./component/Login/login";
import Register from "./component/Register/register";

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName: SetStateAction<string>) => {
    setCurrentForm(formName);
  }

  return (
    <>
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
    }
    </>
  );
}

export default App;
