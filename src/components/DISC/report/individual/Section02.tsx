import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";
interface Props{
  setSectionNum(value:number):void,
  report:any,
}
export default function Section02({setSectionNum, report}:Props) {
  const [data, setData] = useState([])
  const { data: session }:any = useSession()

  const getResultSection = async () =>{    
    const userInfo = {
      firstName:session?.user?.name?.split(" ")[0]
    }
    const userDISC = session?.user?.discValue

    const messages = [{
      role:'user',
      content:
      `My First Name : ${userInfo.firstName},
DISC value : [D (${userDISC.D[0]+userDISC.D[1]}), I (${userDISC.I[0]+userDISC.I[1]}), S (${userDISC.S[0]+userDISC.S[1]}) and C (${userDISC.C[0]+userDISC.C[1]})]
Energy line is 60
Craft a 500 word personalized section of a report for me.
The perspective of this section will be business and work, though it will also be beneficial at home and in life, in general.
Focus on how the person’s distinctive DISC traits shape the theme of this section for DISC report.
This section shows Personal Behavioral Tendencies. 
This section should help me understand my unique DISC Profile, sharing:
      1. Summary of the my DISC results
      2. Detailed descriptions of the my DISC styles that score above the energy line.
      3. Conclusion
      [note:don't show DISC vulue, don't need title, start with my name]`
    }]

    const result = await axios.post('/api/chat', messages)
    if(result.data?.error){
      alert(result.data?.error)
      return
    }
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "personalBehavioralTendencies":result.data.choices[0].message.content})
    setData(_data)
    setTimeout(()=>setSectionNum(2), 1000)
  }

  useEffect(()=>{
    if(report["personalBehavioralTendencies"]){
      setData(report["personalBehavioralTendencies"].split('\n'))
      setTimeout(()=>setSectionNum(2), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section02" className="border-b p-16">
      <h1 className="text-[40px] mb-8">Personal Behavioral Tendencies</h1>
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