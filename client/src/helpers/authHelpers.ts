let saveToken = async (JWT: string) => {
  await localStorage.setItem("token_JWT", JWT);
};

let deleteToken = () => {
  localStorage.removeItem("token_JWT");
};

let islogedIn = () => {
  let JWT = localStorage.getItem("token_JWT");
  return !!JWT;
};

let getJWT = () => {
  return localStorage.getItem("token_JWT");
};

let createMercureCookie = async (JWT: string) => {
  const d = new Date();
  d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `mercureAuthorization=${JWT};path=/.well-know/mercure;${expires}, domain=${"localhost"}, httpOnly`;
};

export const accountService = {
  saveToken,
  deleteToken,
  islogedIn,
  getJWT,
  createMercureCookie,
};
