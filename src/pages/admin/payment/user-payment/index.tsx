import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import UserPaymentsTable from "@/components/admin/Payments/UserPaymentsTable";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const UserPayments = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Payments"/>

      <div className="flex flex-col gap-10">
        <UserPaymentsTable />
      </div>
    </DefaultLayout>
  );
};

export default UserPayments;
