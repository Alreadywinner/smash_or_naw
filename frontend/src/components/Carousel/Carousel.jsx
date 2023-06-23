import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel as FlowCarousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';

const Carousel = ({ postsData }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const ratingArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const firstThreeElements = ratingArray.slice(0, 3);
  const secondThreeElements = ratingArray.slice(3, 6);
  const thirdFourElements = ratingArray.slice(6, 10);
  const imagesData = postsData;

  useEffect(() => {
    setSelectedOption(postsData[currentPostIndex].post_rating);
  }, [postsData, currentPostIndex]);
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
            {firstThreeElements &&
              firstThreeElements.map((element) => (
                <label
                  key={element}
                  htmlFor="naw1"
                  className="md:mr-4 mr-2 flex flex-col md:gap-2 gap-1"
                >
                  <span>{element}</span>
                  <input
                    type="radio"
                    id="naw1"
                    name="naw"
                    checked={selectedOption === element ? true : false}
                    disabled={selectedOption === element ? false : true}
                  />
                </label>
              ))}
          </div>
        </div>
        {/* Heading 'Or' */}
        <div className="text-center md:mr-20 mr-5">
          <h2 className="text-xl font-bold uppercase">Or</h2>
          <div className="flex items-center mt-2">
            {secondThreeElements &&
              secondThreeElements.map((element) => (
                <label
                  key={element}
                  htmlFor="naw1"
                  className="md:mr-4 mr-2 flex flex-col md:gap-2 gap-1"
                >
                  <span>{element}</span>
                  <input
                    type="radio"
                    id="naw1"
                    name="naw"
                    checked={selectedOption === element ? true : false}
                    disabled={selectedOption === element ? false : true}
                  />
                </label>
              ))}
          </div>
        </div>
        {/* Heading 'Smash' */}
        <div className="text-center md:mr-20 mr-5">
          <h2 className="text-xl font-bold uppercase">Smash</h2>
          <div className="flex items-center mt-2">
            {thirdFourElements &&
              thirdFourElements.map((element) => (
                <label
                  key={element}
                  htmlFor="naw1"
                  className="md:mr-4 mr-2 flex flex-col md:gap-2 gap-1"
                >
                  <span>{element}</span>
                  <input
                    type="radio"
                    id="naw1"
                    name="naw"
                    checked={selectedOption === element ? true : false}
                    disabled={selectedOption === element ? false : true}
                  />
                </label>
              ))}
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
