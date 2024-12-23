import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section06({setSectionNum, report}:Props) {

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
Write a detailed section titled 'Perceptions'. This section should offer deep insights into the user’s self-view and how others may perceive them in varying stress levels. Cover the following points:
Self-View: Discuss how the user, given their DISC traits, is likely to see themselves in both personal and professional contexts. Highlight the strengths they recognize in themselves and how these traits influence their confidence and self-esteem.
Moderate Stress Perceptions: Explain how others are likely to perceive the user when they're under moderate stress. Include how changes in their behavior might affect their relationships and interactions at work or in social settings.
Severe Stress Reactions: Delve into how others might see the user during times of severe stress. Describe the possible shifts in behavior or attitude that could significantly alter others' perceptions of them.
Conclude by offering strategies for the user to manage others' perceptions under stress, ensuring that their strengths are highlighted even in challenging times.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "Perceptions":result.data.choices[0].message.content})
    setData(_data)
    setTimeout(()=>setSectionNum(6), 1000)
  }
  
  useEffect(()=>{
    if(report["Perceptions"]){
      setData(report["Perceptions"].split('\n'))
      setTimeout(()=>setSectionNum(6), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section06" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Perceptions</h1>
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