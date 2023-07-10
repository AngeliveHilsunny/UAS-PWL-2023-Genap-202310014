import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FormCreateAccommodations from "./FormCreateAccommodations";
import ImageFromData from "./ImageFromData";

export default function SubMenuAccommodation() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get("/user-places").then(({ data }) => {
        setPlaces(data);
        });
    }, []);
    
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(true);
    };

    const handleBack = () => {
        setShowForm(false);
    };

    return (
        <div>
        <div className="form-data mt-16 mb-14 gap-4 grid items-stretch">
            {places.length > 0 &&
            places.map((place) => (
                <Link
                to={"/dashboard/places/" + place._id}
                className="flex cursor-pointer gap-8 p-6 rounded-3xl border border-veryLightGray hover:border-blue duration-300"
                >
                <div className="flex w-32 h-32 bg-gray grow shrink-0 rounded-2xl self-center">
                    <ImageFromData place={place} />
                </div>
                <div className="grow-0 shrink self-center">
                    <div className="flex justify-between ">
                        <h2 className="text-lg font-medium text-blue">{place.title}</h2>
                        <h1 className="ml-6 text-blue font-semibold text-lg">$ {place.price}</h1>
                    </div>
                    <p className="text-sm font-normal text-darkBlue">{place.address}</p>
                    <p className="text-sm mt-2 font-light text-gray">{place.description}</p>
                </div>
                </Link>
            ))}
        </div>
        <div className="font-abc">
            <div className="text-center text-sm">
            {!showForm ? (
                <button
                className="inline-flex gap-1 text-center bg-blue text-white py-3 px-5 rounded-full hover:drop-shadow-lg hover:px-6 duration-300"
                onClick={handleClick}
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                    />
                </svg>
                Create new accommodation
                </button>
            ) : (
                <div className="text-left font-light text-xs">
                    <button
                        className="inline-flex gap-2 text-blue py-2 px-4 rounded-full items-center border border-blue mb-6 hover:bg-blue hover:text-white duration-500"
                        onClick={handleBack}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Back
                    </button>
                    <FormCreateAccommodations />
                </div>
            )}
            </div>
        </div>
        </div>
    );
}
