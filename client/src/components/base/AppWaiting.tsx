import { RiChat3Fill } from "@react-icons/all-files/ri/RiChat3Fill";
import { Link } from "react-router-dom";

export const ContactChatWaiting = () => {
  return (
    <div className="flex flex-col w-full md:w-5/6 h-[86vh] mx-2 mt-auto md:my-auto p-2 bg-[#3B4D54] rounded-xl">
      <RiChat3Fill
        size={200}
        color={"#5EA7D4"}
        className="mx-auto w-3/12 mb-0 mt-auto"
      />
      <div className="text-2xl font-bold mt-0 mb-auto text-center text-secondary">
        <h1 className="text-4xl text-primary">
          It's a bit empty around here...
        </h1>
        <p>Open a conversation on the left side!</p>
        <p>or</p>
        <Link
          to={"/app/group/new"}
          className="transition-all my-4 border-b-2 border-secondary hover:cursor-pointer hover:text-primary hover:border-primary"
        >
          Create a new one!
        </Link>
      </div>
    </div>
  );
};
