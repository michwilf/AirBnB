import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useRouter } from "next/router";
import InfoCard from "./components/InfoCard";
import dynamic from "next/dynamic";

const MapComponentClient = dynamic(
  () => import("./components/MapComponentClient"),
  { ssr: false }
);

const Search = ({ searchResults }) => {
  const router = useRouter();

  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = new Date(startDate).toLocaleDateString();

  const formattedEndDate = new Date(endDate).toLocaleDateString();

  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults?.map((item) => (
              <InfoCard key={item.img} {...item} />
            ))}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
        {typeof window !== "undefined" && (
          <MapComponentClient searchResults={searchResults} />
        )}
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;

export const getServerSideProps = async () => {
  const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
};
