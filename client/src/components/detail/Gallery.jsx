import {useState} from "react";
import Image from "../form/Image";

export default function Gallery({place, setShowBookingWidget}) {

  const [showAllPhotos,setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 text-darkBlue min-h-screen">
        <div className="bg-white px-24 grid gap-4">
        <nav className="flex justify-between items-center bg-white fixed inset-x-0 top-0s py-5">
            <button
                onClick={() => {
                  setShowAllPhotos(false);
                  setShowBookingWidget(true); 
                }}
                className="ml-24 flex gap-2 rounded-full text-sm font-medium bg-white text-blue hover:gap-3 duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 hover:w-6 duration-300">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd"
                />
              </svg>
              Close
            </button>
            <h2 className="text-xs mr-24 font-light">Photos of {place.title}</h2>
          </nav>
          {place?.photos?.length > 0 && place.photos.map(photo => (
            <div className="aspect-auto mt-10">
              <Image src={photo} alt=""/>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden ">
        <div>
          {place.photos?.[0] && (
            <div>
              <Image onClick={() => setShowAllPhotos(true)} className="aspect-auto cursor-pointer object-cover w-full" src={place.photos[0]} alt=""/>
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <Image onClick={() => setShowAllPhotos(true)} className="aspect-auto cursor-pointer object-cover w-full" src={place.photos[1]} alt=""/>
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <Image onClick={() => setShowAllPhotos(true)} className="aspect-auto cursor-pointer object-cover relative top-2 w-full" src={place.photos[2]} alt=""/>
            )}
          </div>
        </div>
        </div>
        {!showAllPhotos && (
          <button onClick={() => {
            setShowAllPhotos(true);
            setShowBookingWidget(false); // Tambahkan ini untuk menyembunyikan BookingWidget
          }}
           className="flex gap-1 absolute bottom-4 right-4 py-2 px-4 bg-white rounded-full shadow shadow-md text-sm text-blue shadow-gray-500 items-center hover:bg-blue hover:text-white duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
              </svg>
              Show more photos
          </button>
        )}
    </div>
  );
}