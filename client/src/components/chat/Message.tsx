import { useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import { appHelpers } from "../../helpers/appHelpers";

type MessageProps = {
  message: string;
  author: string;
  date: string;
};

export const Message = ({ message, author, date }: MessageProps) => {
  const loggedUsername = useSelector((state: any) => state.user.username);
  const isAuthor = loggedUsername === author;

  const DivMessage = tw.div<any>`
    ${() => (isAuthor ? "bg-tertiary" : "bg-secondary")}
    ${() => (isAuthor ? "ml-auto" : "")}
    rounded-2xl
    ${() => (isAuthor ? "rounded-br-none" : "rounded-bl-none")}
    min-w-[20rem]
    w-6/12
    px-4
    py-2
    my-2
`;

  return (
    <DivMessage>
      <p className="break-words w-full font-semibold">{message}</p>
      <div className="flex justify-between">
        <p className="italic text-sm">{appHelpers.dateTimeToTime(date)}</p>
        <p className="font-bold text-sm">{author}</p>
      </div>
    </DivMessage>
  );
};
