import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Ad = ({ adsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImg, setCurrentImg] = useState('');
  useEffect(() => {
    if (adsData && adsData.length > 1) {
      const interval = setInterval(() => {
        if (currentIndex < adsData.length) {
          setCurrentImg(adsData[currentIndex].ad_image);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          setCurrentIndex(0);
        }
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [adsData, currentIndex]);

  const handleImageClick = () => {
    // Open a new tab with the provided link
    const currentAd =
      adsData && adsData.length > 0 ? adsData[currentIndex] : null;
    if (currentAd) {
      window.open(currentAd.ad_link, '_blank');
    }
  };

  return (
    <img
      src={currentImg}
      alt="..."
      className="h-full w-full object-cover rounded cursor-pointer"
      onClick={handleImageClick}
      loading="lazy"
    />
  );
};

Ad.propTypes = {
  adsData: PropTypes.array,
};

export default Ad;
