import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { accountService } from "../../helpers/authHelpers";
import { ThreeDots } from "react-loader-spinner";
import GCLogo from "../../assets/img/goofychat.png";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);

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
        const JWT = res.data.token;
        accountService.saveToken(JWT);
        console.log("Local storage: " + localStorage.getItem("token_JWT"));
        setWaiting(false);
        return navigate("/");
      })
      .catch((err) => {
        setWaiting(false);
        setError(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <section
      id="register"
      className="bg-primary w-screen h-screen flex items-center justify-center md:justify-between"
    >
      <div
        className="text-center flex justify-center flex-col w-5/12 hidden md:block mx-auto hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={GCLogo} className="w-3/12 mx-auto my-2" />
        <h1 className="text-5xl font-bold mx-2">
          <span className="text-primary">Goofy</span>
          <span className="text-secondary">Corner</span>
        </h1>
        <p className="text-primary my-2 text-5xl font-bold mx-2">
          The authentic
        </p>
        <p className="text-secondary my-2 text-5xl font-bold mx-2">
          message app
        </p>

        <h2 className="text-2xl font-bold mx-2">
          <span className="text-primary">Stay goof.</span>
        </h2>
      </div>

      <div className="flex flex-col h-screen items-center justify-center md:bg-white md:w-6/12 md:rounded-tl-3xl md:rounded-bl-3xl">
        <div onClick={() => navigate("/")} className="hover:cursor-pointer">
          <img src={GCLogo} className="w-5/12 md:hidden mx-auto my-2" />
          <h1 className="text-5xl font-bold m-auto block md:hidden flex justify-center">
            <span className="text-primary">Goofy</span>
            <span className="text-secondary">Corner</span>
          </h1>
          <h2 className="landing__subtitle text-2xl font-bold mx-2 text-center md:hidden">
            <span className="text-primary">Stay goof.</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center">
            <label
              htmlFor="email"
              className="text-2xl font-bold mt-10 text-primary md:text-tertiary"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-80 h-10 rounded-md border-2 border-primary mt-2 outline-none p-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="password"
              className="text-2xl font-bold mt-10 text-primary md:text-tertiary"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-80 h-10 rounded-md border-2 border-primary mt-2 outline-none p-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-800 mt-4 font-bold">{error}</p>}
            <button
              type="submit"
              className="w-80 h-10 rounded-md border-2 border-primary mt-10 bg-primary text-white hover:bg-secondary transition-all"
              disabled={waiting}
            >
              {waiting ? (
                <ThreeDots
                  height={10}
                  width={80}
                  color="#FFFFFF"
                  ariaLabel="registering"
                  wrapperStyle={{ display: "flex", justifyContent: "center" }}
                />
              ) : (
                <>Login</>
              )}
            </button>
            <Link
              to={"/register"}
              className="transition-all my-4 hover:border-b-2 border-tertiary"
            >
              Vous n'avez pas encore de compte ? <span>Inscrivez-vous !</span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
