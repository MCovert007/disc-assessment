import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";

export default function Footer() {
    return (
      <React.Fragment>
        <div className="w-full bg-[#1c2838] h-[140px]">
          <div className="relative max-w-[1024px] h-full mx-auto bg-[#1c2838] px-4 text-white flex justify-between items-center">
            <div className="flex">
              <Link className="" href="/">
                Home
              </Link>
              <Link className="ml-8" href="/query">
                Assessment
              </Link>
              <Link className="ml-8" href="/report">
                Report
              </Link>
            </div>
            <div className="flex w-72 justify-between items-center text-[20px]">
              <Link href="https://www.facebook.com/gapcrossers" target="_blank"><FaFacebookF /></Link>
              <Link href="https://www.instagram.com/gapcrossers" target="_blank"><FaInstagram /></Link>
              &nbsp;&nbsp;&nbsp;<p>©2024 GAP Crossers</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }