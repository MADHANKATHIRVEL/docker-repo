"use client";
import dynamic from "next/dynamic";
import React from "react";
const MobileScreenFilter = dynamic(() => import("@/components/mobile-screen/filter/MobileScreenFilter"));

export default function page() {
  return <MobileScreenFilter />;
}
