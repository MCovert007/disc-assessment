import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { signIn, useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section22({setSectionNum, report}:Props) {

  const [data, setData] = useState([])

  const { data: session }:any = useSession()
  const user = session?.user
  const userInfo = {
    firstName:user?.name?.split(" ")[0]
  }
  const userDISC = user?.discValue
  
  const getResultSection = async () =>{
    const messages = [{
      role:'user',
      content:
      `First Name : ${userInfo.firstName},
DISC value : [D (${userDISC.D[0]+userDISC.D[1]}), I (${userDISC.I[0]+userDISC.I[1]}), S (${userDISC.S[0]+userDISC.S[1]}) and C (${userDISC.C[0]+userDISC.C[1]})],
Natural Style : [D (${userDISC.D[0]}), I (${userDISC.I[0]}), S (${userDISC.S[0]}) and C (${userDISC.C[0]})],
Adapted Style : [D (${userDISC.D[1]}), I (${userDISC.I[1]}), S (${userDISC.S[1]}) and C (${userDISC.C[1]})]
Energy line is 60
Craft a 500 word personalized section of report for me. 
The perspective of this section will be business and work, though it will also be beneficial at home and in life, in general. Focus on how the person’s distinctive DISC traits shape the theme of this section of the report. Here is the information for this section of the report:"

Conclude the comprehensive report for [insert name], whose DISC profile has been meticulously analyzed, with a section titled 'Conclusion'. This final segment should encapsulate the essence of the insights gleaned throughout the report, providing a concise yet powerful recapitulation of the key findings. It aims to underscore [insert name]'s distinctive strengths and chart a clear, personalized pathway for ongoing growth and development. Address the following:
Recap of Key Insights:
- Briefly revisit the most impactful insights from the report, emphasizing how [insert name]'s unique DISC traits manifest in their personal and professional life. Highlight the positive attributes and the value they bring to various interactions and endeavors.
Summary of DISC Analysis:
- Summarize the core findings from [insert name]'s DISC analysis. Reinforce their unique strengths and how these can be effectively harnessed for achieving greater success and fulfillment in various spheres of life.
Path for Growth and Development:
- Outline a personalized growth and development plan based on the DISC analysis. Detail strategies [insert name] can employ to build on their strengths, along with practical steps for addressing areas of improvement. Ensure this plan is actionable, focusing on achieving clarity and confidence in navigating their development journey.
Rich, Personalized Guidance:
- Provide a synthesis of the in-depth analysis, anecdotes, case studies, and a broad spectrum of development strategies and resources offered throughout the report. Emphasize how this curated content forms a robust foundation for [insert name] to understand and leverage their behavioral tendencies fully.
Conclude by affirming [insert name]'s potential for personal and professional growth. Encourage them to view this report not just as an assessment but as a valuable guide and companion in their journey toward realizing their fullest potential. Highlight that with the insights and strategies outlined, [insert name] is well-equipped to navigate their path with greater self-awareness, effectiveness, and fulfillment.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    await axios.put(`/api/db/report`, {email:user?.email, "Conclusion":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(22), 1000)
    const response = await axios.put(`/api/db/payments?paymentOrderId=${user?.buyResult?.detailReport?.paymentOrderId}`, {buyResult:true})
    await signIn('credentials', { callbackUrl:  "/report", redirect: false, email:user?.email, password:user?.password });
  }
  
  useEffect(()=>{
    if(report["Conclusion"]){
      setData(report["Conclusion"].split('\n'))
      setTimeout(()=>setSectionNum(22), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section22" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Conclusion - Navigating the Path Forward</h1>
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