import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section18({setSectionNum, report}:Props) {

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
Craft a 500 word personalized section of report for me. 
The perspective of this section will be business and work, though it will also be beneficial at home and in life, in general. Focus on how the person’s distinctive DISC traits shape the theme of this section of the report. Here is the information for this section of the report:"
Construct a comprehensive section titled 'Stress Management' for a user with distinct DISC traits [insert DISC traits here]. This portion of the report is dedicated to identifying potential stressors unique to the user's DISC profile and offering tailored strategies to effectively manage and mitigate stress. Cover the following areas:
Identifying Potential Stressors:
- Analyze and highlight specific situations, environments, or challenges that may serve as sources of stress for the individual, considering their unique DISC characteristics. Discuss how their primary DISC traits could influence their perception of and reaction to stress.
Stress Management Strategies:
- Provide a suite of personalized stress reduction techniques and coping mechanisms that align with the user's DISC profile. Suggest practical approaches for preemptively managing stressors and maintaining emotional balance.
- Include strategies for both immediate stress relief (e.g., breathing exercises, mindfulness) and long-term stress management (e.g., lifestyle adjustments, setting boundaries, time management).
Leveraging Strengths for Resilience:
- Discuss how the user can leverage their DISC-driven strengths to build resilience against stress. Offer advice on turning potential DISC-related vulnerabilities into sources of strength and empowerment.
Conclude with encouraging the user to adopt a proactive stance towards stress management, emphasizing the role of self-awareness in recognizing stress triggers and implementing effective coping strategies. Highlight that managing stress is a dynamic process that can lead to personal growth and improved well-being.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "StressManagement":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(18), 1000)
  }
  
  useEffect(()=>{
    if(report["StressManagement"]){
      setData(report["StressManagement"].split('\n'))
      setTimeout(()=>setSectionNum(18), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section18" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Stress Management</h1>
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