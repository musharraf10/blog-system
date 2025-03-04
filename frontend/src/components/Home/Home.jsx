import React, { useEffect, useState } from "react";
import Features from "./Features";
import CallToAction from "./CallToAction";
import { Link } from "react-router-dom";
import PublicnavBar from "../Navbar/PublicNavbar";

const Home = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <>
      <PublicnavBar />
      <section className="overflow-hidden pb-24 bg-gradient-to-b from-gray-50 to-white text-gray-900">
        <div className="container px-6 md:px-12 mx-auto relative text-center">
          <div className="max-w-4xl mx-auto py-16 md:py-24">
          <h1
  className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.2] tracking-wide mt-5 text-gray-800 text-center transition-all duration-1000 ease-out transform ${
    animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`}
>
  Explore the Power of  
  <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1565C0] to-[#42A5F5]">
    Shared Wisdom
  </span>
</h1>

            <p
              className={`text-lg md:text-xl text-gray-600 mt-5 max-w-3xl mx-auto transition-opacity duration-1000 delay-200 ${
                animate ? "opacity-100" : "opacity-0"
              }`}
            >
              Embark on a journey of discovery and growth. Connect, collaborate, and create with a global network of enthusiastic learners and thinkers.
            </p>
            <div
              className={`mt-8 transition-transform duration-1000 ease-in-out delay-300 ${
                animate ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <Link
                to="/register"
                className="inline-block bg-gradient-to-r from-[#1565C0] to-[#42A5F5] hover:from-[#0D47A1] hover:to-[#1E88E5] transition-all duration-300 text-white font-semibold text-lg px-8 py-2.3 md:px-10 md:py-4 rounded-full shadow-lg transform hover:scale-105 hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-6 md:px-12 mt-16">
          <Features />
        </div>

        {/* Call to Action Section */}
        <div className="container mx-auto px-6 md:px-12 mt-20 text-center">
          <CallToAction />
        </div>
      </section>
    </>
  );
};

export default Home;
