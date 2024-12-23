import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section12({setSectionNum, report}:Props) {

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
Compose a focused section titled 'Preferred Learning Style.’ This segment aims to shed light on how the user's unique DISC profile influences their approach to acquiring new skills, hobbies, or interests, particularly outside of their professional life. Include considerations on:
Learning Preferences: Based on the user's DISC traits, outline their preferred methods and environments for learning new things. Highlight whether they thrive in group settings, require hands-on experience, or prefer solitary, self-paced study.
Engagement Strategies: Provide strategies that align with the user's DISC profile for staying engaged and motivated while learning. Suggest ways to overcome common hurdles they might face given their learning style.
Skill Application: Discuss how the user can effectively apply newly acquired skills or hobbies in various aspects of their life, considering their DISC traits. Offer examples of how these new interests can enrich their personal development and bring satisfaction.
Conclude with encouraging advice that emphasizes the importance of continuous learning and personal growth, reinforcing that understanding their DISC-based learning style can lead to more enjoyable and fulfilling learning experiences.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "PreferredLearningStyle":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(12), 1000)
  }
  
  useEffect(()=>{
    if(report["PreferredLearningStyle"]){
      setData(report["PreferredLearningStyle"].split('\n'))
      setTimeout(()=>setSectionNum(12), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section12" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Preferred Learning Style</h1>
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