import { useEffect, useRef, useState } from "react";
import Keycloak from "keycloak-js";

const useAuth = () => {
  const [isLogin, setLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [keycloackValue, setKeycloackValue] = useState(null);
  const isRun = useRef(false);

  const client = new Keycloak({
    url: "http://127.0.0.1:4000/",
    realm: "myRealm",
    clientId: "myClient",
  });
  useEffect(() => {
    console.log("useEffect");
    // console.log("client_id", process.env.VITE_KEYCLOAK_CLIENT);
    // console.log("url", import.meta.env.VITE_KEYCLOAK_URL);
    if (isRun.current) return;
    isRun.current = true;

    client
      .init({ onLoad: "login-required" })
      .then((res) => {
        setLogin(res);
        setToken(client.token);
        setKeycloackValue(client);
      })
      .catch((err) => {
        console.log("unable to login", err);
        client.logout();
      });

    console.log("token is set", token);
  }, []);
  const Logout = () => {
    //setLogin(false);
    keycloackValue.logout();
  };
  return [isLogin, token, Logout];
};

export default useAuth;
