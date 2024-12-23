import React, { useEffect, useState } from "react";
import CoverSection from "./CoverSection";
import Section01 from "./Section01";
import useMyStore from "@/lib/myStore";
import { useRouter } from "next/router";
import Section02 from "./Section02";
import Section03 from "./Section03";
import Section04 from "./Section04";
import Section05 from "./Section05";
import Section06 from "./Section06";
import Section07 from "./Section07";
import Section08 from "./Section08";
import Section09 from "./Section09";
import Section10 from "./Section10";
import Section11 from "./Section11";
import Section12 from "./Section12";
import Section13 from "./Section13";
import Section14 from "./Section14";
import Section15 from "./Section15";
import Section16 from "./Section16";
import Section17 from "./Section17";
import Section18 from "./Section18";
import Section19 from "./Section19";
import Section21 from "./Section21";
import Section22 from "./Section22";
import ReportMenu from "./ReportMenu";

import { useSession } from "next-auth/react"
import axios from "axios";

// Content Width: 210mm - 50.8mm = 159.2mm
// Content Height: 297mm - 50.8mm = 246.2mm
// DPI(72, 96, 150, 300, etc.)
// DPI : 150, A4, (940, 1454)

export default function DISCReport() {

  const { data: session } = useSession()
  const user : any = session?.user
  const router = useRouter()
  const userProfile : string = user?.discProfile

  const [SectionNum, setSectionNum] = useState(1)
  const [flag, setFlag] = useState(false)

  const [report, setReport] = useState({})

  const getReport = async () =>{
    const payResult = await axios.post('/api/db/payments?action=search', {email:user?.email, productName:"Detailed Report"})    
    if(payResult.data.length>0){
      const response = await axios.post('/api/db/report', {email:user?.email})
      if(response.data?.error || response.data===null){
        setReport({})
        setFlag(true)
        return
      }
      setReport(response.data)
      setFlag(true)
    }else{
      router.push("/report")
    }
  }

  useEffect(()=>{
    if(user && !flag){
      if(userProfile==="" || userProfile===undefined || userProfile===null){
        router.push("/query")
        return
      }
      getReport()
    }
  },[user, flag])

  return (
    <React.Fragment>
      <div className="max-w-[940px] min-w-[940px] mx-auto bg-white overflow-x-hidden text-[20px] text-black" style={{fontFamily:"Roboto"}}>
        <ReportMenu section={SectionNum}/>
        <CoverSection/>
        <Section01/>
        {
          !flag?
          <>
          </>
          :
          <>
            {
              !(userProfile==="" || userProfile===undefined || userProfile===null) && <Section02 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 2 && <Section03 setSectionNum = {setSectionNum}/>
            }
            {
              SectionNum >= 3 && <Section04 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 4 && <Section05 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 5 && <Section06 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 6 && <Section07 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 7 && <Section08 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 8 && <Section09 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 9 && <Section10 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 10 && <Section11 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 11 && <Section12 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 12 && <Section13 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 13 && <Section14 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 14 && <Section15 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 15 && <Section16 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 16 && <Section17 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 17 && <Section18 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 18 && <Section19 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 19 && <Section21 setSectionNum = {setSectionNum} report={report}/>
            }
            {
              SectionNum >= 21 && <Section22 setSectionNum = {setSectionNum} report={report}/>
            }
          </>
        }
      </div>
    </React.Fragment>
  );
}