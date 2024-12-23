import { TestResult } from "@/types/testResult";
import axios from "axios";
import { useEffect, useState } from "react";

const testResultData: TestResult[] = [
  {
    ResultID : "1",
    UserID: "123",
    Score : {
      adapted:{D:30, I:30, S:30, C:30},
      natural:{D:30, I:30, S:30, C:30},
    },
    Profile: "DISC",
    AssessmentDate : "2024-03-31 10:15:00",
  },
  {
    ResultID : "2",
    UserID: "456",
    Score : {
      adapted:{D:50, I:40, S:20, C:10},
      natural:{D:40, I:40, S:20, C:20},
    },
    Profile: "DI",
    AssessmentDate : "2024-03-31 10:15:00",
  },
];

const AssessmentResultTable: React.FC = () => {

  const [testResultData, setResultData] = useState<any[]>([])

  const getData = async () =>{
    const response = await axios.get(`/api/db/test-result`,{})
    if(response.data.error || response.data.message){
      alert(JSON.stringify(response.data))
      setResultData([])
    }else{
      setResultData(response.data)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid rounded-sm bg-gray-2 dark:bg-meta-4 grid-cols-6">
            <div className="p-2">
              <h5 className="text-sm font-medium xsm:text-base">
                No
              </h5>
            </div>
            <div className="p-2">
              <h5 className="text-sm font-medium xsm:text-base">
                UserID
              </h5>
            </div>
            <div className="p-2 col-span-2">
              <h5 className="text-sm font-medium xsm:text-base">
                DISC Assessment
              </h5>
            </div>
            <div className="p-2">
              <h5 className="text-sm font-medium xsm:text-base">
                DISC Profile
              </h5>
            </div>
            <div className="p-2">
              <h5 className="text-sm font-medium xsm:text-base">
                AssessmentDate
              </h5>
            </div>
          </div>

          {testResultData.map((item, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-6 text-meta-5 ${
                key === testResultData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2">                
                {key+1}
              </div>

              <div className="flex items-center p-2">
                {item.userID}
              </div>

              <div className="p-2 col-span-2">
                <div>
                  Adapted Scores : [&nbsp;
                    <span className="text-[#ef4444]">{item.result.D[0]}</span>,&nbsp;
                    <span className="text-yellow-500">{item.result.I[0]}</span>,&nbsp;
                    <span className="text-green-500">{item.result.S[0]}</span>,&nbsp;
                    <span className="text-blue-500">{item.result.C[0]}</span>&nbsp;
                  ]
                </div>
                <div>
                  Natural Scores : [&nbsp;
                    <span className="text-[#ef4444]">{item.result.D[1]}</span>,&nbsp;
                    <span className="text-yellow-500">{item.result.I[1]}</span>,&nbsp;
                    <span className="text-green-500">{item.result.S[1]}</span>,&nbsp;
                    <span className="text-blue-500">{item.result.C[1]}</span>&nbsp;
                  ]
                </div>
                <div>
                  All Scores : [&nbsp;
                    <span className="text-[#ef4444]">{item.result.D[0]+item.result.D[1]}</span>,&nbsp;
                    <span className="text-yellow-500">{item.result.I[0]+item.result.I[1]}</span>,&nbsp;
                    <span className="text-green-500">{item.result.S[0]+item.result.S[1]}</span>,&nbsp;
                    <span className="text-blue-500">{item.result.C[0]+item.result.C[1]}</span>&nbsp;
                  ]
                </div>
              </div>

              <div className="p-2 flex items-center">
                <p className="text-meta-5">{item.profile}</p>
              </div>

              <div className="p-2 flex items-center">
                <p className="text-meta-5">{item.updated}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentResultTable;
