import { getAnalytics } from "@/actions/get-analytics";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import DataCard from "./_components/DataCard";
import Chart from "./_components/Chart";

const page = async () => {
  const { userId } = await auth();

  const { data, totalReveniew, totalSales } = await getAnalytics(userId!);

  return (
    <div className="flex   flex-col justify-between gap-y-10 mt-10 px-8">
      <div className="flex justify-around gap-x-10 xs:flex-col lg:flex-row  xs:gap-y-6 lg:gap-y-0">
      <DataCard value={totalReveniew} label="Total Reveniew" />
      <DataCard value={totalSales} label="Total Sales" />
      </div>
      <Chart data={data}/>
    </div>
  );
};

export default page;
