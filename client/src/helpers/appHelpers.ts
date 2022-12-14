import Cookies from "universal-cookie";

let createMercureCookie = async (JWT: string) => {
  const d = new Date();
  d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);

  /* const expires = "expires=" + d.toUTCString();
  document.cookie = `mercureAuthorization=${JWT};path=/.well-know/mercure;${expires}, domain=${"localhost"}, httpOnly`;
  document.cookie = `fdp=${JWT};`; */
  const cookies = new Cookies();

  cookies.set("mercureAuthorization", JWT, {
    expires: d,
    domain: `${import.meta.env.VITE_DOMAIN_COOKIE}`,
    /* secure: false, */
    sameSite: "lax",
  });

  console.log("cookie", cookies);
};

const deleteMercureCookie = () => {
  const cookies = new Cookies();
  cookies.remove("mercureAuthorization");
};

const dateTimeToTime = (dateTime: string) => {
  if (dateTime === null) return "";
  if (dateTime === undefined) return "";
  if (dateTime === "") return "";

  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hours12 = hours % 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours12}:${minutesStr}${ampm}`;
};

export const appHelpers = {
  createMercureCookie,
  dateTimeToTime,
  deleteMercureCookie,
};
