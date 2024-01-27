import React, { useEffect, useRef } from "react";
import axios from "axios";

const Protected = ({ token }) => {
  const isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    console.log("Request Headers:", config.headers);

    axios
      .get("/first/one", config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [token]);

  return <div>Protected</div>;
};

export default Protected;
