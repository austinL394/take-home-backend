import CarouselComponent from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
};
const urls = [
  'https://www.kermanig.com/cdn/shop/files/Monthly_promotions_4.jpg?v=1684538884&width=3840',
  'https://www.kermanig.com/cdn/shop/files/Monthly_promotions_4.jpg?v=1684538884&width=3840',
];

const Carousel = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1200px] w-full">
        <CarouselComponent responsive={responsive} autoPlay showDots infinite>
          {urls.map((url) => (
            <div key={url} className="w-full">
              <img src={url} alt="carousel" className="w-full" />
            </div>
          ))}
        </CarouselComponent>
      </div>
    </div>
  );
};

export default Carousel;
