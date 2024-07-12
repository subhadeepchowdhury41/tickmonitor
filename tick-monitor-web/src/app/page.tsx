"use client";

import Button from "@/components/ui/Button";
import axios from "axios";
import Image from "next/image";

export default function Home() {
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
