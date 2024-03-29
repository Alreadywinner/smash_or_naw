import Ad from '../../components/Ad/Ad';
import Carousel from '../../components/Carousel/Carousel';
import Comments from '../../components/Comments/Comments';
import {
  useFetchAllAdsQuery,
  useFetchAllPostsQuery,
} from '../../redux/slices/userApiSlice';
import Loader from '../../components/Loader/Loader';
import { useState } from 'react';

const RatingPage = () => {
  const { data: postsData, isLoading: postsLoading } = useFetchAllPostsQuery();
  const { data: adsData, isLoading: adsLoading } = useFetchAllAdsQuery();
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const currentPost = postsData?.allPosts[currentPostIndex];

  if (postsLoading || adsLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:w-4/5 w-100 bg-white-500 shadow-lg shadow-white-500/50">
          <Carousel
            postsData={postsData?.allPosts}
            currentPostIndex={currentPostIndex}
            setCurrentPostIndex={setCurrentPostIndex}
          />
        </div>
        <div className="md:w-1/5 w-100 bg-white-500 shadow-lg shadow-white-500/50 rounded">
          <Ad adsData={adsData?.allAds} />
        </div>
      </div>
      <div className="h-1/5 mt-3 mb-3">
        <Comments currentPost={currentPost} />
      </div>
    </div>
  );
};

export default RatingPage;
