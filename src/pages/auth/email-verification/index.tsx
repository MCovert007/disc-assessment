import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Verification: React.FC = () => {
  const [yourEmail, setEmail] = useState("")
  const [regState, setReg] = useState(false)

  const router = useRouter()

  useEffect(()=>{
    if (router.isReady) {
      const {email, reg} = router.query
      setEmail(String(email))
      setReg(String(reg)==="true"?true:false)
    }
  },[router.isReady, router.query])

  const sendEmail = async () =>{
    const response = await axios.post("/api/email/magic-link", {email:yourEmail})
    if(response.data.success){
      alert("Successful sending")
    }else{
      alert("failure sending, please retry")
    }
  }

  return (
    <div className="sign-page">
      <div className="flex justify-center items-center h-screen backdrop-blur-[4px]">
        <div className="flex flex-wrap items-center max-w-[1440px] md:min-w-[1000px] mx-auto rounded-sm bg-white shadow-defaul dark:bg-boxdark bg-opacity-70">

          <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <div className="mb-16 text-black text-[20px]">
                {
                  regState?
                  "We have sent an email to your address to verify your email."
                  :
                  "Your email has not been verified yet."
                }
                <br/>
                Please verify your email to activate your account and access our website.<br/><br/>
                If you have not received the email yet, please click the {"'"}Sending Again{"'"} button.
              </div>
              <div
                onClick={()=>sendEmail()}
                className="w-[200px] mx-auto cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 text-center"
              >
                Sending Again
              </div>
              <div className="mt-6 text-center">
                <Link href="/" className="text-primary">
                  Go to Website
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
