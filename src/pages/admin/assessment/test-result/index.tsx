import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
import AssessmentResultTable from "@/components/admin/AssessmentManage/AssessmentResultTable";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const AssessmentResult = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Assessment Results"/>
      <div className="flex flex-col gap-10">
        <AssessmentResultTable/>
      </div>
    </DefaultLayout>
  );
};

export default AssessmentResult;
