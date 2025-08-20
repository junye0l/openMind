import { useEffect, useState } from 'react';
import { getSubjects } from '../api/getSubjects';
import CardList from '../components/AnswerList/CardList';
import Header from '../components/AnswerList/Header';
import Pagination from '../components/AnswerList/Pagination';
import Select from '../components/AnswerList/Select';
import Title from '../components/AnswerList/Title';

export default function AnswerList() {
  const [order, setOrder] = useState('name');
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPages, setCurrentPages] = useState(1);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const MediaItems = () => {
      if (window.innerWidth < 1024) {
        setLimit(6);
      } else {
        setLimit(8);
      }
    };

    MediaItems();
    window.addEventListener('resize', MediaItems);
    return () => window.addEventListener('resize', MediaItems);
  }, [limit]);

  useEffect(() => {
    const handleLoad = async () => {
      try {
        const { results, totalPages } = await getSubjects({
          limit,
          page: currentPages,
        });
        setItems(results);
        setTotalPages(totalPages);
        setLoading(true);
      } catch (e) {
        console.error(e);
      }
    };
    handleLoad();
  }, [currentPages, limit]);

  const sortedItem = [...items].sort((a, b) => {
    if (order === 'name') {
      return a.name.localeCompare(b.name, 'ko', { numeric: true })
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
    <div className="bg-gs-20 pt-10 pb-[97px] h-dvh">
      <div className="max-w-[327px] mx-auto my-0 md:max-w-[700px] lg:max-w-[940px]">
        <Header />
        <div className="flex justify-between items-center pt-[54px] md:flex-col md:pt-0">
          <Title>누구에게 질문할까요?</Title>
          <Select handleNew={handleNew} handleName={handleName} />
        </div>
        {loading ? <CardList items={sortedItem} /> : <div>로딩중...</div>}
        
        <Pagination
          currentPages={currentPages}
          setCurrentPages={setCurrentPages}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
