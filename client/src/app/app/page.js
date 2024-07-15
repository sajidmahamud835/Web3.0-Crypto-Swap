"use client";
import { Suspense } from 'react';
import Navbar from "../components/Navbar";
import CryptoSwap from "../components/CryptoSwap";

export default function Login() {
  return (
    <>
     <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <CryptoSwap />
          <br />
      </Suspense>
    </>
  );
}