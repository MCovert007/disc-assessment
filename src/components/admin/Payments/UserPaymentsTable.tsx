import { UserPayment } from "@/types/userPayment";
import Image from "next/image";
import DropdownDefault from "../Dropdowns/DropdownDefault";

const userPaymentData: UserPayment[] = [
  {
    UserID: "00001",
    PaymentID : "1",
    Amount : "29.99",
    PaymentStatus : "Succeeded",
    PaymentDate : "2024-03-31 10:15:00",
    PaymentMethod : "PayPal",
  },
  {
    UserID: "00001",
    PaymentID : "1",
    Amount : "29.99",
    PaymentStatus : "Failed",
    PaymentDate : "2024-03-31 10:15:00",
    PaymentMethod : "PayPal",
  },
  {
    UserID: "00002",
    PaymentID : "1",
    Amount : "29.99",
    PaymentStatus : "Failed",
    PaymentDate : "2024-03-31 10:15:00",
    PaymentMethod : "PayPal",
  },
  {
    UserID: "00003",
    PaymentID : "1",
    Amount : "29.99",
    PaymentStatus : "Succeeded",
    PaymentDate : "2024-03-31 10:15:00",
    PaymentMethod : "PayPal",
  },
  {
    UserID: "00004",
    PaymentID : "1",
    Amount : "29.99",
    PaymentStatus : "Succeeded",
    PaymentDate : "2024-03-31 10:15:00",
    PaymentMethod : "PayPal",
  },
  {
    UserID: "00005",
    PaymentID : "1",
    Amount : "29.99",
    PaymentStatus : "Succeeded",
    PaymentDate : "2024-03-31 10:15:00",
    PaymentMethod : "PayPal",
  },
];

const UserPaymentsTable: React.FC = () => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                UserID
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                PaymentID
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                Amount
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                PaymentStatus
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                PaymentDate
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium xsm:text-base">
                PaymentMethod
              </h5>
            </div>
          </div>

          {userPaymentData.map((item, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-6 ${
                key === userPaymentData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {item.UserID}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {item.PaymentID}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-5">${item.Amount}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className={item.PaymentStatus==="Succeeded"?"text-meta-3":"text-meta-7"}>{item.PaymentStatus}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{item.PaymentDate}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{item.PaymentMethod}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPaymentsTable;
