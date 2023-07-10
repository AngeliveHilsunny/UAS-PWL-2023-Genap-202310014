import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [redirect, setRedirect] = useState('');
    const [totalPrice, setTotalPrice] = useState(0); 

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    useEffect(() => {
        // Update total harga saat ada perubahan jumlah hari atau jumlah tamu
        setTotalPrice(numberOfNights * place.price * numberOfGuests);
    }, [numberOfNights, numberOfGuests, place.price]);

    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests,
            place: place._id,
            price: numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/dashboard/bookings/`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    const today = new Date().toISOString().split("T")[0]; // Mendapatkan tanggal hari ini

    return (
        <div className="bg-veryWhite drop-shadow-xl rounded-2xl w-96 p-10 ">
            <div className="text-sm font-medium text-lightGray flex items-center justify-between">
                Price /per night:
                <div className="text-blue text-2xl">$ {place.price} </div>
            </div>
            <div className=" mt-4 text-xs">
                <div className="flex border-t text-veryLightGray gap-2">
                    <div className="mt-10 text-center">
                        <label className="text-blue ">CHECK-lN</label>
                        <input type="date"
                            className="mt-2 text-xs text-darkBlue py-3 px-4 border border-veryLightGray rounded-full"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} 
                            min={today} // Mengatur tanggal minimum menjadi hari ini
                        />
                    </div>
                    <div className="mt-10 text-center">
                        <label className="text-blue">CHECK-OUT</label>
                        <input type="date"  
                            className="mt-2 text-xs text-darkBlue py-3 px-4 border border-veryLightGray rounded-full"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} 
                            min={checkIn || today} // Mengatur tanggal minimum menjadi tanggal check-in atau hari ini
                            />
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <label className="text-blue">GUEST</label>
                    <input type="number"
                        className="mt-2 w-full text-xs text-darkBlue py-3 px-4 border border-veryLightGray rounded-full"
                        value={numberOfGuests}
                        onChange={ev => setNumberOfGuests(ev.target.value)} />
                </div>
            </div>
            <div className="border-t text-veryLightGray mt-10">
                {numberOfNights > 0 && (
                    <div className="flex justify-between font-medium mt-4 text-blue">
                        Total price
                        <span> ${totalPrice}</span>
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary text-sm mt-10 hover:border hover:text-blue hover:bg-veryWhite duration-500">
                Book
            </button>
        </div>
    );
}