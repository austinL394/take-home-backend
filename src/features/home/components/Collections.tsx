import { Collection } from '../types';

interface Props {
  collections: Collection[];
}
const Collections = ({ collections }: Props) => {
  return (
    <div className="flex flex-col gap-10 border border-black">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl">Collections</h1>
        <p className="text-lg">Explore curated collections of high-quality products</p>
      </div>
      <div className="flex flex-col gap-5">
        {collections.map((collection) => (
          <div key={collection.name} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <h2 className="text-xl">{collection.name}</h2>
              <p className="text-lg">{collection.description}</p>
            </div>
            <div className="flex flex-col gap-5">
              {collection.products.map((product) => (
                <div key={product.name} className="flex flex-col gap-5">
                  <img src={product.image} alt={product.name} />
                  <h3 className="text-lg">{product.name}</h3>
                  <p className="text-md">{product.price}</p>
                  <p className="text-md">{product.inventory}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
