import React from "react"
import Header from "../header"
import Footer from "../Footer"
import Link from "next/link"

export default function LandingPage() {
  
    return (
      <React.Fragment>
        <Header/>
        <div className="relative w-full bg-[#1c2838] min-h-[650px] flex justify-center items-center">
          <h1 className="disc-title">
            The GAP Crossers<br/>
            <span className="text-[#ff0000]">D</span><span className="text-[#ffff00]">I</span><span className="text-[#00ff00]">S</span><span className="text-[#0000ff]">C</span> Assessment
            <p className="text-[18px] text-[#22ee22] -mt-8" style={{textShadow:"none"}}>
              The Ultimate Tool for Predicting Behavior
            </p>
          </h1>
          <div className="absolute -bottom-[200px] left-[calc(50%-200px)]">
            <div className="relative w-[400px] h-[400px] bg-white shadow-xl p-2 rounded-full">
              <img src="/images/disc-home/DISC-model.png" width={384} height={384} className="rounded-[200px]"/>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <div className="max-w-[1024px] p-4 mx-auto text-[#1c2838] mt-52">
            <h1 className="text-[36px] leading-[46px] pt-12">
              Unlock Your Full Potential to Communicate by Tapping into the Awesome Power to Predict Behavior
            </h1>
            <p className="text-[20px] leading-[30px] mt-4">
              Discover the keys to personal and professional success with our comprehensive <span className="font-bold">DISC</span> model assessment.<br/>
              <span className="font-bold">At Gap Crossers</span>, we believe that understanding the behavioral tendencies of yourself and others, is the first step towards emotional intelligence, so you can maximize your strengths, improve communication, and build stronger relationships.
            </p>
          </div>
        </div>

        <Link className="btn button my-16" href="/query">
          Get Your Assesment
        </Link>
        <Footer/>
      </React.Fragment>
    );
  }