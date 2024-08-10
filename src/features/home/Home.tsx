import { MainLayout } from 'components/Layout/MainLayout';

import { useCollections } from './api';
import { useNavigate } from 'react-router-dom';
import { Collection } from './types';
import Collections from './components/Collections';
import Carousel from './components/Carousel';

export const Home = () => {
  const navigate = useNavigate();

  const { data } = useCollections();

  const onOpenCollection = (collection: Collection) => {
    navigate(`/collections/${collection.id}`);
  };

  return (
    <MainLayout>
      <div className="w-full flex flex-col gap-10 py-10">
        <Carousel />
        {data && <Collections collections={data} />}
      </div>
    </MainLayout>
  );
};
