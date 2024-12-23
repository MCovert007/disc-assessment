import Link from "next/link";
import React, { useState } from "react";

import { useSession, signIn } from "next-auth/react"
import DropdownUser from "./DropdownUser";

function LoginBtn() {
  const { data: session } = useSession();

  if (session) {
    return (
      <DropdownUser/>
    )
  }
  return (
    <>
      <button onClick={() => signIn()} className="text-[#aaaaaa] hover:text-white">Sign in</button>
      {/* <DropdownUser/> */}
    </>
  )
}

export default function Header() {
    const [isActive, setIsActive] = useState(false);

    const handleToggleMenu = () => {
      setIsActive(!isActive);
    };

    return (
      <React.Fragment>
        <header className="fixed top-0 left-0 w-full h-[60px] z-10 backdrop-blur shadow-lg bg-black bg-opacity-10">
          <div className="container mx-auto flex justify-between items-center h-full">
            <Link href="/" className="h-[50px] overflow-hidden">
              <div className="logo">
                <img src="/favicon.ico" width={50}/>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-4 items-center">
              <Link className="mr-4 text-[#aaaaaa] hover:text-white" href="/query">
                Assessment
              </Link>
              <Link className="mr-4 text-[#aaaaaa] hover:text-white" href="/report">
                Report
              </Link>
              <div className="w-8"/>
              <LoginBtn/>
            </nav>
            <div className="md:hidden">
              <button
                onClick={handleToggleMenu}
                className="text-white focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isActive ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
            <div
              className={`md:hidden ${isActive ? 'block' : 'hidden'}`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <LoginBtn/>
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }