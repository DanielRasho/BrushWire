import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Context for storing the current View to show.
const AUTH_CONTEXT = createContext({
  token: "",
  setToken: () => {},
});

function OuthProvider({ children }) {
  const [token, setOuthToken] = useState(
    "eyJhbGciOiJIUzI1NiJ9.c21hdWc.s4z36nyTU7CWFPSnu8d5j_IHKtYR8_GCEkKrndrjENw",
  );

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setOuthToken(savedToken);
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
