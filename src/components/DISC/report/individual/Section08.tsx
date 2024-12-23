import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section08({setSectionNum, report}:Props) {

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
The perspective of this section will be business and work, though it will also be beneficial at home and in life, in general. Focus on how person’s distinctive DISC traits shape the theme of this section of the report. Here is the information for this section of the report:
Draft a comprehensive section titled 'Preferred Style of Communication.' This section aims to provide a deep understanding of the user's natural communication preferences and how they can navigate interactions more effectively. Address the following elements:
Preferred Communication Style and Strategies: Elaborate on the user's natural style of communication, emphasizing how their DISC traits influence their verbal and non-verbal communication. Offer strategies that align with their preferences to enhance clarity, engagement, and effectiveness in interactions.
Key Considerations in Communication: Identify crucial factors the user should consider to make their communication more impactful. This might include the importance of audience awareness, context sensitivity, and the adjustment of their style to different settings or recipients.
Communication Tips for Others: Provide advice for colleagues, friends, and family on how best to communicate with the user, considering their DISC profile. Suggest ways others can adjust their approach to facilitate smoother interactions and mutual understanding.
DISC Preferences Regarding Conflict: Discuss how the user's DISC traits likely influence their approach to conflict, including their initial reactions and how they prefer to address disagreements or tensions.
Specifically address the three types of conflict:
A Me/Me conflict: How my behavioral traits may cause tension with one another  
A Me/Them conflict: How my behavioral traits may conflict with others  
A Me/Job conflict: How my behavioral traits may stress me in certain work environments, especially regarding my preferred ratio of people to task or preference between slow or fast paced environments. Please explain the implications of each type of conflict along with recommended remedies.
Strategies for Effective Resolution: Offer tailored strategies for conflict resolution that leverage the strengths of the user's DISC style. Include tips for navigating conflicts constructively, ensuring resolutions that respect all parties' needs and perspectives.
Conclude with actionable advice to help the user apply their communication strengths in various contexts, improving their interpersonal relationships and achieving more harmonious and productive outcomes.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "PreferredStyleofCommunication":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(8), 1000)
  }
  
  useEffect(()=>{
    if(report["PreferredStyleofCommunication"]){
      setData(report["PreferredStyleofCommunication"].split('\n'))
      setTimeout(()=>setSectionNum(8), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section08" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Preferred Style of Communication</h1>
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