import jwt_decode from "jwt-decode";

let saveToken = async (JWT: string) => {
  await localStorage.setItem("token_JWT", JWT);
};

let logout = () => {
  localStorage.removeItem("token_JWT");
};

let islogedIn = () => {
  let JWT = localStorage.getItem("token_JWT");
  return !!JWT;
};

let getJWT = () => {
  return localStorage.getItem("token_JWT");
};

let extractMailFromJWT = () => {
  let JWT = localStorage.getItem("token_JWT");
  console.log(JWT);
  if (JWT) {
    let decoded: any = jwt_decode(JWT);
    console.log(decoded);
    return decoded.mercure.payload.email;
  }
  return null;
};

export const accountService = {
  saveToken,
  logout,
  islogedIn,
  extractMailFromJWT,
  getJWT,
};
