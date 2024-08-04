import React from "react";
import CursorEffect from "./CursorEffect";

const HomePage = () => {
  return (
    <div className="w-full h-screen-64 relative">
      <div className="h-screen-64 bg-[#333333] flex flex-col justify-center items-center relative">
        <CursorEffect />
        <div className="relative z-10 text-white text-[56px] font-bold text-center drop-shadow-[0_0_5px_#ffffff,0_0_20px_#000,0_0_30px_#000]">
          Empowering Clinicians with <br /> Virtual Reality Therapy
        </div>
        <div className="relative z-10 text-center text-white mt-4">
          Welcome to our clinician website, which has been designed to transform PTSD treatment and <br /> improve
          mental health care. Discover the potential of virtual reality therapy and discover new <br /> opportunities
          for your patients.
        </div>
      </div>
    </div>
  );
};

export default HomePage;
