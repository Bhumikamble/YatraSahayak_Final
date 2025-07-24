import { create } from "zustand";
import { persist } from "zustand/middleware";

// Create a Zustand store
const useItineraryStore = create(
  persist(
    (set, get) => ({
      itineraries: {},

      addToItinerary: (userId, item) => {
        const userItinerary = get().itineraries[userId] || [];

        // Check if item already exists
        if (
          !userItinerary.some((existingItem) => existingItem._id === item._id)
        ) {
          set((state) => ({
            itineraries: {
              ...state.itineraries,
              [userId]: [
                ...userItinerary,
                { ...item, addedAt: new Date().toISOString() },
              ],
            },
          }));
          return true;
        }
        return false;
      },

      // Remove item from a user's itinerary
      removeFromItinerary: (userId, itemId) => {
        const userItinerary = get().itineraries[userId] || [];
        set((state) => ({
          itineraries: {
            ...state.itineraries,
            [userId]: userItinerary.filter((item) => item._id !== itemId),
          },
        }));
      },

      // Get a user's itinerary
      getUserItinerary: (userId) => {
        return get().itineraries[userId] || [];
      },

      // Clear a user's itinerary
      clearItinerary: (userId) => {
        set((state) => ({
          itineraries: {
            ...state.itineraries,
            [userId]: [],
          },
        }));
      },

      // Reorder items in the itinerary
      reorderItinerary: (userId, startIndex, endIndex) => {
        const userItinerary = [...(get().itineraries[userId] || [])];
        const [removed] = userItinerary.splice(startIndex, 1);
        userItinerary.splice(endIndex, 0, removed);

        set((state) => ({
          itineraries: {
            ...state.itineraries,
            [userId]: userItinerary,
          },
        }));
      },
    }),
    {
      name: (userId) => `travel-itineraries-${userId}`, // Unique localStorage key based on userId
      version: 1,
    }
  )
);

export default useItineraryStore;
