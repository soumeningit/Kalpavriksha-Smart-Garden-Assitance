import { FaChevronRight } from "react-icons/fa";
import GrowingTree from "./Common/GrowingTree";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Grow Kolkata Green,
              <span className="block text-emerald-600">
                One Balcony at a Time.
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
              Kalpavriksha is your personal AI gardening assistant, helping you
              transform urban spaces into lush green havens. Let's make our city
              breathe again.
            </p>
            <Link
              to="/features"
              className="inline-flex items-center bg-emerald-500 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Green Journey{" "}
              <FaChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
          <div className="w-full max-w-md mx-auto md:max-w-none">
            <GrowingTree />
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
