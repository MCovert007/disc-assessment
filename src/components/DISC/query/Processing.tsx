import React, { useEffect, useState } from "react";
import useMyStore from "@/lib/myStore";

interface Props {
  queries : number[],
  naturalTest:any[],
  adaptedTest:any[],
}

export default function Processing({queries, adaptedTest, naturalTest}:Props) {

  const [step, setStep] = useState(0)
  const [orders, setOrders]=useState(['D', 'S', 'I', 'C'])
  const alphabeta = ['A', 'B', 'C', 'D']
  const [stepQuestion, setStepQuestion] = useState(undefined)
  const [stepResult, setStepResult] = useState<string[]>([])
  const assessment : any = useMyStore((s)=>s.assessment)
  const assessmentState : string = useMyStore((s)=>s.assessmentState)

  useEffect(()=>{
    setStep(0)
    setStepQuestion(adaptedTest[queries[0]])
  },[queries, adaptedTest, naturalTest])

  useEffect(()=>{
    if(assessment.length === 0)
      setStep(0)
    else
      setStep(assessment.length-1)
  },[assessmentState])
  
  useEffect(()=>{
    setStepQuestion(step<queries.length/2?adaptedTest[queries[step]]:naturalTest[queries[step]])
    const _default = ['D', 'S', 'I', 'C']
    const temp : number[] = []
    const orderString = []
    while (temp.length < 4) {
      let randomNumber = Math.floor(Math.random() * 4);
      if(randomNumber>3) continue
      if (!temp.includes(randomNumber)) {
          temp.push(randomNumber);
          orderString.push(_default[randomNumber])
      }
    }
    setOrders(orderString)
    if((typeof assessment === "object") && assessment[step]){
      const _temp = assessment[step]
      setStepResult([..._temp])
    }else{
      setStepResult([])
    }
  },[step])

  const nextStep = () =>{
    if(step<queries.length-1){
      const _temp = assessment===undefined?[]:[...assessment]
      if(_temp.length>step && _temp[step]){
        _temp[step] = stepResult
      }else{
        _temp.push(stepResult)
      }
      useMyStore.setState({assessment:_temp})
      setStep(step+1)
    }else{      
      const _temp = [...assessment]
      if(_temp.length>step && _temp[step]){
        _temp[step] = stepResult
      }else{
        _temp.push(stepResult)
      }
      useMyStore.setState({assessment:_temp, assessmentState:"Complete"})
    }
  }

  const previousStep = () =>{
    if(step>0){
      setStep(step-1)
    }
  }

  const selectQuestion = (value:string) => {
    const _temp = [...stepResult]
    if(_temp.includes(value)){
      _temp.splice(_temp.indexOf(value), 1);
    }else{
      _temp.push(value)
    }
    setStepResult(_temp)
  }

  return (
    <React.Fragment>
      <div className="relative w-full pb-2">

        <p className="text-center text-bold text-[22px]" style={{fontFamily:'Exo'}}>
          Click A, B, C, and D in the order of most to least like you.<br/>
          For example, if C is most similar to you, click C first.<br/>
          If A is least similar to you, click A last (fourth).
        </p>

        <div className="flex justify-around select-none mt-4 mb-8 text-white">
          <div className="bg-white rounded-md shadow-sm overflow-hidden p-1">
            <div className="relative h-8 flex items-center justify-center bg-green-500 rounded-md w-32">
              <div className="font-medium text-sm">1th : most like</div>
            </div>
          </div>
          <div className="bg-white rounded-md shadow-sm overflow-hidden p-1">
            <div className="relative h-8 flex items-center justify-center bg-green-300 rounded-md w-32">
              <div className="font-medium text-sm">2th : like</div>
            </div>
          </div>
          <div className="bg-white rounded-md shadow-sm overflow-hidden p-1">
            <div className="relative h-8 flex items-center justify-center bg-[rgb(252,165,165)] rounded-md w-32">
              <div className="font-medium text-sm">3th : dislike</div>
            </div>
          </div>
          <div className="bg-white rounded-md shadow-sm overflow-hidden p-1">
            <div className="relative h-8 flex items-center justify-center bg-[rgb(239,68,68)] rounded-md w-32">
              <div className="font-medium text-sm">4th : most dislike</div>
            </div>
          </div>
        </div>

        <div>
          {
            stepQuestion !== undefined && <p className="pl-2">{stepQuestion['question']}</p>
          }
          {
            stepQuestion !== undefined &&
            orders.map((value, index)=>
              <div key={index} className="flex rounded-md my-2 bg-white rounded-md shadow-sm overflow-hidden p-1 cursor-pointer" onClick={()=>selectQuestion(value)}>
                <div className="relative min-h-8 flex items-center rounded-md w-full px-2 md:px-8"
                  style={{
                    color:stepResult.indexOf(value)===-1?"black":"white",
                    background:stepResult.indexOf(value)===0?"rgb(34,197,94)":stepResult.indexOf(value)===1?"rgb(134,239,172)":stepResult.indexOf(value)===2?"rgb(252,165,165)":stepResult.indexOf(value)===3?"rgb(239,68,68)":"white"
                  }}
                >
                  {alphabeta[index]} : &nbsp; {stepQuestion[value]}
                </div>
              </div>
            )
          }
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-1 mt-8">
          <div className="relative h-4 flex items-center justify-center">
            <div className="absolute top-0 bottom-0 left-0 rounded-lg bg-yellow-200" style={{width:`${100/(queries.length)*(step+1)}%`, transition:"width 0.5s"}}></div>
            <div className="relative text-green-900 font-medium text-sm">{step+1} / {queries.length}</div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8">
          <button className="btn normal-btn" disabled={step===0} onClick={()=>previousStep()}>Previous</button>
          <button className="btn normal-btn" disabled={stepResult.length<4} onClick={()=>nextStep()}>{step===queries.length-1?"Complete":"Next"}</button>
        </div>
      </div>
    </React.Fragment>
  );
}