"use client";

import { useAuthContext } from "@asgardeo/auth-react";

export default function Profile() {
  const { state } = useAuthContext();

  const callAPI = async () => {
    const res = await fetch("http://localhost:9090/api/profile", {
      headers: {
        Authorization: `Bearer ${state.accessToken}`
      }
    });

    const data = await res.json();
    console.log(data);
  };

  return <button onClick={callAPI}>Call Backend</button>;
}
