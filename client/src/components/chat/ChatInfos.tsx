import tw from "tailwind-styled-components";

type chatinfosProps = {
  convDataInfos: any;
};

const SectionChatInfos = tw.section<any>`
        flex
        justify-between
        w-full
        h-20
        px-4
        py-2
        mb-2
        border-b-2
        border-tertiary
        font-extrabold
        text-3xl
    `;

export const ChatInfos = ({ convDataInfos }: chatinfosProps) => {
  return (
    <SectionChatInfos>
      <img src="" alt="dsqd"></img>
      <p className="my-auto">{convDataInfos.name}</p>
    </SectionChatInfos>
  );
};
