"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Header from "../components/Header";
import TransactionHistory from "../components/TransactionHistory";
import { TransactionProvider } from "../context/TransactionContext";

export default function Login() {
  const style = {
    wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#2D242F] text-white select-none flex flex-col justify-between`,
  }
  return (
    <>
      {" "}
      <TransactionProvider>
        <div div className={style.wrapper}>
          <Header />
          <Main />
          <TransactionHistory />
        </div>
      </TransactionProvider>
    </>
  );
}
