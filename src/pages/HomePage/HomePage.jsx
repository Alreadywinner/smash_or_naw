import { Button } from "flowbite-react";
import RatingImg from "../../assets/rating.jpg";
import "./HomePage.css";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-screen h-1/2 md:order-1 md:h-screen md:w-1/2 overflow-hidden landingPageImg">
        <img
          src={RatingImg}
          alt="rating"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-screen h-1/2 md:order-1 md:h-screen md:w-1/2 text-center items-center flex flex-col justify-center">
        <p className="lg:text-6xl md:mt-5 md:text-4xl text-5xl uppercase antialiased text-red-400 mb-8">
          Smash Or Naw
        </p>
        <div className="w-3/4 flex flex-col items-center mb-5">
          <p className="text-sm antialiased font-semibold leading-8 lg:leading-8 md:leading-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et quam
            vel odio faucibus ullamcorper. Nullam mattis ex quis lorem interdum,
            at semper nisi consectetur. Donec dictum nibh eu neque consectetur
            fringilla. Integer non bibendum nisi. Sed eget diam aliquam, feugiat
            massa a, tincidunt metus. Nullam ultricies, mi vitae aliquet
            ultricies, ex nisi hendrerit tellus, vel congue dui ipsum ut ligula
          </p>
          <Link to="/rating">
            <Button className="bg-red-400 hover:bg-red-500 mt-8">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
