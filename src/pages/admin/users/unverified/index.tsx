import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import UnverifiedUser from "@/components/admin/users/UnverifiedUser";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Unverified users" />

      <div className="flex flex-col gap-10">
        <UnverifiedUser/>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
