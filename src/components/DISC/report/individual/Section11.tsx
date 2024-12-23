import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section11({setSectionNum, report}:Props) {

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
Write an enriching section titled 'Enhancing Personal Relationships.’ This section should emphasize the significance of continually nurturing relationships and provide a roadmap for using DISC insights to deepen relational bonds. Cover the following aspects:
Importance of Relational Connectivity: Explain why it is crucial to consistently work on improving connectivity in relationships, emphasizing the benefits of strengthened emotional bonds and enhanced understanding among family, friends, and romantic partners.
Practical Advice Using DISC Insights: Offer actionable suggestions on how the user can apply their understanding of their own DISC profile to foster stronger relationships. Include tips on communication, empathy, and shared activities that align with their DISC style.
Leveraging Strengths in Relationships: Highlight how the user can use their DISC profile strengths to support and enrich their interactions in various contexts, such as with family members, in friendships, and romantic relationships. Provide examples of how these strengths can be a foundation for building trust and closeness.
Addressing Friction Areas: Give guidance on recognizing and managing potential sources of friction in relationships that may arise from the user's DISC style. Offer strategies for proactively addressing these issues to maintain harmony and understanding.
DISC Style and Relationship Dynamics: Delve into how the individual's DISC style impacts their relationships across different areas of their life, including with family, friends, and romantic partners. Discuss compatibility considerations with other DISC styles and how to navigate differences constructively.
Conclude with an encouraging message about the power of self-awareness through DISC in creating more meaningful and fulfilling relationships, reminding the user that personal growth not only benefits them but also everyone they connect with.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "EnhancingPersonalRelationships":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(11), 1000)
  }
  
  useEffect(()=>{
    if(report["EnhancingPersonalRelationships"]){
      setData(report["EnhancingPersonalRelationships"].split('\n'))
      setTimeout(()=>setSectionNum(11), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section11" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Enhancing Personal Relationships</h1>
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