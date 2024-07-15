"use client";
import { useState, useEffect } from "react";
import CryptoSwap from "./CryptoSwap";
export default function InputField() {
  const options = ["ETH", "DAI", "USDC"];
  const [sellSelected, setSellSelected] = useState(options[0]);
  const [buySelected, setBuySelected] = useState(""); // Initialize to empty string

  return (
        <CryptoSwap />
  );
}