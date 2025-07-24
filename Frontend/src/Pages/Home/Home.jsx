import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Carousel from "../../components/Carousel/Carousel";
// import TravelShowcase from "../../components/PopularCities/TravelShowcase";

import {
  Users,
  Heart,
  Trophy,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Plane,
  MapPin,
  Sun,
  Compass,
} from "lucide-react";
import ExploreDestinations from "../SubSections/ExploreDestinations";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "/api/placeholder/1920/1080",
    "/api/placeholder/1920/1080",
    "/api/placeholder/1920/1080",
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      count: "100+",
      label: "Travel Partners",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      count: "20K+",
      label: "Happy Travelers",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      count: "200+",
      label: "Tours Organized",
    },
    { icon: <Globe className="w-8 h-8" />, count: "50+", label: "Countries" },
  ];

  const achievements = [
    "Curated Travel Destinations",
    "Personalized Itinerary",
    "User-Generated Content",
    "Real-Time Recommendations",
    "Innovative Trip Planning",
    "Best Travel Platform 2024",
    "Seamless Trip Planning Tool",
  ];

  const categories = [
    { icon: Sun, title: "Beach Getaways", count: 45 },
    { icon: Compass, title: "Adventure Tours", count: 32 },
    { icon: Heart, title: "Romantic Escapes", count: 28 },
    { icon: Globe, title: "Cultural Tours", count: 56 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Carousel />
      {/* Hero Section */}
      <section className="relative h-screen bg-indigo-900 overflow-hidden">
        <div className="absolute inset-0 transition-opacity duration-1000">
          <img
                src={heroImages[currentImageIndex]}
                alt="Hero background"
                className="w-full h-full object-cover opacity-40"
                /> 
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/50" />
              <div className="relative z-10 h-full flex items-center justify-center">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center px-4"
                >
                <div className="inline-block mb-4 animate-bounce">
                  <Plane className="w-16 h-16 text-white" />
                </div>
                <h1 className="text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                  Your Journey Begins Here
                </h1>
                <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                  Discover extraordinary destinations and create unforgettable
                  memories with Tripvana
                </p>
                <div className="flex justify-center gap-4">
                  <a href="/allposts" className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300 animate-pulse">
                  Explore Destinations
                  </a>
                  {/* <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300">
                  View Deals
                  </button> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white py-6 overflow-hidden">
        <div className="relative flex">
          <div className="animate-marquee whitespace-nowrap flex space-x-8 px-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-purple-300"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-lg font-semibold">{achievement}</span>
              </div>
            ))}
          </div>
         
        </div>
      </div>
            
      {/* Stats Section */}
      {/* <div className="py-20 bg-gradient-to-b from-indigo-900 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex justify-center mb-4 text-indigo-600">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.count}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

      {/* popular cities with season filter*/}
      {/* <AllPosts /> */}
      <ExploreDestinations />
      {/* <TravelShowcase /> */}

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Explore by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group cursor-pointer"
            >
              <div className="inline-block p-4 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
                <category.icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
                {category.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {category.count} destinations
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-b from-indigo-800 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Explore the World?
            </h2>
            <p className="text-xl text-indigo-200 mb-8">
              Join Tripvana today and embark on unforgettable journeys, one
              adventure at a time.
            </p>
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
              Start Your Journey
            </button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee2 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
