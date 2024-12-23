import axios from "axios";
import { useState, useEffect } from "react";

const TransactionTable: React.FC = () => {

  const [transactionData, setData] = useState<any[]>([])

  const getTransactions = async () => {
    const response = await axios.get(`/api/db/payments`,{})
    if(response.data.error || response.data.message){
      alert(JSON.stringify(response.data))
      setData([])
    }else{
      setData(response.data)
    }
  }

  useEffect(()=>{
    getTransactions()
  },[])
  
  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                PaymentOrderID
              </h5>
            </div>
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                Email
              </h5>
            </div>
            <div className="hidden p-2.5 sm:block xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                Amount
              </h5>
            </div>
            <div className="hidden p-2.5 sm:block xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                Pay for what
              </h5>
            </div>
            <div className="hidden p-2.5 sm:block xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                Date
              </h5>
            </div>
            <div className="hidden p-2.5 sm:block xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                Status
              </h5>
            </div>
          </div>

          {transactionData.map((item, key) => item.real && (
            <div
              className={`grid grid-cols-3 sm:grid-cols-7 ${
                key === transactionData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {item.paymentOrderId}
                </p>
              </div>

              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {item.paymentName}
                </p>
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 truncate">{item.email}</p>
              </div>

              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-meta-5">${item.units}</p>
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{item.productName}</p>
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{item.update_time}</p>
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                <p className={item.status?"text-meta-3":"text-meta-7"}>{item.status==="COMPLETED"?"Success":"Failure"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
