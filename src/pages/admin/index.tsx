import { Inter } from "next/font/google";
import ECommerce from "@/components/admin/Dashboard/E-commerce";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Admin() {
  return (    
    <DefaultLayout>
        <ECommerce/>
    </DefaultLayout>    
  );
}
