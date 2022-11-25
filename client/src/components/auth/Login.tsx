import { useState } from "react";
import axios from "axios";
import { accountService } from "../../helpers/authHelpers";
import { redirect } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    var url = "http://localhost:8245/api/login";
    var headers = {};

    axios
      .post(
        url,
        {
          username: email,
          password: password,
        },
        { headers: headers }
      )
      .then((res) => {
        console.log(res);
        const JWT = res.data.token;
        console.log(JWT);
        accountService.saveToken(JWT);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        /* return redirect("/"); */
        //return (window.location.href = "/");
      });
  };

  return (
    <>
      <header className="h-[10%] w-full bg-gradient-to-b from-[#FFFFFF] to-[#4f7d96]">
        <div className="text-center">
          <p className="m-auto">Bonjour, merci de vous connecter !</p>
        </div>
      </header>
      <div className="m-auto w-full h-[80%]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center w-7/12 ms-auto"
        >
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="hidden" type="submit">
            Login
          </button>
        </form>
        <footer className="h-[10%] bg-gradient-to-t from-[#FFFFFF] to-[#4f7d96]  flex justfify-around">
          <div className="m-auto">
            <p>JE N'AI PAS DE COMPTE</p>
          </div>
          <div
            className="m-auto"
            onClick={() => {
              //click on the submit button
              const submitButton = document.querySelector(
                'button[type="submit"]'
              ) as HTMLButtonElement;
              submitButton.click();
            }}
          >
            <p>ME CONNECTER</p>
          </div>
        </footer>
      </div>
    </>
  );
};
