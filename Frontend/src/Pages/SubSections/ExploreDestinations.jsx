import React, { useEffect, useState, useContext } from "react";
import { MapPin, Calendar, Search, Share2, Filter } from "lucide-react";
import { UserContext } from "../../../context/userContext";
import useItineraryStore from '../Itinerary/ItineraryService';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";

const ExploreDestinations = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const { user } = useContext(UserContext);
    const { addToItinerary } = useItineraryStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/posts/all");
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch posts.");
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleShare = (post) => {
        if (navigator.share) {
            navigator.share({
                title: post.placeName,
                text: `Check out this amazing destination: ${post.placeName}`,
                url: window.location.origin + `/posts/${post._id}`,
            }).catch((error) => console.error("Error sharing", error));
        } else {
            toast.error("Sharing is not supported on this device.");
        }
    };

    const cities = [...new Set(posts.map(post => {
        const city = post.location?.split(',')[0]?.trim();
        return city || '';
    }))].filter(city => city !== '');

    const filteredPosts = posts
        .filter(post => selectedCity ? post.location?.toLowerCase().includes(selectedCity.toLowerCase()) : true)
        .filter(post =>
            searchTerm ?
                post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.placeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.location?.toLowerCase().includes(searchTerm.toLowerCase())
                : true
        );

    const handleAddToItinerary = (post) => {
        if (user) {
            addToItinerary(user.id, {
                ...post,
                addedAt: new Date().toISOString()
            });
            toast.success("Added to itinerary!");
        }
    };

   
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 flex items-center justify-center">
                <div className="text-white text-2xl animate-pulse">Discovering wonderful places...</div>
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
        <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-800">
            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-black/50" />
                <img
                    src="/api/placeholder/1920/1080"
                    alt="Travel Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <h1 className="text-5xl font-bold mb-4 text-center">
                        Explore the World's Hidden Gems
                    </h1>
                    <p className="text-xl text-center max-w-2xl mb-8">
                        Discover breathtaking destinations and create unforgettable memories
                    </p>

                    {/* Search Bar */}
                    <div className="w-full max-w-2xl relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search your next adventure..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <Filter className="text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="bg-indigo-800/50 backdrop-blur-md border-y border-white/20 p-4">
                    <div className="max-w-7xl mx-auto flex items-center gap-4">
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-indigo-700/50 backdrop-blur-md border border-white/20 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All Cities</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <div key={post._id} className="group relative">
                            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden h-96">
                                <img
                                    src={post.img[0]}
                                    alt={post.placeName}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h2 className="text-2xl font-bold text-white mb-2">{post.placeName}</h2>
                                <p className="text-gray-200 text-sm line-clamp-2 mb-4">{post.description}</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center text-gray-300">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span className="text-sm">{post.location}</span>
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            <span className="text-sm">{formatDate(post.createdAt)}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleShare}
                                            className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors"
                                        >
                                            <Share2 className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExploreDestinations;