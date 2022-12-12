import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import GCLogo from "../../assets/img/goofychat.png";

export const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");

  const [waiting, setWaiting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);

    const config = {};

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/register`,
        {
          username: username,
          password: password,
          email: email,
          firstname: firstname,
          lastname: lastname,
        },
        config
      )
      .then((res) => {
        console.log(res);
        setWaiting(false);
        return navigate("/login");
      })
      .catch((err) => {
        setWaiting(false);
        console.log(err);
      });
  };

  return (
    <section
      id="login"
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
          <img src={GCLogo} className="w-5/12 md:hidden mx-auto" />
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
              className="text-2xl font-bold mt-6 text-primary md:text-tertiary"
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
              className="text-2xl font-bold mt-6 text-primary md:text-tertiary"
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
            <label
              htmlFor="username"
              className="text-2xl font-bold mt-6 text-primary md:text-tertiary"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-80 h-10 rounded-md border-2 border-primary mt-2 outline-none p-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label
              htmlFor="lastname"
              className="text-2xl font-bold mt-6 text-primary md:text-tertiary"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="w-80 h-10 rounded-md border-2 border-primary mt-2 outline-none p-2"
              onChange={(e) => setLastname(e.target.value)}
            />
            <label
              htmlFor="firstname"
              className="text-2xl font-bold mt-6 text-primary md:text-tertiary"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="w-80 h-10 rounded-md border-2 border-primary mt-2 outline-none p-2"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <button
              type="submit"
              className="w-80 h-10 rounded-md border-2 border-primary mt-6 bg-primary text-white hover:bg-secondary transition-all"
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
                <>Register</>
              )}
            </button>
            <Link
              to={"/login"}
              className="transition-all my-4 hover:border-b-2 border-tertiary"
            >
              Vous avez déja un compte ? <span>Connectez-vous !</span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
