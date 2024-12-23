import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

const VerifiedUser = () => {
  const [userData, setUserData] :any = useState([])
  const getUsers = async () =>{
    const response = await axios.post("/api/db/users", {allow:true})
    if(response.data.error || response.data.message){
      alert(JSON.stringify(response.data))
      return []
    }else{
      setUserData(response.data)
      return response.data
    }
  }
  
  useEffect(()=>{
    getUsers()    
  },[])

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid rounded-sm bg-gray-2 dark:bg-meta-4 grid-cols-6 text-[20px] uppercase font-medium">
          <div className="px-2 py-3">
            Name            
          </div>
          <div className="px-2 py-3">
            Email            
          </div>
          <div className="px-2 py-3">
            Created            
          </div>
          <div className="px-2 py-3">
            Updated            
          </div>
          <div className="px-2 py-3">
            Role            
          </div>
          <div className="px-2 py-3">
            Allow            
          </div>
        </div>

        {userData.map((user:any, key:number) => (
          <div
            className={`grid grid-cols-6 text-meta-5 ${
              key === userData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >

            <div className="px-2 py-4">
              {user.name}
            </div>

            <div className="px-2 py-4">
              {user.email}
            </div>

            <div className="px-2 py-4">
              {user.created}
            </div>

            <div className="px-2 py-4">
              {user.updated}
            </div>

            <div className="px-2 py-4">
              {user.role}
            </div>

            <div className="px-2 py-4">
              <p className={user.allow?"text-meta-3":"text-meta-7"}>{user.allow?"verified":"unverified"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifiedUser;
