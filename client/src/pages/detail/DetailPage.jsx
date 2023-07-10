import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LinkAddress from "../../components/detail/LinkAddress";
import Gallery from "../../components/detail/Gallery";
import BookingWidget from "../../components/booking/BookingWidget";
import Header from "../../components/header/Header";

export default function DetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showBookingWidget, setShowBookingWidget] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/place/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  const handleShowMorePhotos = () => {
    setShowBookingWidget(false);
  };

  if (!place) return "";

  return (
    <div className="bg-white pb-2 font-abc">
      <Header />
      <div className="my-8 mx-20 mb-2">
        <Link
          to="/dashboard"
          className="px-9 inline-flex gap-2 text-blue items-center text-left font-medium text-sm hover:gap-3 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="w-5 h-5 hover:w-6 duration-300"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </Link>
        <div className="px-8 pt-6">
          <Gallery place={place} setShowBookingWidget={setShowBookingWidget} />
        </div>
        <div className="mt-10 mb-8 px-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div className="">
            <h1 className="text-2xl font-medium text-darkBlue">{place.title}</h1>
            <LinkAddress>{place.address}</LinkAddress>
            <div className="my-6 mt-8 border-t text-veryLightGray">
              <h2 className="font-medium text-xl text-blue mb-2 mt-6">Description</h2>
              <p className="text-sm font-light text-gray">{place.description}</p>
            </div>
            <div className="border-t text-veryLightGray">
              <h2 className="font-medium text-xl text-blue mb-2 mt-6">Availability</h2>
              <div className="flex gap-4">
                <div className="text-gray text-xs">
                  Check in
                  <h4 className="text-blue mt-1 font-medium text-base">{place.checkIn}</h4>
                </div>
                <div className="border-x px-4 text-veryLightGray">
                  <div className="text-gray text-xs ">
                    Check out
                    <h4 className="text-blue mt-1 font-medium text-base">{place.checkOut}</h4>
                  </div>
                </div>
                <div className="text-gray text-xs">
                  Max number of guests
                  <h4 className="text-blue mt-1 font-medium text-base">{place.maxGuests}</h4>
                </div>
              </div>
            </div>
          </div>
          {showBookingWidget && <BookingWidget place={place} />}
        </div>
        <div className="bg-white my-8 mx-8 mt-10 border-t text-lightGray">
          <div>
            <h2 className="font-medium text-xl text-blue mb-2 mt-6">Extra info</h2>
          </div>
          <div className="mb-4 text-sm text-gray font-light leading-5">{place.extraInfo}</div>
        </div>
      </div>
    </div>
  );
}
