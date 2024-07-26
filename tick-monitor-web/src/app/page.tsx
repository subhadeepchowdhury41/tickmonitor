"use client";

import Button from "@/components/ui/form/Button";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);
  return (
    <div className="w-full h-screen grid grid-cols-2">
      <div>
        <Button
          label="Send"
          onClick={async () => {
            await axios
              .get("/api/auth/me", {
                withCredentials: true,
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => console.error(err));
          }}
        />
      </div>
      <div></div>
    </div>
  );
}
