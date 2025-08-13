import Card from './Card';

export default function CardList({ items }) {
  return (
    <ul className='pt-[30px] flex gap-4 flex-wrap md:gap-5'>
      {items.map((item) => (
        <li key={item.id}>
          <Card item={item} />
        </li>
      ))}
    </ul>
  )
}
