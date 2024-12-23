import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import VerifiedUser from "@/components/admin/users/VerifiedUser";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Verified Users" />

      <div className="flex flex-col gap-10">
        <VerifiedUser/>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
