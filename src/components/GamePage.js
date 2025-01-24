import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GamePage = ({ token, setToken }) => {
  const [score, setScore] = useState(0);
  const [prizes, setPrizes] = useState(0);
  const [isPrizeWon, setIsPrizeWon] = useState(false); // State to track if a prize is won
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchGameData = async () => {
      try {
        const response = await axios.get("https://lucky-clicker-backend.vercel.app/game-data", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setScore(response?.data?.score);
        setPrizes(response?.data?.prizes);
      } catch (error) {
        if (error.response?.status === 401) {
          setToken(null);
        }
        alert(error.response?.data?.error || "An error occurred!!!!!!!!");
      }
    };
    fetchGameData();
  }, [token, navigate, setToken]);

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "https://lucky-clicker-backend.vercel.app/click",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newScore = response.data.score;
      const newPrizes = response.data.prizes;

      setScore(newScore);
      setPrizes(newPrizes);

      if (newPrizes > prizes) {
        toast('Good Job, you won a prize!', {
          icon: '👏',
          style: {
            color: "#721c24",          
            border: "1px solid #f5c6cb",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "18px",
          }
        });
        setIsPrizeWon(true);
        setTimeout(() => setIsPrizeWon(false), 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <div className={`game-container ${isPrizeWon ? "prize-effect" : ""}`}>
      <h2 className="game-title">Click For Surprise</h2>
      <p className="game-score">Score: {score}</p>
      <p className="game-prizes">Prizes: {prizes}</p>
      <button  className={`game-button ${isPrizeWon ? 'shake-animation' : ''}`} onClick={handleClick}>
        Click Me!
      </button>
      <button  className="game-button logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default GamePage;