import { useState } from "react";
import ButtonSimple from "../components/atoms/ButtonSimple";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const backHome = () => {
    navigate("/");
  };

  return (
    <div className="login">
      <ButtonSimple
        style={{ position: "absolute", top: "2ch", left: "2ch" }}
        onClick={backHome}
      >
        <i
          className="fa-solid fa-arrow-left"
          style={{ marginRight: "1ch" }}
        ></i>
        <span>Back</span>{" "}
      </ButtonSimple>
      <div className="login-card">
        <img src="./gradient-noise-purple.png" alt="" />
        <h2 className="font-subDisplay">Log in</h2>
        <h3> Get ready to share your advances </h3>
        <input
          type="text"
          required="required"
          autoFocus="autofocus"
          value={username}
          onChange={handleUsername}
          placeholder="Username"
          maxLength={30}
        />
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          placeholder="Password"
          maxLength={30}
        />
        <button> Sign in </button>
      </div>
      <div className="signup-helper">
        <span>No account yet?</span>{" "}
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            navigate("/signup");
          }}
        >
          Sign up now
        </a>
      </div>
    </div>
  );
}
