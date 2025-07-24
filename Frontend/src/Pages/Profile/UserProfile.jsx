import React, { useState, useContext } from "react";
import { Camera, MapPin, Globe, Send, X, Edit3 } from "lucide-react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";

const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    location: "",
    placeName: "",
    text: "",
    category: "",
    bestSeasonToVisit: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  
  const categories = [
    "Beach",
    "Waterfall",
    "Cultural",
    "Historical",
    "Peaks",
    "Mountains",
    "Adventure",
  ];
  const seasons = ["Spring", "Summer", "Autumn", "Winter", "Rainy"];

  const handlePost = async () => {
    try {
      setIsLoading(true);

      // Validate required fields
      if (!newPost.placeName || !newPost.location || !newPost.bestSeasonToVisit || !newPost.category) {
        alert("Please fill in all required fields: Place name, location, best season to visit, and category");
        return;
      }

      // Validate that either text or image is present
      if (!newPost.text && selectedImages.length === 0) {
        alert("Post must have text or at least one image");
        return;
      }

      // Create FormData for multipart form submission
      const formData = new FormData();
      formData.append("text", newPost.text);
      formData.append("placeName", newPost.placeName);
      formData.append("location", newPost.location);
      formData.append("bestSeasonToVisit", newPost.bestSeasonToVisit);
      formData.append("category", newPost.category);
      
      // Append multiple images
      selectedImages.forEach((image, index) => {
        formData.append(`img`, image);
      });

      const response = await axios.post(
        "http://localhost:8000/posts/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update local state with new post
      setPosts([response.data, ...posts]);
      
      // Reset form
      setNewPost({
        location: "",
        placeName: "",
        text: "",
        category: "",
        bestSeasonToVisit: "",
      });
      setSelectedImages([]);

      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert(error.response?.data?.error || "Error creating post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert(`Image ${file.name} is larger than 5MB and will be skipped`);
        return false;
      }
      return true;
    });

    // Limit to maximum 5 images
    const totalImages = selectedImages.length + validFiles.length;
    if (totalImages > 5) {
      alert("Maximum 5 images allowed. Only the first " + (5 - selectedImages.length) + " images will be added.");
      validFiles.splice(5 - selectedImages.length);
    }

    setSelectedImages(prev => [...prev, ...validFiles]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gradient-to-b from-indigo-900 to-indigo-800 min-h-screen text-white">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 text-gray-800">
          <h3 className="text-2xl font-bold mb-4 text-center text-indigo-600">
            Create New Post
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Place Name *</label>
              <input
                type="text"
                placeholder="Enter place name"
                value={newPost.placeName}
                onChange={(e) => setNewPost({ ...newPost, placeName: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location *</label>
              <input
                type="text"
                placeholder="Enter location"
                value={newPost.location}
                onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Share your experience about this place"
                value={newPost.text}
                onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-400 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Images (Max 5 images, each under 5MB)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
              <div className="flex flex-wrap gap-4 mt-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-md"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category *</label>
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Best Season to Visit *</label>
              <select
                value={newPost.bestSeasonToVisit}
                onChange={(e) => setNewPost({ ...newPost, bestSeasonToVisit: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select Season</option>
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handlePost}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-md hover:from-indigo-600 hover:to-purple-600 transition duration-300 flex items-center justify-center ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                "Creating Post..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Create Post
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;