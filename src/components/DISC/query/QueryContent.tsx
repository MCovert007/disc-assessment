import React, { useEffect, useState } from "react";
import Ready from "./Ready";
import Processing from "./Processing";
import Complete from "./Complete";
import useMyStore from "@/lib/myStore"
import Footer from "../Footer";
import axios from "axios";
import { useSession } from "next-auth/react"

export default function QueryContent() {
  
  const { data: session } = useSession();
  const user : any = session?.user

  const assessmentState = useMyStore((state)=>state.assessmentState)
  const countOfQuery = useMyStore((state)=>state.countOfQuery)

  const [naturalTest, setNaturalTest] = useState([])
  const [adaptedTest, setAdaptedTest] = useState([])

  const [queries, setQueries] = useState<number[]>([])
  const [ready, setReady] = useState(false)

  const getData = async () =>{
    const naturalResponse = await axios.get(`/api/db/question-natural`,{})
    if(naturalResponse.data.error || naturalResponse.data.message){
      alert(JSON.stringify(naturalResponse.data))
      setNaturalTest([])
    }else{
      setNaturalTest(naturalResponse.data)
    }
    const adaptedResponse = await axios.get(`/api/db/question-adapted`,{})
    if(adaptedResponse.data.error || adaptedResponse.data.message){
      alert(JSON.stringify(adaptedResponse.data))
      setAdaptedTest([])
    }else{
      setAdaptedTest(adaptedResponse.data)
    }
    setReady(true)
  }

  useEffect(()=>{
    if(user?.discProfile){
      useMyStore.setState({assessmentState:"Complete"})
    }
  },[])

  useEffect(()=>{
    if(!ready)
      getData()
  },[])

  useEffect(()=>{
    if(assessmentState === "Started"){
      const temp1 : number[] = []
      while (temp1.length < countOfQuery/2) {        
        let randomNumber = Math.floor(Math.random() * adaptedTest.length);
        if(randomNumber >= adaptedTest.length) continue
        if (!temp1.includes(randomNumber)) {
            temp1.push(randomNumber);
        }
      }
      const temp2 : number[] = []
      while (temp2.length < countOfQuery/2) {        
        let randomNumber = Math.floor(Math.random() * naturalTest.length);
        if(randomNumber >= naturalTest.length) continue
        if (!temp2.includes(randomNumber)) {
            temp2.push(randomNumber);
        }
      }
      const temp = temp1.concat(temp2)
      setQueries(temp)
    }
  },[assessmentState, adaptedTest, naturalTest])
  
  return (
    <React.Fragment>
      <div className="w-full min-h-[calc(100%-140px)] flex justify-center items-center p-4 md:p-8 max-w-[1024px] mx-auto">
        <div className="relative w-full h-full bg-sky-100 rounded-lg select-user"
          style={{
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px", 
            fontFamily:"'Roboto'",
            fontWeight: "400",
            overflow: "hidden"
          }}
        >
          <div className="relative w-full p-8 max-h-[calc(100vh-204px)]">
            <div className="relative overflow-auto block max-h-[calc(100vh-268px)]">
              {
                (assessmentState === "Ready")?
                <Ready ready={ready}/>
                : assessmentState === "Complete" ?
                <Complete/>
                : (assessmentState === "Started" || assessmentState === "Update")?
                <Processing queries={queries} adaptedTest={adaptedTest} naturalTest={naturalTest} />
                // <></>
                :<></>
              }
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </React.Fragment>
  );
}