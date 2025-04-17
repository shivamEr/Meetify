import React, { useEffect, useRef } from 'react';
import { image1, image2 } from '../../assets/ImageProvider';

const Home = () => {
  const sliderRef = useRef(null);
  let slideIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      slideIndex = (slideIndex + 1) % 3;
      sliderRef.current.style.transform = `translateX(-${slideIndex * 100}vw)`;
      sliderRef.current.style.transition = 'transform 1s ease-in-out';
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Carousel */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
        <div className="absolute w-full h-full overflow-hidden">
          <div className="flex" ref={sliderRef}>
            <img src={image1} className="w-screen object-cover" alt="carousel-1" />
            <img src={image2} className="w-screen object-cover" alt="carousel-2" />
            <img src={image1} className="w-screen object-cover" alt="carousel-3" />
          </div>
        </div>
        <div className="absolute z-10 text-center p-8 bg-white/70 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Empowering Smarter Meetings</h2>
          <p className="text-xl text-gray-700">
            AI Summaries, Real-Time Chatbot, Group Control, and More
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
