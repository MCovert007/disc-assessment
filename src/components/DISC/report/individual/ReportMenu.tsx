import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ReportMenu({section}:any) {

  const [flag, setFlag] = useState(false)

  const goSection = (value:string) =>{
    let sectionID = 'section' + value
    const object = document.getElementById(sectionID)
    if(object){
      const offsetY = object.offsetTop
      window.scroll({top:offsetY, behavior:'smooth'})
    }    
  }

  const listClass = "cursor-pointer w-[160px] text-[16px] mx-auto truncate hover:underline"

  return (
    <React.Fragment>
      <div className="fixed top-4 left-4 toggle z-10 cursor-pointer" onClick={()=>setFlag(!flag)}>
        <div className="p-1 rounded-sm bg-white">
          {flag?<FaArrowLeft />:<FaArrowRight />}
        </div>
      </div>

      <div className="fixed top-0 left-0" style={{left:flag?"0px":"-200px", transition:"left 0.5s"}}>
        <div className="relative w-[200px] min-h-[100vh] bg-white rounded-md shadow-md py-4 text-[#1e40af]">          
          <div className={listClass+ " mb-4 mt-12"}>
            <Link href="/">Home</Link>
          </div>


          <div className={listClass} onClick={()=>goSection("Cover")}>Cover</div>
          <div className={listClass} onClick={()=>goSection("01")}>Introduction</div>
          {
            section >= 1 && <div className={listClass} onClick={()=>goSection("02")}>Personal Behavioral Tendencies</div>
          }
          {
            section >= 2 && <div className={listClass} onClick={()=>goSection("03")}>DISC Descriptors</div>
          }
          {
            section >= 3 && <div className={listClass} onClick={()=>goSection("04")}>Value to Your Sphere of Influence</div>
          }
          {
            section >= 4 && <div className={listClass} onClick={()=>goSection("05")}>People, Task and Pace Preference</div>
          }
          {
            section >= 5 && <div className={listClass} onClick={()=>goSection("06")}>Perceptions</div>
          }
          {
            section >= 6 && <div className={listClass} onClick={()=>goSection("07")}>Leading Your Sphere of Influence</div>
          }
          {
            section >= 7 && <div className={listClass} onClick={()=>goSection("08")}>Preferred Style of Communication</div>
          }
          {
            section >= 8 && <div className={listClass} onClick={()=>goSection("09")}>Getting to the Heart of Tension</div>
          }
          {
            section >= 9 && <div className={listClass} onClick={()=>goSection("10")}>Interacting with Other DISC Styles</div>
          }
          {
            section >= 10 && <div className={listClass} onClick={()=>goSection("11")}>Enhancing Personal Relationships</div>
          }
          {
            section >= 11 && <div className={listClass} onClick={()=>goSection("12")}>Preferred Learning Style</div>
          }
          {
            section >= 12 && <div className={listClass} onClick={()=>goSection("13")}>Creative and Artistic Pursuits</div>
          }
          {
            section >= 13 && <div className={listClass} onClick={()=>goSection("14")}>Online and Digital Spaces</div>
          }
          {
            section >= 14 && <div className={listClass} onClick={()=>goSection("15")}>Career Possibilities</div>
          }
          {
            section >= 15 && <div className={listClass} onClick={()=>goSection("16")}>Volunteer Opportunities</div>
          }
          {
            section >= 16 && <div className={listClass} onClick={()=>goSection("17")}>Entrepreneurial Ventures</div>
          }
          {
            section >= 17 && <div className={listClass} onClick={()=>goSection("18")}>Stress Management</div>
          }
          {
            section >= 18 && <div className={listClass} onClick={()=>goSection("19")}>Balancing Natural and Adapted Styles</div>
          }
          {
            // section >= 19 && <div className={listClass} onClick={()=>goSection("20")}></div>
          }
          {
            section >= 19 && <div className={listClass} onClick={()=>goSection("21")}>Personal Development Opportunities</div>
          }
          {
            section >= 21 && <div className={listClass} onClick={()=>goSection("22")}>Conclusion - Navigating the Path Forward</div>
          }
        </div>
      </div>
    </React.Fragment>
  );
  }