import { Inter } from "next/font/google";
import LandingPage from "@/components/DISC/home/LandingPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <LandingPage/>
    </main>
  );
}
