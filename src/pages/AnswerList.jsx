import Header from "../components/AnswerList/Header";
import Select from "../components/AnswerList/Select";
import Title from "../components/AnswerList/Title";

export default function AnswerList() {
  return (
    <div className="bg-[#f9f9f9]">
      <div className="w-[940px] mx-auto my-0">
        <Header />  
        <Title>누구에게 질문할까요?</Title>
        <Select />
      </div>
    </div>
  )
}
