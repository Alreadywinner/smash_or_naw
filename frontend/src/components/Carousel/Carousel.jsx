import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel as FlowCarousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from 'flowbite-react';

const Carousel = ({ postsData }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const imagesData = postsData;
  const handlePrevious = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === 0 ? imagesData.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === imagesData.length - 1 ? 0 : prevIndex + 1,
    );
  };
  return (
    <>
      <div className="flex justify-between mt-5 mb-5 p-5">
        <Button
          className="bg-red-400 text-white hover:bg-red-500"
          onClick={handlePrevious}
        >
          Previous Post
        </Button>
        <h1 className="text-3xl font-bold">
          {imagesData[currentPostIndex]?.post_name}
        </h1>
        <Button
          className="bg-red-400 text-white hover:bg-red-500"
          onClick={handleNext}
        >
          Next Post
        </Button>
      </div>
      <FlowCarousel showThumbs={false}>
        {imagesData &&
          imagesData[currentPostIndex]?.posts_data?.map((element) => {
            if (element.includes('.mp4') || element.includes('.webm')) {
              return (
                <div key={element} className="h-full w-full">
                  <video
                    src={element}
                    alt="..."
                    className="w-full md:h-[40rem] h-96 object-cover rounded"
                    controls
                  />
                </div>
              );
            } else {
              return (
                <div key={element} className="h-full w-full">
                  <img
                    src={element}
                    alt="..."
                    className="w-full md:h-[40rem] h-96 object-cover rounded"
                  />
                </div>
              );
            }
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

Carousel.propTypes = {
  postsData: PropTypes.array,
};

export default Carousel;
