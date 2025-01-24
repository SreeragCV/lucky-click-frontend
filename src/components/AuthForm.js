import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthForm = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("token:", token);
    
    if(token){
      navigate("/game")
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/login" : "/register";
    try {
      const response = await axios.post(`http://localhost:5000${url}`, {
        username,
        password,
      });
      console.log("response.data.token", response.data.token);

      setToken(response?.data?.token);
      navigate("/game");
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred", {
        style: {
          color: "#721c24",          
          border: "1px solid #f5c6cb",
          padding: "16px",
          borderRadius: "12px",
          fontSize: "18px",
        },
      });
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">{isLogin ? "Login for surprises!" : "Register"}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth-submit" type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <button className="auth-switch" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need to register?" : "Already have an account?"}
      </button>
    </div>
  );
};

export default AuthForm;
