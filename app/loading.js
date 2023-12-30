"use client";
import { useEffect, useState } from "react";
import "./styles/loader.css"

export default function Loading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
  return (
    <div className="h-screen bg-white w-full fixed top-0 left-0 flex items-center justify-center "><div className="loader"></div></div>
  )
}
}
