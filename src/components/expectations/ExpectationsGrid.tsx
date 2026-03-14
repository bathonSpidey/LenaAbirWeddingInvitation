import ExpectationCard from "./ExpectationCard";

interface ExpectationItem {
  number: string;
  tag: string;
  title: string;
  desc: string;
  img: string;
}

interface ExpectationsGridProps {
  items: ExpectationItem[];
}

export default function ExpectationsGrid({ items }: ExpectationsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {items.map((item, index) => (
        <ExpectationCard
          key={item.number}
          number={item.number}
          tag={item.tag}
          title={item.title}
          desc={item.desc}
          img={item.img}
          index={index}
        />
      ))}
    </div>
  );
}
