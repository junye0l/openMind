import { useEffect, useState } from 'react';
import CardList from '../components/AnswerList/CardList';
import Header from '../components/AnswerList/Header';
import Pagination from '../components/AnswerList/Pagination';
import Select from '../components/AnswerList/Select';
import Title from '../components/AnswerList/Title';
import { getsubjects } from '../hooks/getsubjects';

export default function AnswerList() {
  const [order, setOrder] = useState('name');
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currenPages, setCurrentPages] = useState(1);

  useEffect(() => {
    const handleLoad = async () => {
      const { results, totalPages } = await getsubjects({
        limit: 8,
        page : currenPages,
      });
      setItems(results);
      setTotalPages(totalPages);
    };
    handleLoad();
  }, [currenPages]);

  const sortedItem = [...items].sort((a, b) => {
    if (order === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return b[order] - a[order];
    }
  });

  const handleNew = () => {
    setOrder('createdAt');
  };
  const handleName = () => {
    setOrder('name');
  };

  return (
    <div className="bg-[#f9f9f9] pt-10 pb-[97px]">
      <div className="w-[940px] mx-auto my-0">
        <Header />
        <Title>누구에게 질문할까요?</Title>
        <Select handleNew={handleNew} handleName={handleName} />
        <CardList items={sortedItem} />
        <Pagination currenPages={currenPages} setCurrentPages={setCurrentPages} totalPages={totalPages} />
      </div>
    </div>
  );
}
