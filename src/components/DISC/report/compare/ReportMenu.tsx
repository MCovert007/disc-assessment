import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ReportMenu() {

  const [flag, setFlag] = useState(false)

  const listClass = "cursor-pointer w-[160px] text-[16px] mx-auto truncate hover:underline"

  return (
    <React.Fragment>
      <div className="fixed top-4 left-4 toggle z-10 cursor-pointer" onClick={()=>setFlag(!flag)}>
        <div className="p-1 rounded-sm bg-white">
          {flag?<FaArrowLeft />:<FaArrowRight />}
        </div>
      </div>

      <div className="fixed top-0 left-0" style={{left:flag?"0px":"-200px", transition:"left 0.5s"}}>
        <div className="relative w-[200px] min-h-[100vh] bg-white rounded-md shadow-md py-4 text-[#1e40af]">          
          <div className={listClass+ " mb-4 mt-12"}>
            <Link href="/">Home</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
  }