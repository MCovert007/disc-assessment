import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section10({setSectionNum, report}:Props) {

  const [data, setData] = useState([])

  const { data: session }:any = useSession()
  const userInfo = {
    firstName:session?.user?.name?.split(" ")[0]
  }
  const userDISC = session?.user?.discValue
  
  const getResultSection = async () =>{
    const messages = [{
      role:'user',
      content:
      `First Name : ${userInfo.firstName},
DISC value : [D (${userDISC.D[0]+userDISC.D[1]}), I (${userDISC.I[0]+userDISC.I[1]}), S (${userDISC.S[0]+userDISC.S[1]}) and C (${userDISC.C[0]+userDISC.C[1]})]
Energy line is 60
Craft a 500 word personalized section of a report for me. 
The perspective of this section will be business and work, though it will also be beneficial at home and in life, in general. Focus on how the perons’s distinctive DISC traits shape the theme of this section of the report. Here is the information for this section of the report:"
Compose a detailed, personalized section titled 'Interacting with Other DISC Styles' for me, whose DISC profile shows strong Dominance and Influence traits. Focus on how he can recognize and adapt to the diverse DISC styles of those around him to enhance both his professional leadership and personal relationships. Include practical tips for identifying DISC styles in daily interactions, strategies for adjusting communication to connect more effectively with each style, and advice for navigating potential misunderstandings. Highlight the importance of these skills in leveraging my natural strengths to build more meaningful connections and a broader sphere of influence.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "InteractingwithOtherDISCStyles":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(10), 1000)
  }
  
  useEffect(()=>{
    if(report["InteractingwithOtherDISCStyles"]){
      setData(report["InteractingwithOtherDISCStyles"].split('\n'))
      setTimeout(()=>setSectionNum(10), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section10" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Interacting with Other DISC Styles</h1>
      {
        data.length === 0 ?
        <LoadingContent/>
        :
        <div>
          <ContentRenderer lines={data} />
        </div>
      }
    </div>
  );
}