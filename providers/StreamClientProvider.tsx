"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";

import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, accessToken } = useAuth();

  useEffect(() => {
    if (!user || !accessToken) return;
    if (!API_KEY) throw new Error("Stream API key is missing");
console.log("Creating Stream Video Client for user:", user);
    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user._id, 
        name: user.name || "User",           // ← FIXED
        image: user.avatar || undefined,
      },

      tokenProvider: async () => {
        const res = await fetch("http://localhost:8080/stream/token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });

        const data = await res.json();

        if (!data.token) {
          throw new Error("Failed to get Stream token");
        }

        return data.token;
      },
    });

    setVideoClient(client);
  }, [user, accessToken]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
