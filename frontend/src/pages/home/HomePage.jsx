// src/pages/HomePage.js
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function HomePage() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate('/user');
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the School Management Tool!</p>
      {/* You can add more content here */}
    </div>
  );
}

export default HomePage