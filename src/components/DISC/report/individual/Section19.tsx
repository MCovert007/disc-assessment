import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section19({setSectionNum, report}:Props) {

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
DISC value : [D (${userDISC.D[0]+userDISC.D[1]}), I (${userDISC.I[0]+userDISC.I[1]}), S (${userDISC.S[0]+userDISC.S[1]}) and C (${userDISC.C[0]+userDISC.C[1]})],
Natural Style : [D (${userDISC.D[0]}), I (${userDISC.I[0]}), S (${userDISC.S[0]}) and C (${userDISC.C[0]})],
Adapted Style : [D (${userDISC.D[1]}), I (${userDISC.I[1]}), S (${userDISC.S[1]}) and C (${userDISC.C[1]})]
Energy line is 60
Craft a 500 word personalized section of report for me. 
The perspective of this section will be business and work, though it will also be beneficial at home and in life, in general. Focus on how person’s distinctive DISC traits shape the theme of this section of the report. Here is the information for this section of the report:"
Write an in-depth section titled 'Balancing Natural and Adapted Styles' for a user with defined DISC traits [insert DISC traits here]. This segment should elucidate the distinctions between the user's natural and adaptive DISC styles, diving into the concept of adaptation in behavior—why it occurs, its potential benefits, and pitfalls. Address the following components:
Natural vs. Adapted Styles:
- Clearly define what constitutes the user's natural DISC style, including their instinctive reactions, preferences, and behaviors in comfortable or stress-free environments.
- Contrast this with their adapted DISC style, noting how and in what situations they modify their behavior in response to external expectations, pressures, or demands.
Understanding Adaptation:
- Explore the concept of adaptation in the context of DISC, explaining why individuals adjust their natural behavior. Include both positive reasons (such as enhancing communication, fitting into different social or professional settings) and negative ones (such as coping with stress or concealing true feelings).
- Discuss the psychological and emotional impacts of long-term adaptation, highlighting the importance of awareness and self-regulation.
The Goal of Adaptation in Communication:
- Delve into the strategic goals behind adapting one’s DISC style for improved communication. Emphasize how conscious adaptation can lead to more effective interactions, better relationships, and increased success in both personal and professional arenas.
- Provide guidance on achieving a healthy balance between natural and adapted styles, ensuring that adaptation serves as a tool for enhancement rather than a source of stress or inauthenticity.
Conclude with actionable advice on how the user can mindfully manage their adaptation process. Stress the significance of staying true to oneself while skillfully navigating different social contexts and relationships. Encourage the user to view adaptation not as compromising their identity but as expanding their communicative competence and emotional intelligence.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "BalancingNaturalandAdaptedStyles":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(19), 1000)
  }
  
  useEffect(()=>{
    if(report["BalancingNaturalandAdaptedStyles"]){
      setData(report["BalancingNaturalandAdaptedStyles"].split('\n'))
      setTimeout(()=>setSectionNum(19), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section19" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Balancing Natural and Adapted Styles</h1>
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