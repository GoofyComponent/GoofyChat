import { Link } from "react-router-dom";
import { Header } from "../components/base/Header";

import goofyChocked from "../assets/img/goofychocked.jpg";

export const QuatreCentQuatre = () => {
  return (
    <>
      <Header />
      {/* Contact block */}
      <div className="text-center">
        <div className="flex justify-center my-4">
          <img src={goofyChocked} className="rounded-xl" />
        </div>
        <h1 className="text-5xl text-white font-bold">Oh Oh...</h1>
        <p className="text-3xl text-white">It looks like you got lost...</p>
        <Link
          to={"/app"}
          className="text-2xl text-primary hover:text-secondary"
        >
          Let's get you back on track!
        </Link>
      </div>
    </>
  );
};
