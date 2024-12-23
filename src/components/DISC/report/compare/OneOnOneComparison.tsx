import React, { useEffect, useState } from "react";
// import CoverSection from "./CoverSection";
import { useRouter } from "next/router";

import { useSession } from "next-auth/react"
import axios from "axios";
import InputForm from "./InputForm";
import LoadingContent from "../../LoadingContent";
import ContentRenderer from "../../ContentRenderer";
import ReportMenu from "./ReportMenu";

// Content Width: 210mm - 50.8mm = 159.2mm
// Content Height: 297mm - 50.8mm = 246.2mm
// DPI(72, 96, 150, 300, etc.)
// DPI : 150, A4, (940, 1454)

export default function OneOnOneComparison() {

  const { data: session } = useSession()
  const user : any = session?.user
  const router = useRouter()
  const userProfile : string = user?.discProfile

  const [inputFlag, setInputFlag] = useState(false)
  const [reportData, setReportData] = useState([])

  const getReport = async () =>{
    const payResult = await axios.post('/api/db/payments?action=search', {email:user?.email, productName:"One-on-One Comparison"})    
    if(payResult.data.length>0 || user.role==="Admin" || user.role === "Tester"){
      const response = await axios.post('/api/db/reportCompare', {email:user?.email})
      if(response.data?.error || response.data === null){
        setReportData([])
        setInputFlag(true)
        return
      }
      setReportData(response.data.compareReport.split('\n'))
      setInputFlag(false)
    }else{
      setReportData([])
      setInputFlag(true)
    }
  }

  useEffect(()=>{
    if(user){
      if(userProfile==="" || userProfile===undefined || userProfile===null){
        router.push("/query")
        return
      }
      getReport()
    }
  },[user])

  const completeinputForm = async (value:any) =>{    
    setInputFlag(false)
    
    const messages = [{
      role:'user',
      content:
      `My name is ${value?.myName}. My DISC profile is ${value?.myDISCProfile} and I am in a ${value?.relationship} with ${value?.partnerName} who is a ${value?.partnerDISCProfile}. Please list the potential strengths and challenges of this relationship. Consider the following dynamics: potential conflicts, and synergies.
      Develop an interaction model that describes how these different DISC types are likely to relate to each other. This could include models for communication styles, conflict resolution, decision-making, and stress responses.
      `
    }]

    const result = await axios.post('/api/chat', messages)
    if(result.data?.error){
      alert(result.data?.error)
      return
    }
    const _data = result.data.choices[0].message.content.split('\n')
    await axios.put(`/api/db/reportCompare`, {email:user?.email, "compareReport":result.data.choices[0].message.content})
    setReportData(_data)
  }

  return (
    <React.Fragment>
      <div className="max-w-[940px] min-w-[940px] mx-auto bg-white overflow-x-hidden text-[20px] text-black" style={{fontFamily:"Roboto"}}>
        <ReportMenu/>
        <InputForm myName={user?.name?.split(" ")[0]} myDISCProfile={userProfile} flag={inputFlag} completeinputForm={completeinputForm}/>
        
        <div className="border-b p-16">
          <h1 className="text-[40px] mb-8">One-on-One Comparison</h1>
          {
            reportData.length === 0 ?
            <LoadingContent/>
            :
            <div>
              <ContentRenderer lines={reportData} />
            </div>
          }
        </div>
        
      </div>
    </React.Fragment>
  );
}