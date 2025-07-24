import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  Trophy,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";

const About = () => {
  const stats = [
    {
      count: "Community-Driven",
      label: " Powered by shared travel experiences",
    },
    {
      count: "Transparency",
      label: "Trusted advice from real users",
    },
    {
      count: "Inclusivity",
      label: " Welcoming all types of travelers",
    },
    {
      count: "Sustainability",
      label: "Promoting eco-friendly travel",
    },
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 bg-gradient-to-b from-indigo-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">

              Welcome To YatraSahayak

            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              we are your trusted travel companion, dedicated to making
              exploration easy. We believe travel is about experiences and
              memories, and our platform offers reliable tools and information
              to make every journey unforgettable.
            </p>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              <Star className="w-8 h-8 text-purple-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Section */}
      <div className="bg-gray-800 py-6 overflow-hidden">
        <div className="relative flex whitespace-nowrap">
          <div className="animate-marquee flex space-x-8 px-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-indigo-400"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-lg font-semibold">{achievement}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 flex space-x-8 px-4 animate-marquee2">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-indigo-400"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-lg font-semibold">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <h3 className="text-3xl font-bold mb-2  text-purple-400">
                  {stat.count}
                </h3>
                <p className=" text-purple-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                Our Mission
              </h2>
              <p className="text-gray-300 mb-6">

                At Yatra Sahayak, our mission is to simplify travel planning and
                enhance your experiences. We strive to be your go-to platform
                for discovering hidden gems, planning trips, and finding insider
                tips.
              </p>
              <ul className="space-y-4">
                {[
                  "Simplify travel planning with easy-to-use tools.",
                  "Enrich travel experiences through curated content",
                  "Be your go-to platform for discovering hidden gems.",
                  "Provide insider tips and personalized trip planning",
                  "Promoting responsible and sustainable tourism",

                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-3 text-gray-300"
                  >
                    <ArrowRight className="w-5 h-5 text-purple-400" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe

                  src="https://www.google.com/maps?q=Tripvana&output=embed"

                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 bg-purple-900/30 rounded-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Explore the World?
            </h2>
            <p className="text-xl text-gray-300 mb-8">

              Join YatraSahayak today and embark on unforgettable journeys, one
              adventure at a time.

            </p>
            <button className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
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

export default About;
