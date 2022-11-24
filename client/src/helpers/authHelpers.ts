import jwt_decode from "jwt-decode";

let saveToken = async (JWT: string) => {
  await localStorage.setItem("JWT", JWT);
};

let logout = () => {
  localStorage.removeItem("JWT");
};

let islogedIn = () => {
  let JWT = localStorage.getItem("JWT");
  return !!JWT;
};

let extractMailFromJWT = () => {
  let JWT = localStorage.getItem("JWT");
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
};
