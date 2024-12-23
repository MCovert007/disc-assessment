import React, { useEffect, useState } from "react";
import LoadingContent from "../../LoadingContent";
import axios from "axios";
import ContentRenderer from "../../ContentRenderer";
import { useSession } from "next-auth/react";

interface Props{
  setSectionNum(value:number):void,
  report:any,
}

export default function Section05({setSectionNum, report}:Props) {

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
The perspective of this section will be business and work, though it will also be beneficial at home and in life, in general. 
Focus on how the person's distinctive DISC traits shape the theme of this section of the report. Here is the information for this section of the report:
"Write a detailed section titled 'People, Task and Pace Preference.' Cover the following points:
- Personal preference regarding people or task orientation and the implications, both personally, socially and work related to this preference.
- Personal preference regarding fast or slow pace and the implications, both personally, socially and work related to this preference.
[note:don't show DISC vulue, don't need title, start with my name]
`
    }]
    const result = await axios.post('/api/chat', messages)
    const _data = result.data.choices[0].message.content.split('\n')
    axios.put(`/api/db/report`, {email:session?.user?.email, "PeopleTaskPacePreference":result.data.choices[0].message.content})
    // _data.shift()
    setData(_data)
    setTimeout(()=>setSectionNum(5), 1000)
  }
  
  useEffect(()=>{
    if(report["PeopleTaskPacePreference"]){
      setData(report["PeopleTaskPacePreference"].split('\n'))
      setTimeout(()=>setSectionNum(5), 1000)
    }else{
      getResultSection()
    }
  },[report])

  return (
    <div id="section05" className="border-b p-16">
      <h1 className="text-[40px] mb-8">People, Task and Pace Preference</h1>
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