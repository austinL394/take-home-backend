import { Collection } from '../types';

interface Props {
  collections: Collection[];
}

const Collections = ({ collections }: Props) => {
  return (
    <div className="flex flex-col gap-10 border border-black text-white">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl">Collections</h1>
        <p className="text-lg">Explore curated collections of high-quality products</p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-5 max-w-[800px]">
          {collections.map((collection) => (
            <div key={collection.name} className="flex  gap-5">
              <div className="flex flex-col gap-5">
                <img src={collection.image} alt={collection.name} />
              </div>
              <div className="flex flex-col gap-5">
                <h2 className="text-xl">{collection.name}</h2>
                <p className="text-lg">{collection.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
