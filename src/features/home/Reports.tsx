import { MainLayout } from 'components/Layout/MainLayout';

import { useCollections } from './api';
import { useNavigate } from 'react-router-dom';
import { Collection } from './types';
import Collections from './components/Collections';

export const Home = () => {
  const navigate = useNavigate();

  const { data } = useCollections();

  const onOpenCollection = (collection: Collection) => {
    navigate(`/collections/${collection.id}`);
  };

  return (
    <MainLayout>
      <Carousel />
      {data && <Collections collections={data} />}
    </MainLayout>
  );
};
