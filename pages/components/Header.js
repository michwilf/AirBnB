import React, { useState } from "react";
import Image from "next/image";
import * as Icons from "heroicons-react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useRouter } from "next/dist/client/router";

const Header = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const setSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);
    setSearchInput("");
  };

  return (
    <div className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* Left */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-12 cursor-pointer my-auto"
      >
        <Image
          src="/airbnb-logo.png"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
          alt="airbn-logo"
        />
      </div>

      {/* Middle */}
      <form
        onSubmit={handleSubmit}
        className="flex mx-3 items-center border-2 rounded-full py-2 md:shadow-sm"
      >
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow pl-6 bg-transparent outline-none text-sm text-gray-600 placeholder-gay-400 border- w-5/6"
          type="text"
          placeholder={placeholder || "Search here"}
        />
        <Icons.Search className="h-6 scale-125 bg-red-400 text-white rounded-full p-2 cursor-pointer hidden md:inline-flex md:mx-3" />
      </form>

      {/* Right */}
      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <p className="hidden md:inline cursor-pointer whitespace-nowrap">
          Become a host
        </p>
        <Icons.GlobeAlt className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <Icons.MenuAlt1 className="h-6" />
          <Icons.UserCircle className="h-6" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-6">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4 ">
            <h2 className="text-2xl font-semibold flex-grow mb-4">
              Number of guests
            </h2>
            <Icons.Users className="h-5 mb-4" />
            <input
              type="number"
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              min={1}
              defaultValue={2}
              className="w-12 pl-2 text-lg outline-none text-red-400 mb-4"
            />
          </div>
          <div className="flex">
            <button className="flex-grow text-gray-500" onClick={resetInput}>
              Cancel
            </button>
            <button onClick={setSearch} className="flex-grow text-red-400 ">
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
