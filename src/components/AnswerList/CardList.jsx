import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

export default function CardList({ items }) {
  const navigate = useNavigate();

  const naviClick = e => {
    navigate(`/subjects/${e}`);
  };
  return (
    <ul className="pt-[30px] flex gap-4 flex-wrap md:gap-5">
      {items.map((item, index) => (
        <motion.li
          className="cursor-pointer"
          key={item.id}
          onClick={() => naviClick(item.id)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 + index * 0.1 }}
        >
          <Card item={item} />
        </motion.li>
      ))}
    </ul>
  );
}
