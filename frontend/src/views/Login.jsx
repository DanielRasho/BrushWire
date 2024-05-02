import { useContext, useState } from "react";
import ButtonSimple from "../components/atoms/ButtonSimple";
import { useNavigate } from "react-router-dom";
import { AUTH_CONTEXT } from "../providers/auth";
import { BASE_URL } from "../helpers/routes";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(AUTH_CONTEXT);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnSignIn = async () => {
    if (username.length == 0 || password.length == 0) {
      alert("You need to feel the Username and Password Boxes");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const status = await response.status;
      const data = await response.json();

      if (status !== 200) {
        alert(data.message);
      } else {
        setToken(data.token);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
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
        <button onClick={handleOnSignIn}> Sign in </button>
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
