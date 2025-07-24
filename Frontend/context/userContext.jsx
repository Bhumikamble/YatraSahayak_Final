import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const updateUsername = (newUsername) => {
    setUser((prevUser) => ({ ...prevUser, username: newUsername }));
  };

  // Fetch the current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/current-user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
             // Include cookies (if using refresh tokens)
          }
        );
        setUser(res.data.data); // Set the user data in state
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(null); // Clear the user state if fetching fails
      }
    };

    if (!user) {
      fetchUser(); // Fetch user if not already fetched
    }
  }, [user]);

  // Logout function to log the user out
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/logout", 
        {}, 
        { headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }, } // Ensures that cookies are included
      );

      // Clear user data and localStorage tokens
      localStorage.removeItem("accessToken");
      setUser(null); // Reset the user state after logout

      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}