import React, { useEffect, useRef } from "react";

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

    console.log("token", config);

    axios
      .get("/first/one", config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return <div>Protected</div>;
};

export default Protected;
