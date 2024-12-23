import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section17({setSectionNum, report}:Props) {

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
Develop a dynamic section titled 'Entrepreneurial Ventures' tailored for a user with specific DISC traits [insert DISC traits here]. This segment is designed to illuminate how the user's DISC profile can influence and propel their success in entrepreneurial settings. Focus on the following aspects:
Startup Culture:
- Examine how the user's DISC traits prepare them for the adaptability required in the fast-paced and often unpredictable environment of startups. Discuss their potential for embracing change, innovating, and thriving amidst the challenges unique to startup culture.
- Provide insights into how they can leverage their DISC characteristics to navigate the dynamic nature of startups effectively, including managing stress and seizing opportunities.
Risk Management:
- Analyze the user's approach to risk-taking, including how they deal with uncertainty and the readiness to pivot strategies when necessary. Highlight how their DISC profile influences their decision-making process in high-stakes situations.
- Offer strategies for balanced risk management, suggesting ways to assess opportunities and threats with a mindset that reflects their DISC-driven approach to entrepreneurship.
Networking and Building Relationships:
- Detail how the user can utilize their DISC traits to forge strong partnerships, cultivate customer relationships, and expand their professional network. Emphasize the importance of interpersonal skills in building a robust business foundation.
- Provide practical networking strategies that align with their DISC style, including tips for effective communication, creating lasting impressions, and leveraging social platforms for business growth.
Conclude with motivational guidance encouraging the user to embrace their unique DISC traits as invaluable assets in the entrepreneurial journey. Emphasize the importance of self-awareness, resilience, and relationship-building in achieving long-term success and impact.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "EntrepreneurialVentures":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(17), 1000)
  }
  
  useEffect(()=>{
    if(report["EntrepreneurialVentures"]){
      setData(report["EntrepreneurialVentures"].split('\n'))
      setTimeout(()=>setSectionNum(17), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section17" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Entrepreneurial Ventures</h1>
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