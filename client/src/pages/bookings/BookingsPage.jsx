import {useEffect, useState} from "react";
import axios from "axios";
import {differenceInCalendarDays, format} from "date-fns";
import {Link} from "react-router-dom";
// import BookingDates from "../BookingDates";
import ImagePlace from "../../components/form/ImagePlace";
import BookingDate from "../../components/booking/BookingDate";

export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div className="mt-10  w-full">
      <div className="title text-center w-full">
          <h1 className="text-blue font-semibold text-2xl">Your booking list</h1>
          <p className="text-gray font-light text-sm mt-1 mb-10">Thank you for booking, make sure to come according to schedule. Happy holidays!</p>
      </div>
      <div className="gap-3 grid items-stretch">
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className="flex cursor-pointer gap-4 p-3 rounded-3xl border border-veryLightGray hover:border-blue duration-300">
            <div className="flex w-0 h-36 bg-gray grow shrink-0 rounded-2xl self-center">
              <ImagePlace place={booking.place} />
            </div>
            <div className="grow self-center">
              <h2 className="text-lg font-medium text-darkBlue line-clamp-1">{booking.place.title}</h2>
              <p className="text-sm font-light text-gray">{booking.place.address}</p>
              <div className="text-xs font-light text-gray">
                <BookingDate booking={booking} className="mb-2 mt-4 text-gray-500" />
                <div>
                    <h4 className="text-lightGray h4 font-normal">Total price</h4>
                    <span className="font-medium text-blue text-base">$ {booking.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}