import React, { useState } from "react";
import useMyStore from "@/lib/myStore";
import ReportSample from "./report/ReportSample";
import GeneralIntro from "./report/GeneralIntro";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Complete() {

  const assessment : any = useMyStore((state)=>state.assessment)
  const { data: session } : any = useSession();
  const user = session?.user

  const router = useRouter()

  const payCheck = async () =>{
    // if(user.role === "Tester" || user.role === "Admin"){
    //   router.push("/report")
    //   return
    // }

    // if(user.buyResult?.detailReport?.buyResult){
    //   router.push("/report")
    //   return
    // }
    // const response = await axios.get(`/api/db/price-plan`)
    // let unit = 0
    // if(!response.data.error){
    //   response.data.map((item:any)=>{
    //     if(item["type"] === "Detailed Report")
    //       unit = Number(item.price)
    //   })
    // }
    // useMyStore.setState({payment:{
    //   unit:unit,
    //   show:true,
    //   to:"detailReport"
    // }})
    router.push("/report")
  }
  
  return (
    <React.Fragment>
      <div className="relative w-full pb-2 flex justify-center items-center text-[18px]">
        <div className="w-full">
          <p className="text-center text-[30px] mb-6 font-medium" style={{fontFamily:'Exo'}}>Simple Report</p>
          <GeneralIntro/>

          <div className="mt-6">
            <h1 className="text-center text-[24px] mb-4" style={{fontFamily:'Exo'}}>Your DISC Assessment Result</h1>            
            <ReportSample/>

            <div className="flex justify-center">
              <div className="cursor-pointer underline" onClick={()=>payCheck()}>Pay and receive a detailed report</div>
            </div>
          </div>

          <div className="flex mt-8 px-40">
            <div className="btn normal-btn" onClick={()=>useMyStore.setState({assessmentState:"Update"})} style={{maxWidth:"20px !important", display:assessment.length>0?"block":"none"}}>
              Update assessment
            </div>

            <div className="btn normal-btn" onClick={()=>useMyStore.setState({assessmentState:"Ready", assessment:[]})} style={{maxWidth:"20px !important"}}>
              New assessment
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}