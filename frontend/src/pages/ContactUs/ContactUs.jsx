import { Button } from "flowbite-react";
import LocationImg from "../../assets/location.svg";
import EnvelopeImg from "../../assets/envelope.svg";
import PhoneImg from "../../assets/phone.svg";

const ContactUs = () => {
  return (
    <section className="w-full">
      <div className="flex flex-col gap-5">
        <h5 className="text-center text-3xl mt-8 mb-5 font-bold">
          Get in Touch
        </h5>
        <form
          action="#"
          className="flex flex-col gap-5 mt-5 lg:ml-80 lg:mr-80 ml-5 mr-5"
        >
          <label>Your name *</label>
          <input
            type="text"
            name="name"
            className="h-9 border-solid border-2 border-red-600 rounded"
          />
          <label>Email *</label>
          <input
            type="text"
            name="email"
            className="h-9 border-solid border-2 border-red-600 rounded"
          />
          <label>Message *</label>
          <textarea
            name="message"
            cols="30"
            rows="8"
            className="border-solid border-2 border-red-600 rounded"
          ></textarea>
          <Button
            type="submit"
            className="bg-red-400 text-white hover:bg-red-500 rounded"
          >
            Subscribe
          </Button>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center mt-10 mb-5 leading-relaxed text-gray-500">
        <h5 className="text-2xl font-bold mt-10 mb-4">Contact Information</h5>
        <p className="text-center mt-10 mb-20 lg:ml-80 lg:mr-80 ml-5 mr-5">
          Cras ut varius magna. Morbi sed orci id sapien ultricies malesu. Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Dicta veritatis
          soluta, earum doloremque eius consectetur, facere nostrum fugit nam
          consequuntur quisquam tempore eos! Quisquam, accusamus.
        </p>
        <div className="flex items-center justify-between text-center gap-10 flex-col">
          <div className="flex md:flex-row flex-col items-center gap-10 text-base leading-relaxed text-gray-500">
            <img src={LocationImg} alt="location" width={100} height={100} />
            <span>San Francisco, CA , US</span>
          </div>
          <div className="flex md:flex-row flex-col items-center gap-10 text-base leading-relaxed text-gray-500">
            <img src={EnvelopeImg} alt="location" width={100} height={100} />

            <span>smashornah@support.com</span>
          </div>
          <div className="flex md:flex-row flex-col items-center gap-10 text-base leading-relaxed text-gray-500">
            <img src={PhoneImg} alt="location" width={100} height={100} />
            <span>(+92) - 303 005 854</span>
          </div>
        </div>

        <h5 className="mt-20 mb-5">Working Hours</h5>
        <p>Monday - Saturday: 8.am - 6.pm</p>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27972.48941898911!2d-122.45165589542735!3d37.77251754741872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1685122768882!5m2!1sen!2s"
        title="Map View"
        width="100%"
        height="600"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </section>
  );
};

export default ContactUs;
