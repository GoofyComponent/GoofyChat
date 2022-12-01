import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="landing__container flex flex-col items-center justify-center h-screen bg-primary">
        <div className="my-4 text-center flex justify-center flex-col">
          <p className="text-5xl font-bold text-primary">The authentic</p>
          <p className="text-5xl font-bold text-secondary">message app.</p>

          <h2 className="landing__subtitle text-2xl font-bold mx-2">
            <span className="text-primary">Stay goof.</span>
          </h2>
        </div>
        <button
          className="landing__button bg-tertiary text-tertiary font-bold py-2 px-4 rounded text-2xl hover:bg-secondary transition-all"
          onClick={(e) => {
            e.preventDefault();
            return navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </>
  );
};
