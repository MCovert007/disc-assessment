import { useSession } from "next-auth/react";
import React from "react";

export default function CoverSection() {

  const { data: session } = useSession()

    return (
      <div id="sectionCover" className="max-h-[1330px] min-h-[1330px] border-b">
        <div className="relative w-full pt-[120px]">
          <h1 className="disc-title" style={{color:"black", fontSize:"52px", lineHeight:"60px", paddingBottom:"40px"}}>
            The GAP Crossers<br/>
            <span className="text-[#ff0000]">D</span><span className="text-[#ffff00]">I</span><span className="text-[#00ff00]">S</span><span className="text-[#0000ff]">C</span> Assessment
            <p className="text-[20px] text-[#22cc22] mt-2 text-bold" style={{textShadow:"none"}}>
              The Ultimate Tool for Predicting Behavior
            </p>
          </h1>
        </div>
        
        <div className="relative w-[260px] h-[260px] bg-white rounded-full mx-auto">
          <img src="/images/disc-home/DISC-model.png" className="w-full h-full rounded-[200px]"/>
        </div>

        <div className="text-black mt-[120px]" style={{fontFamily:"Roboto"}}>
          <p className="text-[38px] text-center font-bold">{session?.user?.name}</p>
          <p className="text-[16px] text-center mt-8">Report Category</p>
          <p className="text-[32px] text-center font-medium mt-4">Personal Behavioral Style</p>
          {/* <p className="text-[24px] text-center mt-4">Work-Business Owner</p> */}
        </div>

        <div className="w-[720px] mx-auto mt-12">
          <img src="/images/disc-home/logo.png" className="w-full h-full"/>
        </div>
        
      </div>
    );
  }