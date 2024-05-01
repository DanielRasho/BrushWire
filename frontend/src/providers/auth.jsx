import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Context for storing the current View to show.
const AUTH_CONTEXT = createContext({
  token: "",
  setToken: () => {},
});

function OuthProvider({ children }) {
  const [token, setOuthToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (typeof savedToken == "string") {
      setOuthToken(savedToken);
    } else {
      setOuthToken("");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <AUTH_CONTEXT.Provider value={{ token: token, setToken: setOuthToken }}>
      {children}
    </AUTH_CONTEXT.Provider>
  );
}

OuthProvider.propTypes = {
  children: PropTypes.any,
};

export { AUTH_CONTEXT, OuthProvider };
