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
    <>
      <FlowCarousel showThumbs={false}>
        {imagesData &&
          imagesData?.map((element) => {
            return (
              <div key={element.src} className="h-full w-full">
                <img
                  src={element.src}
                  alt="..."
                  className="w-full md:h-[40rem] h-96 object-cover rounded"
                />
              </div>
            );
          })}
      </FlowCarousel>
      <div className="flex items-center justify-center p-5">
        {/* Heading 'Naw' */}
        <div className="text-center md:mr-20 mr-5">
          <h2 className="text-xl font-bold uppercase">Naw</h2>
          <div className="flex items-center mt-2">
            <label
              htmlFor="naw1"
              className="md:mr-4 mr-2 flex flex-col md:gap-2 gap-1"
            >
              <span>1</span>
              <input type="radio" id="naw1" name="naw" />
            </label>
            <label
              htmlFor="naw2"
              className="md:mr-4 mr-2 flex flex-col md:gap-2 gap-1"
            >
              <span>2</span>
              <input type="radio" id="naw2" name="naw" />
            </label>
            <label htmlFor="naw3" className="flex flex-col md:gap-2 gap-1">
              <span>3</span>
              <input type="radio" id="naw3" name="naw" />
            </label>
          </div>
        </div>
        {/* Heading 'Or' */}
        <div className="text-center md:mr-20 mr-5">
          <h2 className="text-xl font-bold uppercase">Or</h2>
          <div className="flex items-center mt-2">
            <label
              htmlFor="or1"
              className="md:mr-4 mr-2 flex flex-col md:gap-2 gap-1"
            >
              <span>4</span>
              <input type="radio" id="or1" name="or" />
            </label>
            <label
              htmlFor="or2"
              className="md:mr-4 mr-2 flex flex-col md:gap-2 gap-1"
            >
              <span>5</span>
              <input type="radio" id="or2" name="or" />
            </label>
            <label htmlFor="or3" className="flex flex-col md:gap-2 gap-1">
              <span>6</span>
              <input type="radio" id="or3" name="or" />
            </label>
          </div>
        </div>
        {/* Heading 'Smash' */}
        <div className="text-center md:mr-20 mr-5">
          <h2 className="text-xl font-bold uppercase">Smash</h2>
          <div className="flex items-center mt-2">
            <label
              htmlFor="smash1"
              className="md:mr-4 mr-2 flex flex-col md:gap-2 gap-1"
            >
              <span>7</span>
              <input type="radio" id="smash1" name="smash" />
            </label>
            <label
              htmlFor="smash2"
              className="md:mr-4 mr-2 flex flex-col md:gap-2 gap-1"
            >
              <span>8</span>
              <input type="radio" id="smash2" name="smash" />
            </label>
            <label
              htmlFor="smash3"
              className="md:mr-4 mr-2 flex flex-col md:gap-2 gap-1"
            >
              <span>9</span>
              <input type="radio" id="smash3" name="smash" />
            </label>
            <label htmlFor="smash3" className="flex flex-col md:gap-2 gap-1">
              <span>10</span>
              <input type="radio" id="smash3" name="smash" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
