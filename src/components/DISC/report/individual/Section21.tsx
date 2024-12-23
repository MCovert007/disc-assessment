import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section21({setSectionNum, report}:Props) {

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
Develop a detailed section titled 'Personal Development Opportunities. This section aims to empower the user with insights and tools for continuous growth, leveraging their unique DISC profile as a foundation. Address the following key areas to facilitate a comprehensive personal development plan:
Identifying Personal Growth Areas:
- Examine the user's DISC profile to pinpoint specific areas for personal growth, including aspects of their interpersonal skills and emotional intelligence that could benefit from focused development efforts.
Setting Achievable Goals:
- Guide the user in setting realistic and achievable goals for enhancing their interpersonal skills and emotional intelligence. Emphasize the importance of SMART (Specific, Measurable, Achievable, Relevant, Time-bound) objectives that align with their DISC traits.
Strategies for Personal Development:
- Offer strategies tailored to the user's DISC style for seizing opportunities for personal development. Include actionable steps for improvement that cater to their strengths and address potential challenges head-on.
Resources for Further Learning and Development:
- Recommend resources (such as books, online courses, workshops, and seminars) specifically beneficial for the user's DISC style. Highlight opportunities for further exploration and deepening of their understanding and skills.
Coaching and Development Report:
- Provide insights for coaches or mentors on how to effectively guide the individual in their personal and professional development journeys, considering the nuances of their DISC profile. Suggest coaching techniques and focus areas that align with the user's personality and goals.
Actionable Advice:
- Deliver specific, actionable recommendations that the user can implement to leverage their natural strengths and systematically address areas requiring improvement, enhancing both personal efficacy and professional performance.
Personal Development Goals:
- Assist the user in defining clear, tangible short-term and long-term goals for their personal and professional development. Encourage reflection on how achieving these goals aligns with their overall life vision and DISC style.
Resources and Support:
- Suggest a curated list of resources, activities, and practices that support the user's ongoing growth and development journey. Encourage engagement with communities, networks, or groups that resonate with their personal development interests and objectives.
Conclude with an encouraging message that underscores the user's potential for growth and transformation, emphasizing that their DISC profile is a tool that, when used wisely, can significantly enhance their journey towards achieving personal excellence and fulfillment.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "PersonalDevelopmentOpportunities":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(21), 1000)
  }
  
  useEffect(()=>{
    if(report["PersonalDevelopmentOpportunities"]){
      setData(report["PersonalDevelopmentOpportunities"].split('\n'))
      setTimeout(()=>setSectionNum(21), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section21" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Personal Development Opportunities</h1>
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