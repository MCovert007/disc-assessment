import useMyStore from "@/lib/myStore";
import React, { } from "react";

export default function Ready({ready}:any) {

  const startAction = () =>{
    useMyStore.setState({assessment:[], assessmentState:"Started"})
  }
  
  return (
    <React.Fragment>
      <div className="relative w-full h-full pb-2 flex justify-center items-center text-[16px] text-[#444444]">
        <div>
          <h1 className="text-center text-[22px] mb-6 font-bold">
            Before proceeding, please carefully read the disclaimer below:
          </h1>

          <p>
            This assessment is a tool designed to offer insights into behavioral tendencies rather than provide a comprehensive or definitive analysis of your personality, psychological profile, or mental health. Its accuracy, particularly in comparative analysis, is not absolute and may vary based on the manner in which questions are answered.
          </p>

          <p className="mt-6 mb-4 text-center">
            To optimize the value of the DISC assessment, we recommend the following guidelines:
          </p>

          <ol className="pl-6" style={{listStyle:'auto'}}>
            <li>Respond instinctively to each of the 24 questions without overthinking. Trust your immediate, &quot;gut&quot; reaction.</li>
            <li>Consider the context in which you intend to apply the insights from this assessment. For instance, if your focus is on workplace dynamics, answer the questions based on your interactions in a professional environment. If improving family relationships is your goal, adopt that perspective when responding.</li>
            <li>For significant life decisions, such as changes in marital status, career paths, etc., we strongly advise seeking guidance from qualified professionals.</li>
          </ol>

          <p className="mt-4">
            Upon completion of the assessment, you will have the opportunity to access personalized reports for a fee.
          </p>

          <p className="mt-4 mb-1 text-center">
            By proceeding, you acknowledge and agree to our terms of service.
          </p>

          <div className="flex justify-center">
            <button className="btn normal-btn mt-6 leading-[30px] py-2" disabled={!ready} onClick={()=>startAction()}>
              {
                ready?
                <>
                  1) I agree to terms of service<br/>
                  2) Start the Assessment
                </>
                :
                <>
                  Loading...
                </>
              }
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}