import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section04({setSectionNum, report}:Props) {

  const { data: session }:any = useSession()
  const userInfo = {
    firstName:session?.user?.name?.split(" ")[0]
  }
  const userDISC = session?.user?.discValue
  
  const [data, setData] = useState([])

  const getResultSection = async () =>{

    const messages = [{
      role:'user',
      content:
      `First Name : ${userInfo.firstName},
DISC value : [D (${userDISC.D[0]+userDISC.D[1]}), I (${userDISC.I[0]+userDISC.I[1]}), S (${userDISC.S[0]+userDISC.S[1]}) and C (${userDISC.C[0]+userDISC.C[1]})]
Energy line is 60
Craft a 500 word personalized section of report for me. The perspective of this section will be business and work, though it will also be beneficial at home and in life, in general. Focus on how the person’s distinctive DISC traits shape the theme of this section of the report. Here is the information for this section of the report:

Draft an uplifting section titled 'Value to Your Sphere of Influence' for a user with specific DISC traits. This segment should serve as a beacon of encouragement, emphasizing how their unique combination of DISC characteristics enriches their immediate and extended environments. Focus on illustrating:
Enhancing the Sphere with Unique DISC Traits:
Describe how the user’s specific DISC traits contribute positively to their sphere of influence, be it in their personal life, workplace, or community. Highlight the unique strengths they bring to the table and how these can address specific needs in the world around them.
Unique Contributions to the World:
Discuss the distinctive ways the user can fulfill the world’s needs through their inherent DISC attributes. Encourage them to think about the broader impact of leveraging their strengths in new and innovative ways, whether through leadership, creativity, empathy, or organization.
Expanding the Sphere of Influence:
Analyze the user’s natural tendencies towards expanding their influence, identifying both the positive drivers and potential challenges inherent in their DISC profile. Provide insight into how their strengths can facilitate growth and how to proactively address any obstacles that may arise during this expansion.
Navigating Expansion Challenges:
Offer strategies for the user to navigate the challenges of expanding their sphere of influence, tailored to their DISC traits. Suggest how to balance ambition with empathy, assertiveness with listening, and innovation with practicality, ensuring a holistic approach to growth.
Affirmation of Impactful Potential:
Conclude by affirming the user’s potential to make a significant and positive difference in their world. Highlight the importance of their DISC traits in crafting a unique path of influence and underscore their capacity for making meaningful contributions, driven by their diverse strengths and versatility.
[note:don't show DISC vulue, don't need title, start with my name]`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "SphereOfInfluence":result.data.choices[0].message.content})
    setData(_data)
    setTimeout(()=>setSectionNum(4), 1000)
  }
  useEffect(()=>{
    if(report["SphereOfInfluence"]){
      setData(report["SphereOfInfluence"].split('\n'))
      setTimeout(()=>setSectionNum(4), 1000)
    }else{
      getResultSection()
    }
  },[])

  return (
    <div id="section04" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Value to Your Sphere of Influence</h1>
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