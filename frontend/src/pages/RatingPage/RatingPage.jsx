import Ad from '../../components/Ad/Ad';
import Carousel from '../../components/Carousel/Carousel';
import Comments from '../../components/Comments/comments';
import {
  useFetchAllAdsQuery,
  useFetchAllPostsQuery,
} from '../../redux/slices/userApiSlice';
import Loader from '../../components/Loader/Loader';

const RatingPage = () => {
  const { data: postsData, isLoading: postsLoading } = useFetchAllPostsQuery();
  const { data: adsData, isLoading: adsLoading } = useFetchAllAdsQuery();
  if (postsLoading || adsLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:w-4/5 w-100 bg-white-500 shadow-lg shadow-white-500/50">
          <Carousel postsData={postsData?.allPosts} />
        </div>
        <div className="md:w-1/5 w-100 bg-white-500 shadow-lg shadow-white-500/50 rounded">
          <Ad adsData={adsData?.allAds} />
        </div>
      </div>
      <div className="h-1/5 mt-3 mb-3">
        <Comments />
      </div>
    </div>
  );
};

export default RatingPage;
