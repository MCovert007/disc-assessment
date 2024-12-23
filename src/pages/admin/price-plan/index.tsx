import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import PlanTable from "@/components/admin/Plan/PlanTable";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Price = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Price Plan"/>

      <div className="flex flex-col gap-10">
        <PlanTable />
      </div>
    </DefaultLayout>
  );
};

export default Price;
