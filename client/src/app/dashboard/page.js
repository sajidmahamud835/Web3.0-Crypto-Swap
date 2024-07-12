import DashboardNavbar from "../components/DashboardNavbar";
import { FaPlus } from "react-icons/fa6";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaQuestion } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { HiMiniWallet } from "react-icons/hi2";
import { RiBaseStationLine } from "react-icons/ri";
import { PiCursorClickFill } from "react-icons/pi";
import { GiStarsStack } from "react-icons/gi";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <DashboardNavbar />

      <section className="flex flex-col md:flex-row p-6 gap-6 bg-gray-100 dark:bg-gray-900">
        {/* Left Column */}
        <div className="md:w-2/3 w-full">
          <h1 className="text-2xl dark:text-blue-200 font-bold">Hi, User</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 ">
            Welcome to CryptoSwap! Go to the section you are interested in to
            start your amazing journey with us.
          </p>
          <h2 className="mt-6 text-xl font-semibold dark:text-white">Wallet</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {/* First Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800 flex flex-col items-center">
              <h3 className="text-3xl dark:text-blue-200 font-bold">$0.00</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Pending Balance
              </p>
            </div>
            {/* Second Card */}
            <Link href={"/OngoingTrades"}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800 flex flex-col items-center">
                <div className="mb-2 p-2 bg-blue-500 rounded-lg text-white">
                  <FaArrowRightArrowLeft size={20} />
                </div>
                <h3 className="text-lg dark:text-blue-200 font-bold">
                  Ongoing Trades
                </h3>
                <p className="text-gray-500 dark:text-gray-400">Wallet</p>
              </div>
            </Link>
            {/* Third Card */}
            <Link href={"/NewTrade"}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800 flex flex-col items-center">
                <div className="mb-2 p-2 bg-blue-500 rounded-lg text-white">
                  <FaPlus size={20} />
                </div>{" "}
                <h3 className="text-lg dark:text-blue-200 font-bold">
                  New Trade
                </h3>
                <p className="text-gray-500 dark:text-gray-400">Facilities</p>
              </div>
            </Link>
            {/* Fourth Card */}
            <Link href={"/CompletedTrades"}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800 flex flex-col items-center">
                <div className="mb-2 p-2 bg-blue-500 rounded-lg text-white">
                  <GiHamburgerMenu size={20} />
                </div>{" "}
                <h3 className="text-lg dark:text-blue-200 font-bold">
                  Completed Trades
                </h3>
              </div>
            </Link>
            {/* fifth card */}

            <Link href={"https://telegram.org/"}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800 flex flex-col items-center">
                <div className="mb-2 p-2 bg-blue-500 rounded-lg text-white">
                  <FaQuestion size={20} />
                </div>
                <h3 className="text-lg dark:text-blue-200 font-bold">
                  Support
                </h3>
                <p className="text-gray-500 dark:text-gray-400">In Telegram</p>
              </div>
            </Link>
          </div>
          {/* <div className="mt-4 p-4 bg-blue-100 dark:bg-gray-700 rounded-lg">
            <p className="text-blue-500 dark:text-blue-200 font-bold">
              Now trading at night is 25% more profitable
            </p>
            <p className="mt-2 text-blue-500">
              Every night from 00:00 to 8:00 Moscow time, you get 25% more from
              each trade than during the day.
            </p>
          </div> */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800 flex flex-col items-center">
              <div className="mb-2 p-2 bg-blue-500 rounded-lg text-white">
                <FaQuestion size={20} />
              </div>
              <h3 className="text-lg dark:text-blue-200 font-bold">Support</h3>
              <p className="text-gray-500 dark:text-gray-400">In Telegram</p>
            </div>
          </div> */}
        </div>

        {/* Right Column */}
        <div className="md:w-1/3 w-ful space-y-6">
          <div className="text-2xl dark:text-blue-200 font-bold text-blue-500">
            HOW TO START?
          </div>
          <h2 className="mt-6 text-xl font-semibold dark:text-white">
            First steps in trading
          </h2>
          <p className="text-gray-600 dark:text-gray-400 ">
            A short and very simple guide on how to start accepting and
            processing trades on the CryptoSwap platform
          </p>
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex">
              {/* logo */}
              <div className="flex items-center">
                <div className="rounded-full h-12 text-white w-12 bg-blue-500 border-2 border-blue-800 flex items-center justify-center">
                  <FaWallet size={20} />
                </div>
                <div className="h-full w-1 bg-gray-300 ml-6"></div>
              </div>
              {/* logo end */}

              <div className="ml-4">
                <div className="font-semibold dark:text-white">Initiate</div>
                <p className="text-gray-600 dark:text-gray-400 ">
                  Connect your Web3 wallet or Create A Trade
                </p>
                <Link href={"/NewTrade"}>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2">
                    Initiate A Trade
                  </button>
                </Link>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex">
              {/* logo */}
              <div className="flex items-center">
                <div className="rounded-full h-12 text-white w-12 bg-blue-500 border-2 border-blue-800 flex items-center justify-center">
                  <HiMiniWallet size={20} />
                </div>
                <div className="h-full w-1 bg-gray-300 ml-6"></div>
              </div>
              {/* logo end */}
              <div className="ml-4">
                <div className="font-semibold dark:text-white">Load</div>
                <p className="text-gray-600 dark:text-gray-400 ">
                  Deposit your crypto using your Web3 wallet or send it to the
                  wallet address provided.
                </p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2">
                  Fill up a purse
                </button>
              </div>
            </div>
            {/* Step 4 */}
            <div className="flex">
              {/* logo */}
              <div className="flex items-center">
                <div className="rounded-full h-12 text-white w-12 bg-blue-500 border-2 border-blue-800 flex items-center justify-center">
                  <PiCursorClickFill size={20} />
                </div>
                <div className="h-full w-1 bg-gray-300 ml-6"></div>
              </div>
              {/* logo end */}
              <div className="ml-4">
                <div className="font-semibold dark:text-white">
                  Process the first trade
                </div>
                <p className="text-gray-600 dark:text-gray-400 ">
                  Receive and process your first trade.
                </p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2">
                  Go to trading
                </button>
              </div>
            </div>
            {/* <div>
              <div className="text-lg font-semibold dark:text-white text-gray-800">
                Trade and make profit
              </div>
              <p className="text-gray-600 dark:text-gray-400 ">
                Yoohoo! Now you can trade and earn extra income up to 50 USDT
                from each trade.
              </p>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
