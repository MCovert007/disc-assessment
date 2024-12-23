import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section15({setSectionNum, report}:Props) {

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
The perspective of this section will be business and work, though it will also be beneficial at home and in life, in general. Focus on how person’s distinctive DISC traits shape the theme of this section of the report. Here is the information for this section of the report:"
Compose an insightful section titled 'Career Possibilities.’  This part of the report is intended to broaden the user's perspective on potential career paths that align with their unique personality profile. Address the following key points:
Identifying Suitable Career Paths:
- Based on the user's DISC profile, outline a variety of career fields that may naturally suit their strengths, preferences, and working style. Consider how their dominant DISC traits could contribute to success in different professional environments.
Exploration and Research:
- Encourage the user to conduct in-depth research into the suggested career paths. Provide guidance on what aspects to explore, such as day-to-day responsibilities, required skills and qualifications, and long-term career prospects.
Personal Reflection and Assessment:
- Advise the user on reflecting upon their interests, skills, and values in relation to the suggested careers. Highlight the importance of considering personal fulfillment and alignment with their career choices.
Action Steps and Help Points:
- Offer actionable steps for the user to further investigate and potentially pivot towards one of the recommended careers. This might include networking strategies, educational or training opportunities, and ways to gain relevant experience.
- Suggest resources and help points, such as professional associations, career counseling services, and online platforms, where the user can seek additional guidance and support.
Conclude with motivating advice to approach career exploration with an open mind and a proactive attitude, emphasizing that their DISC profile is a valuable tool for navigating the journey to a fulfilling and successful career.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "CareerPossibilities":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(15), 1000)
  }
  
  useEffect(()=>{
    if(report["CareerPossibilities"]){
      setData(report["CareerPossibilities"].split('\n'))
      setTimeout(()=>setSectionNum(15), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section15" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Career Possibilities</h1>
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