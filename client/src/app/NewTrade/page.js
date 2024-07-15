import { Suspense } from 'react';
import DashboardNavbar from "../components/DashboardNavbar";
import InputField from "../components/InputField";

export default function OngoingTrades() {
  return (
    <Suspense>
    <div className="bg-white dark:bg-gray-900  min-h-screen">
      <DashboardNavbar />
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          <InputField />
        </h1>
      </div>
    </div>
    </Suspense>
  );
}
