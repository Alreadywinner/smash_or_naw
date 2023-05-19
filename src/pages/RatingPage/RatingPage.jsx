import Ad from "../../components/Ad/Ad";
import Carousel from "../../components/Carousel/Carousel";
import Comments from "../../components/Comments/comments";

const RatingPage = () => {
  return (
    <div className="flex gap-5 m-2 flex-col">
      <div className="flex flex-col md:flex-row gap-4 h-3/4">
        <div className="md:w-4/5 w-100 bg-white-500 shadow-lg shadow-white-500/50">
          <Carousel />
        </div>
        <div className="bg-white-500 shadow-lg shadow-white-500/50 md:w-1/5 w-100 rounded">
          <Ad />
        </div>
      </div>
      <div className="w-full md:w-4/5 bg-white-500 shadow-lg shadow-white-500/50 p-4 h-1/4">
        <Comments />
      </div>
    </div>
  );
};

export default RatingPage;
