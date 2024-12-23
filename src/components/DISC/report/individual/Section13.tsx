import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section13({setSectionNum, report}:Props) {

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
Draft an inspiring section titled 'Creative and Artistic Pursuits.’ This section is dedicated to exploring how the user's personality influences their engagement in creative activities, both collaboratively and individually. Address the following areas:
Artistic Collaboration:
- Discuss the user's approach to collaborating on creative projects, focusing on how their DISC traits influence their communication with team members, sharing of ideas, and receptivity to constructive feedback.
- Provide strategies for enhancing collaborative creative processes, suggesting ways to leverage their DISC traits for more harmonious and productive artistic partnerships.
Solo Projects:
- Explore the user's methodology for pursuing personal creative endeavors. Highlight how their DISC profile impacts their motivation, discipline, and strategies for overcoming creative blocks.
- Offer advice on maintaining momentum in solo projects, including setting realistic goals, creating a conducive working environment, and techniques for reigniting creativity when faced with challenges.
Conclude with a motivational reminder that their unique DISC traits are an asset in both collaborative and solo creative pursuits, encouraging them to embrace their individuality to fuel their artistic expression and innovation.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "CreativeandArtisticPursuits":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(13), 1000)
  }
  
  useEffect(()=>{
    if(report["CreativeandArtisticPursuits"]){
      setData(report["CreativeandArtisticPursuits"].split('\n'))
      setTimeout(()=>setSectionNum(13), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section13" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Creative and Artistic Pursuits</h1>
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