import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section14({setSectionNum, report}:Props) {

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
Craft a comprehensive section titled 'Online and Digital Spaces.’ This part of the report aims to illuminate how the user's DISC profile shapes their engagement and behavior within various digital environments. Focus on the following dimensions:
Virtual Teamwork:
Analyze the user's engagement and communication styles in the context of remote work or virtual project collaborations. Reflect on how their DISC traits influence their interaction with team members, participation in virtual meetings, and overall contribution to group objectives.
Offer tips for optimizing virtual teamwork effectiveness, including enhancing communication clarity, maintaining engagement, and fostering a positive team dynamic online.
Social Media Behavior:
Describe the user's typical interaction patterns on social media platforms, considering their DISC profile. Discuss their approach to content sharing, networking, and community participation, including how they engage with others and present themselves online.
Provide insights on leveraging social media more effectively for personal branding, networking, or community building, tailored to their DISC characteristics.
Digital Learning:
Examine how the user adapts to digital learning opportunities such as online courses, webinars, and self-directed learning platforms. Highlight how their DISC traits may impact their learning preferences, engagement levels, and persistence in online education environments.
Suggest strategies for enhancing the digital learning experience, including setting achievable goals, creating a structured learning schedule, and utilizing interactive learning resources to maintain motivation and interest.
Conclude with encouraging advice that emphasizes the strengths of the user's DISC profile in navigating online and digital spaces successfully. Encourage them to utilize these insights for personal growth, professional development, and meaningful online interactions.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "OnlineandDigitalSpaces":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(14), 1000)
  }
  
  useEffect(()=>{
    if(report["OnlineandDigitalSpaces"]){
      setData(report["OnlineandDigitalSpaces"].split('\n'))
      setTimeout(()=>setSectionNum(14), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section14" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Online and Digital Spaces</h1>
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