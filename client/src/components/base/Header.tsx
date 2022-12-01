import GCLogo from "../../assets/img/goofychat.png";

export const Header = () => {
  return (
    <header className="bg-primary flex items-center justify-between p-4 bg-primary">
      <div className="flex items-center">
        <img src={GCLogo} alt="logo" className="object-contain w-2/12 mx-2" />
        <h1 className="text-4xl font-bold mx-2">
          <span className="text-primary">Goofy</span>
          <span className="text-secondary">Chat</span>
        </h1>
      </div>

      {/* <div className="header__right flex items-center">
        <button className="header__button bg-tertiary text-tertiary font-bold py-2 px-4 rounded text-2xl hover:bg-secondary transition-all">
          Login
        </button>
      </div> */}
    </header>
  );
};
