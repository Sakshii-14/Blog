import React from "react";

import Logo from "./Logo.jsx";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-[#3C1874]  border border-t-2 border-t-black">
      
        <div className=" flex flex-wrap items-center justify-around">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12 ">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-[#FFF8E8]">
                  &copy; Copyright. All Rights Reserved by Sakshi Kesharwani.
                </p>
              </div>
            </div>
          </div>
         
          <div className="w-full p-6 md:w-1/2 lg:w-2/12 ">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-[1rem] font-semibold underline underline-offset-8 uppercase text-[ivory]">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <a target="_blank" rel="noopener noreferrer"
                    className="font-medium text-[#FFF8E8] hover:text-[#acccf9]"
                    href="https://github.com/Sakshii-14"
                  >
                    Account
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className=" font-medium text-[#FFF8E8] hover:text-[#acccf9]"
                    href="mailto:sakshi.kesharwani@gmail.com"
                  >
                    Help
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="font-medium text-[#FFF8E8] hover:text-[#acccf9]"
                    href="mailto:sakshi.kesharwani@gmail.com"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    className=" font-medium text-[#FFF8E8] hover:text-[#acccf9]"
                    href="tel:+8770095181"
                  >
                    Customer Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      
    </section>
  );
}

export default Footer;
