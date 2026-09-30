"use client";

import { useEffect, useState } from "react";

export default function AppSplashScreen({ children }) {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 700);
    const hideTimer = setTimeout(() => setShowSplash(false), 1000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 transition-opacity duration-300 ${
          showSplash ? (fadeOut ? "opacity-0" : "opacity-100") : "hidden"
        }`}
        aria-hidden={!showSplash}
      >
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-slate-900 text-3xl font-bold text-red-300">
            CP
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Portfolio Demo
          </p>
          <h1 className="mt-2 text-2xl font-bold text-white">
            Client Service Portal
          </h1>
        </div>
      </div>
      <div className={showSplash ? "opacity-0" : "opacity-100"}>{children}</div>
    </>
  );
}
