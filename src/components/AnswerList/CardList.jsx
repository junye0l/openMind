import Card from './Card';

export default function CardList({ items }) {
  return (
    <ul className='pt-[30px] flex gap-5 flex-wrap'>
      {items.map((item) => (
        <li key={item.id}>
          <Card item={item} />
        </li>
      ))}
    </ul>
  )
}
