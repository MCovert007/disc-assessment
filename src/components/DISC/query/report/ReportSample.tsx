import React, { useEffect, useState } from "react";
import useMyStore from "@/lib/myStore";
import summary from "@/pages/query/summary.json"
import category from "@/pages/query/category.json"
import getProfile from "../GetProfile";
import axios from "axios";
import { signIn, useSession } from "next-auth/react"

export default function ReportSample() {
  const _jsonData : any = summary
  const _categoryData : any = category
  const { data: session } = useSession()
  const user : any = session?.user

  const assessmentState = useMyStore((state)=>state.assessmentState)

  const [result, setResult] = useState(
    user?.discValue?
    user?.discValue
    :
    {
      'D':[0, 0],
      'I':[0, 0],
      'S':[0, 0],
      'C':[0, 0]
    }
  )
  const [sampleData, setSampleData] = useState({
    d:_categoryData["D"]["1"],
    i:_categoryData["I"]["1"],
    s:_categoryData["S"]["1"],
    c:_categoryData["C"]["1"],
  })
  const [profile, setProfile] = useState(user?.discProfile?user?.discProfile:"")

  const assessment : any = useMyStore((state)=>state.assessment)
  const countOfQuery = useMyStore((state)=>state.countOfQuery)

  const saveResult = async (data:any) =>{
    const response = await axios.post(`/api/db/test-result`, data)
    if(response.data.error){
      alert(response.data.error)
      return
    }
    const user : any = session?.user
    await signIn('credentials', { callbackUrl:  window.location.href, redirect: false, email:user.email, password:user.password });
  }

  useEffect(()=>{
    if(assessmentState==="Complete"){
      if(assessment.length === countOfQuery){
        const result = {
          'D':[0, 0],
          'I':[0, 0],
          'S':[0, 0],
          'C':[0, 0]
        }
        let D = 0, I = 0, S = 0, C = 0;
        const _temp = [...assessment];
        while(_temp.length>0){
          const stepResult : string[] = _temp.pop()
          D += (4 - stepResult.indexOf('D'))
          I += (4 - stepResult.indexOf('I'))
          S += (4 - stepResult.indexOf('S'))
          C += (4 - stepResult.indexOf('C'))
        }
        for (let i=0;i<countOfQuery;i++){
          const stepResult : string[] = assessment[i]
          const no = i < (countOfQuery/2) ? 0 : 1
          result.D[no] += (4 - stepResult.indexOf('D'))
          result.I[no] += (4 - stepResult.indexOf('I'))
          result.S[no] += (4 - stepResult.indexOf('S'))
          result.C[no] += (4 - stepResult.indexOf('C'))
        }
        const _profile = getProfile([result.D[0]+result.D[1], result.I[0]+result.I[1], result.S[0]+result.S[1], result.C[0]+result.C[1]])
        saveResult({
          userID:session?.user?.email,
          result:result,
          profile:_profile,
          updated:formatDate(new Date()),
        })
        setProfile(_profile)
        setResult(result)
      }
    }
  },[assessment, assessmentState])
  
  useEffect(()=>{
    const d = Math.floor((result.D[0]+result.D[1])/4)
    const i = Math.floor((result.D[0]+result.D[1])/4)
    const s = Math.floor((result.D[0]+result.D[1])/4)
    const c = Math.floor((result.D[0]+result.D[1])/4)
    const _temp = {
      d:_categoryData["D"][d===0?"1":d],
      i:_categoryData["I"][i===0?"1":i],
      s:_categoryData["S"][s===0?"1":s],
      c:_categoryData["C"][c===0?"1":c],
    }
    setSampleData(_temp)
  },[result, _categoryData])

  return (
    <React.Fragment>
      <div className="p-4">
        <div className="mb-4">
          Your profile is &quot;{profile}&quot;.<br/>
          {`Natural Score : [ ${result.D[0]}, ${result.I[0]}, ${result.S[0]}, ${result.C[0]} ]`},&nbsp;&nbsp;&nbsp;
          {`Adapted Score : [ ${result.D[1]}, ${result.I[1]}, ${result.S[1]}, ${result.C[1]} ]`}
        </div>
        <div>
          <div className="">
            {_jsonData[profile]?_jsonData[profile]["Summary"]:""}
          </div>
          <div className="">
            • Potential Concerns : 
            <p className="ml-3">{_jsonData[profile]?_jsonData[profile]["Potential_Concerns"]:""}</p>                
          </div>
          <div className="">
            • Optimization Strategies : 
            <p className="ml-3">{_jsonData[profile]?_jsonData[profile]["Optimization_Strategies"]:""}</p>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex items-center">
          <div className="report-graphic relative">
            <div className="h-2"/>
            <div className="graph">
              <div className="absolute top-[calc(50%-2px)] left-0 w-full border-b-4 border-[rgb(99,102,241)]" />
              <div className="cylinder">
                <div className="cylinder cy1"
                  style={{
                    height:`${Math.floor((result.D[0]+result.D[1])/240*200)}%`,
                    bottom:"2px",
                    fontSize:"16px"
                  }}
                >
                  {Math.floor((result.D[0]+result.D[1])/240*1000)/10}<br/>%
                </div>
              </div>
              <div className="cylinder">
                <div className="cylinder cy2"
                  style={{
                    height:`${Math.floor((result.I[0]+result.I[1])/240*200)}%`,
                    bottom:"2px",
                    fontSize:"16px"
                  }}
                >
                  {Math.floor((result.I[0]+result.I[1])/240*1000)/10}<br/>%
                </div>
              </div>
              <div className="cylinder">
                <div className="cylinder cy3"
                  style={{
                    height:`${Math.floor((result.S[0]+result.S[1])/240*200)}%`,
                    bottom:"2px",
                    fontSize:"16px"
                  }}
                >
                  {Math.floor((result.S[0]+result.S[1])/240*1000)/10}<br/>%
                </div>
              </div>
              <div className="cylinder">
                <div className="cylinder cy4"
                  style={{
                    height:`${Math.floor((result.C[0]+result.C[1])/240*200)}%`,
                    bottom:"2px",
                    fontSize:"16px"
                  }}
                >
                  {Math.floor((result.C[0]+result.C[1])/240*1000)/10}<br/>%
                </div>
              </div>
            </div>
            <div className="flex justify-around w-[202px] mx-auto">
              <p>D</p><p>I</p><p>S</p><p>C</p>
            </div>
          </div>

          <div className="w-full mx-4 text-[16px]">
            <div className="border-2 border-red">
              <h1 className="text-center text-[20px] underline hidden">{sampleData.d.Title}</h1>
              <ul className="ml-8">
                {
                  sampleData.d.style.map((item:string, index:number)=>
                    <li key={index}>{item}</li>
                  )
                }
              </ul>
            </div>
            <div className="border-2 border-yellow-400 mt-4">
              <h1 className="text-center text-[20px] underline hidden">{sampleData.i.Title}</h1>
              <ul className="ml-8">
                {
                  sampleData.i.style.map((item:string, index:number)=>
                    <li key={index}>{item}</li>
                  )
                }
              </ul>
            </div>
            <div className="border-2 border-green-500 mt-4">
              <h1 className="text-center text-[20px] underline hidden">{sampleData.s.Title}</h1>
              <ul className="ml-8">
                {
                  sampleData.s.style.map((item:string, index:number)=>
                    <li key={index}>{item}</li>
                  )
                }
              </ul>
            </div>
            <div className="border-2 border-blue-500 mt-4">
              <h1 className="text-center text-[20px] underline hidden">{sampleData.c.Title}</h1>
              <ul className="ml-8">
                {
                  sampleData.c.style.map((item:string, index:number)=>
                    <li key={index}>{item}</li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 text-[16px]">
        To understand the basics of your profile, read the description for the color or colors above the blue energy line. 
        The higher above the line, the more intense that behavior becomes. 
        As things dip below the line, they begin to take on an opposite trait as what would be seen above the line. 
        The deeper below the line the color goes, the more opposite this trait becomes. 
        To learn more, see our detailed report...
      </div>
    </React.Fragment>
  );
}

function formatDate(date: Date) {
  // Add leading zeros if necessary
  function pad(number: number) {
      if (number < 10) {
          return '0' + number;
      }
      return number;
  }

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Month is zero-indexed
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}