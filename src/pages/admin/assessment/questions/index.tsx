import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import TestQuestionsTable from "@/components/admin/AssessmentManage/TestQuestionsTable";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Questions"/>
      <div className="flex flex-col gap-10">
        <TestQuestionsTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
