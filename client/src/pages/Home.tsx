import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { setJWT_API } from "../helpers/redux/slices/UserSlice";

import { Header } from "../components/base/Header";
import { Landing } from "../components/base/Landing";
import { appHelpers } from "../helpers/appHelpers";

export const Home = () => {
  const navigate = useNavigate();
  const APIJWT = useSelector((state: any) => state.user.JWT_API);

  useEffect(() => {
    document.title = "Home | GoofyChat";

    if (APIJWT !== null) {
      navigate("/app");
    }
  }, []);

  return (
    <>
      <Header />
      <Landing />
    </>
  );
};
