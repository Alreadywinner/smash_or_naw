import Ad from "../../components/Ad/Ad";
import Carousel from "../../components/Carousel/Carousel";
import Comments from "../../components/Comments/comments";

const RatingPage = () => {
  return (
    <div className="flex gap-4 m-2 flex-col">
      <div className="flex flex-row gap-4">
        <div className="w-4/5">
          <Carousel />
        </div>
        <div className="bg-white-500 shadow-lg shadow-white-500/50 w-1/5 h-56 sm:h-64 xl:h-80 2xl:h-96 rounded">
          <Ad />
        </div>
      </div>
      <div>
        <Comments />
      </div>
    </div>
  );
};

export default RatingPage;
