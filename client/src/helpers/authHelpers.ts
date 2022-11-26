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

export const accountService = {
  saveToken,
  logout,
  islogedIn,
  getJWT,
};
