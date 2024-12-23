import React, { useRef } from "react";
import { useSession } from "next-auth/react"

interface Props {
  myName:string,
  myDISCProfile:string,
  flag:boolean,
  completeinputForm(value:any):void,  
}

export default function InputForm({myName, myDISCProfile, flag, completeinputForm}:Props) {

  const form : any = useRef()
  
  const getReport = ()=>{
    const oneOnOneData = {
      myName : myName,
      myDISCProfile : myDISCProfile,
      partnerName : form.current.partnerName.value,
      partnerDISCProfile : form.current.partnerDISCProfile.value,
      relationship : form.current.relationship.value,
    }
    
    if(oneOnOneData.partnerName === "" || oneOnOneData.partnerDISCProfile === ""){
      alert("Please input all data!")
      return
    }
    completeinputForm(oneOnOneData)
  }

  return (
    <React.Fragment>
      {
        flag &&
        <div id="inputForm" className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-40">
          <div className="relative flex items-center justify-center h-full">
            <div className="w-[320px] h-auto rounded-md bg-white p-8">
              <form ref={form}>
                <div className="mb-4">
                  <label className="mb-0 block font-medium text-[#888888] dark:text-white text-[14px]">
                    My Name
                  </label>
                  <div className="relative">
                    <input type="text" placeholder="Enter your full name" name="myName" defaultValue={myName} disabled
                      className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="mb-0 block font-medium text-[#888888] dark:text-white text-[14px]">
                    My DISC Profile
                  </label>
                  <div className="relative">
                    <input type="text" placeholder="Enter your DISC profile" name="myDISCProfile" defaultValue={myDISCProfile} disabled
                      className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="mb-0 block font-medium text-[#888888] dark:text-white text-[14px]">
                    Partner Name
                  </label>
                  <div className="relative">
                    <input type="text" placeholder="Panter's name" name="partnerName" 
                      className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="mb-0 block font-medium text-[#888888] dark:text-white text-[14px]">
                    Partner DISC Profile
                  </label>
                  <div className="relative">
                    <input type="text" placeholder="Partner's DISC profile" name="partnerDISCProfile" 
                      className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-0 block font-medium text-[#888888] dark:text-white text-[14px]">
                    Relationship
                  </label>
                  <div className="relative">
                    <select name="relationship" 
                      className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="personal friendship">personal friendship</option>
                      <option value="working relationship">working relationship</option>
                      <option value="romantic relationship">romantic relationship</option>
                      <option value="personal friendship and working relationship">personal friendship and working relationship</option>
                      <option value="romantic relationship and working relationship">personal friendship and working relationship</option>
                    </select>
                  </div>
                </div>

                <div className="w-full bg-blue-500 rounded-[8px] text-white text-center cursor-pointer p-2" onClick={()=>getReport()}>
                  Getting One-on-One Comparsion Report
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  );
}