import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section16({setSectionNum, report}:Props) {

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
Write an engaging section titled 'Volunteer Opportunities' for a user with specific DISC traits [insert DISC traits here]. This segment aims to highlight how the user's unique personality and behavioral style, as indicated by their DISC profile, can guide them towards fulfilling and impactful community involvement and volunteer work. Address these areas of focus:
Volunteer and Community Involvement:
Explore suitable avenues for the user's participation in community service, local projects, and volunteer groups, emphasizing how their DISC traits can influence the types of roles they might excel in and enjoy.
Provide examples of volunteer activities that align with their strengths and preferences, considering their capacity for leadership, teamwork, and individual contribution.
Community Projects:
Discuss the potential impact the user could have through involvement in community projects. Highlight how their specific DISC traits can be leveraged for effective participation, whether in planning, execution, or coordination roles.
Offer suggestions for identifying projects that resonate with their values and goals, encouraging active and meaningful participation.
Non-Profit Organizations:
Outline opportunities for engagement with non-profit organizations where the user's DISC profile indicates a natural fit. Describe the roles they might play, the leadership qualities they could bring to the table, and how they can navigate team dynamics within these settings.
Provide advice on connecting with non-profits that match their interests and where their unique contributions can have the most significant impact.
Conclude with actionable steps the user can take to explore and engage with volunteer opportunities that not only benefit their community but also align with their personality and behavioral style for a rewarding experience.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "VolunteerOpportunities":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(16), 1000)
  }
  
  useEffect(()=>{
    if(report["VolunteerOpportunities"]){
      setData(report["VolunteerOpportunities"].split('\n'))
      setTimeout(()=>setSectionNum(16), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section16" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Volunteer Opportunities</h1>
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