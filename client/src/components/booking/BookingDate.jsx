import {differenceInCalendarDays, format} from "date-fns";

export default function BookingDate({booking}) {
  return (
    <div className={"flex gap-2 items-center mt-4 mb-4"}>
        <div className="flex gap-2 font-normal border-r text-lightGray">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
            <p className="text-darkBlue mr-4">{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights</p>
        </div>  
        <div className="flex gap-2 items-center ml-2">
            <p className="text-blue">Check in:</p>
            {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
        </div>
        <p className="text-darkBlue">&rarr;</p>
        <div className="flex gap-2 items-center">
            <p className="text-blue">Check out:</p>
            {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
        </div>
    </div>
  );
}