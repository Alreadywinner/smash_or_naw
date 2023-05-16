import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as FlowCarousel } from "react-responsive-carousel";

const Carousel = () => {
  const imagesData = [
    {
      src: "https://images.unsplash.com/photo-1682686579976-879b74d6d7ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
    },
    {
      src: "https://flowbite.com/docs/images/carousel/carousel-2.svg",
    },
    {
      src: "https://flowbite.com/docs/images/carousel/carousel-3.svg",
    },
    {
      src: "https://flowbite.com/docs/images/carousel/carousel-4.svg",
    },
    {
      src: "https://flowbite.com/docs/images/carousel/carousel-5.svg",
    },
  ];
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <FlowCarousel showThumbs={false}>
        {imagesData &&
          imagesData?.map((element) => {
            return (
              <div key={element.src} className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <img
                  src={element.src}
                  alt="..."
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
      </FlowCarousel>
    </div>
  );
};

export default Carousel;
