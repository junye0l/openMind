import { useNavigate } from 'react-router-dom';
import Card from './Card';

export default function CardList({ items }) {
  const navigate = useNavigate();

  const naviClick = (e) => {
    navigate(`/subjects/${e}`);
  }
  return (
    <ul className='pt-[30px] flex gap-4 flex-wrap md:gap-5'>
      {items.map((item) => (
        <li className='cursor-pointer' key={item.id} onClick={() => naviClick(item.id)}>
          <Card item={item} />
        </li>
      ))}
    </ul>
  )
}
