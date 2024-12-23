import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section07({setSectionNum, report}:Props) {

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
The perspective of this section will be business and work, though it will also be beneficial at home and in life, in general. Focus on how the person’s distinctive DISC traits shape the theme of this section of the report. Here is the information for this section of the report:
Compose an insightful section titled 'Leading Your Sphere of Influence'. This part of the report should illuminate the user’s unique leadership style, differentiated from other DISC leadership styles, and provide guidance on maximizing their influence. Address these critical aspects:
Unique Leadership Style: Detail the user’s inherent leadership style based on their specific DISC traits. Explain how these traits shape their approach to leadership, including their strengths and potential areas for growth.
Comparison with Other DISC Styles: Contrast the user's leadership style with the other DISC styles' approaches to leadership. Highlight the distinctive qualities that set the user’s style apart, focusing on both advantages and challenges.
Maximizing Influence: Offer strategies for the user to leverage their DISC traits effectively to expand and strengthen their influence within their sphere. Include practical tips for enhancing their leadership based on their unique profile.
Conclude with motivational advice that encourages the user to embrace their individuality as a leader and to use their distinct qualities to inspire and guide others.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "LeadingYourSphereofInfluence":result.data.choices[0].message.content})
    setData(_data)
    setTimeout(()=>setSectionNum(7), 1000)
  }
  
  useEffect(()=>{
    if(report["LeadingYourSphereofInfluence"]){
      setData(report["LeadingYourSphereofInfluence"].split('\n'))
      setTimeout(()=>setSectionNum(7), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section07" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Leading Your Sphere of Influence</h1>
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