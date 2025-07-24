import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MapPin, Calendar, X, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Itinerary from '../Itinerary/Itinerary';
import useItineraryStore from '../Itinerary/ItineraryService';
import { UserContext } from "../../../context/userContext";
import toast from "react-hot-toast";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(UserContext);
  const { addToItinerary } = useItineraryStore();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/posts/all");
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch posts.");
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  console.log(searchTerm)
  const seasons = [...new Set(posts.map(post => post.bestSeasonToVisit))];
  const filteredPosts = posts
    .filter(post => selectedSeason ? new RegExp(selectedSeason, "i").test(post.bestSeasonToVisit) : true)
    .filter(post =>
      searchTerm ?
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.placeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.location?.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

    const handleAddToItinerary = async (post) => {
      if (!user) {
        toast.error("Please log in to add items to your itinerary.");
        return;
      }
    
      try {
        await addToItinerary(user.id, {
          ...post,
          addedAt: new Date().toISOString(),
        });
        toast.success("Successfully added to itinerary!");
      } catch (error) {
        console.error("Error adding to itinerary:", error);
        toast.error("Failed to add to itinerary. Please try again.");
      }
    };
    

  const openModal = (post) => {
    setSelectedPost(post);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const nextImage = () => {
    if (selectedPost?.img) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedPost.img.length);
    }
  };

  const prevImage = () => {
    if (selectedPost?.img) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedPost.img.length) % selectedPost.img.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 flex items-center justify-center">
        <div className="text-white text-2xl">Loading amazing destinations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 flex items-center justify-center">
        <div className="text-red-400 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-indigo-900 to-indigo-800 min-h-screen text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
          Discover Amazing Locations
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Season Filter */}
          <div className="relative">
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-indigo-700 backdrop-blur-md border border-white/20 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Seasons</option>
              {seasons.map((season) => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post._id} className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 transform hover:scale-[1.02] transition-all duration-300">
              <div className="relative group">
                <img
                  src={post.img[0]}
                  alt={post.placeName}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className="p-6">
                <h2 className="font-bold text-xl mb-2">{post.placeName}</h2>
                <p className="text-gray-300 line-clamp-2 mb-4">{post.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span className="text-sm">{post.location}</span>
                    <div className="flex items-center text-gray-300">
                      <span className="text-sm">Posted by: {post.username}</span>
                    </div>
                    {/* <span className="text-sm">{post.username}</span> */}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span className="text-sm">{post.bestSeasonToVisit}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openModal(post)}
                    className="text-indigo-300 hover:text-indigo-200 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleAddToItinerary(post)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add to Itinerary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl overflow-hidden w-full max-w-5xl relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white p-2 rounded-full z-50 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="text-gray-600" />
              </button>

              <div className="flex flex-col md:flex-row h-[90vh]">
                {/* Left side - Image Gallery */}
                <div className="md:w-3/5 relative">
                  <div className="relative h-full">
                    <img
                      src={selectedPost.img[currentImageIndex]}
                      alt={selectedPost.placeName}
                      className="w-full h-full object-cover"
                    />

                    {/* Navigation buttons */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="text-gray-600" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="text-gray-600" />
                    </button>

                    {/* Thumbnail scroll */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                      <div className="bg-black bg-opacity-50 p-2 rounded-lg flex gap-2 overflow-x-auto">
                        {selectedPost.img.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all
                              ${currentImageIndex === index ? 'border-white scale-105' : 'border-transparent opacity-70'}`}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="md:w-2/5 p-6 overflow-y-auto">
                  <h2 className="font-bold text-2xl text-indigo-800 mb-4">{selectedPost.placeName}</h2>
                  <h2 className="font-bold text-2xl text-indigo-800 mb-4">{selectedPost.userId}</h2>
                  <div className="prose max-w-none">
                    <div className="text-gray-700">{selectedPost.description}</div>

                    <div className="mt-6">
                      <h3 className="font-bold text-lg text-gray-800">Category</h3>
                      <p className="text-gray-600">{selectedPost.category}</p>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-bold text-lg text-gray-800">Location</h3>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="mr-2" />
                        <span>{selectedPost.location}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-bold text-lg text-gray-800">Maps</h3>
                      <div className="mt-2 rounded-lg overflow-hidden">
                        <iframe
                          width="100%"
                          height="200"

                          style={{ border: 0 }}
                          src={`https://www.google.com/maps?q=${encodeURIComponent(selectedPost.placeName)}&output=embed`}
                          allowFullScreen
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-bold text-lg text-gray-800">Best Time to Visit</h3>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="mr-2" />
                        <span>{selectedPost.bestSeasonToVisit}</span>
                        {/* <span>{selectedPost.username}</span> */}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToItinerary(selectedPost)}
                    className="mt-8 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Add to Itinerary
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {user && <Itinerary userId={user.id} />} */}
      </div>
    </div>
  );
};

export default AllPosts;