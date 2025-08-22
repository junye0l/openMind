import Messages from '../../assets/images/Messages.svg?react';

export default function Card({ item }) {
  return (
    <div className="border border-gs-40 rounded-2xl w-[155px] h-[168px] px-[20px] py-[20px] bg-white md:w-[220px] md:h-[187px]">
      <div>
        <img className="size-[60px] pb-3" src={item.imageSource} alt="질문카드프로필" />
      </div>
      <div>
        <h2 className="text-[20px] whitespace-nowrap text-ellipsis overflow-hidden pb-7">
          {item.name}
        </h2>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Messages className="size-[13px] fill-gs-40 mr-[5px] md:size-[18px]"/>
          <p className="text-gs-40 text-[14px] md:text-[16px]">받은 질문</p>
        </div>
        <div>
          <p className="text-gs-40 text-[14px] md:text-[16px]">{ item.questionCount}개</p>
        </div>
      </div>
    </div>
  );
}
