"use client";
import { useContext } from "react";
import AnimationContext from "@/context/AnimationContext";

const useAnimation = () => useContext(AnimationContext);

export default useAnimation;
