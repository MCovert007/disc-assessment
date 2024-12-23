"use client";
import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
import ChartOne from "@/components/admin/Charts/ChartOne";
import ChartTwo from "@/components/admin/Charts/ChartTwo";
import ChartThree from "@/components/admin/Charts/ChartThree";
import React from "react";

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        {/* <ChartOne />
        <ChartTwo />
        <ChartThree /> */}
      </div>
    </>
  );
};

export default Chart;
