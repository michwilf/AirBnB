import React from "react";
import Image from "next/image";

const MediumCard = ({ img, title }) => {
  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
      <div className="relative h-72 min-w-[300px]">
        <Image src={img} layout="fill" className="rounded-xl" alt="city-pic" />
      </div>
      <h3 className="text-2xl mt-3 ">{title}</h3>
    </div>
  );
};


export default MediumCard;