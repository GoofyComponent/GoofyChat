import { useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";

export const All = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/404");
  }, []);

  return <></>;
};
