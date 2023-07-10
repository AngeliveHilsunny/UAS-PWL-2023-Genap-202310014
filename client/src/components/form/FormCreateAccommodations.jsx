import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";


export default function FormCreateAccommodations () {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [temperature,setTemperature] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(5);
    const [price,setPrice] = useState(120);
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get('/place/'+id)
      .then(response => {
         const {data} = response;
         setTitle(data.title);
         setAddress(data.address);
         setTemperature(data.temperature)
         setAddedPhotos(data.photos);
         setDescription(data.description);
         setPerks(data.perks);
         setExtraInfo(data.extraInfo);
         setCheckIn(data.checkIn);
         setCheckOut(data.checkOut);
         setMaxGuests(data.maxGuests);
         setPrice(data.price);
      }
      );
    }, [id]);

    function inputHeader(text) {
      return (
        <h2 className="text-lg mt-7 text-darkBlue font-medium">{text}</h2>
      );
    }
    function inputDescription(text) {
      return (
        <p className="text-gray mt-1 text-sm font-light">{text}</p>
      );
    }
    function preInput(header,description) {
      return (
        <>
          {inputHeader(header)}
          {inputDescription(description)}
        </>
      );
    }
  
    async function savePlace(ev) {
      ev.preventDefault();
      const placeData = {
        title, address, temperature, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price,
      };
      if (id) {
        // update
        await axios.put('/places', {
          id, ...placeData
        });
        setRedirect(true);
      } else {
        // new place
        await axios.post('/places', placeData);
        setRedirect(true);
      }
    }
  
    if (redirect) {
      return <Navigate to={'/dashboard/places'} />
    }

    return (
        <div className="w-full font-abc">
            <div className="title">
                <h1 className="text-blue font-semibold text-2xl">Create accommodations</h1>
                <p className="text-gray font-light text-sm mt-1 mb-14">Make accommodations where others can feel the same happiness</p>
            </div>
            
            <form onSubmit={savePlace} >
                {preInput('Title', 'The title of your establishment should be brief and compelling in an advertisement')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="example: Dreamy peach ocean" 
                        className="text-sm bg-white font-light w-full rounded-full border border-veryLightGray py-2 px-5 mt-1"/>
                
                {preInput('Address', 'Location of this address')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}placeholder="example: Pink Beach Lombok, Sekaroh, Jerowaru, Kabupaten Lombok Timur, Nusa Tenggara Bar. 83672"
                        className="text-sm bg-white font-light w-full rounded-full border border-veryLightGray py-2 px-5 mt-1"/>

                {preInput('Average temperature', 'The average temperature at that location')}
                <input type="text" value={temperature} onChange={ev => setTemperature(ev.target.value)}placeholder="+ 27 °C"
                    className="text-sm bg-white font-light w-full rounded-full border border-veryLightGray py-2 px-5 mt-1"/>
                
                {preInput('Photos','More is better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                
                {preInput('Description','Describe this location')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} 
                        className="text-sm bg-white font-light w-full rounded-2xl border border-veryLightGray py-2 px-5 mt-1"/>
                
                {preInput('Perks','Choose your location-related perks')}
                <div className="grid mt-2 gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                
                {preInput('Extra info','Rules, extra price, etc')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} 
                        className="text-sm bg-white font-light w-full rounded-2xl border border-veryLightGray py-2 px-5 mt-1"/>
                
                {preInput('Check in and check out','Add check in and out times, remember to have some time window for cleaning the room between guests')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                <div>
                    <h3 className="mt-2 -mb-1 mb-0 text-xs text-darkBlue">Check in time</h3>
                    <input type="text"
                        value={checkIn}
                        onChange={ev => setCheckIn(ev.target.value)}
                        placeholder="30"
                        className="text-sm bg-white font-light w-full rounded-full border border-veryLightGray py-2 px-5 mt-1"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1 mb-0 text-xs text-darkBlue">Check out time</h3>
                    <input type="text"
                        value={checkOut}
                        onChange={ev => setCheckOut(ev.target.value)}
                        placeholder="08" 
                        className="text-sm bg-white font-light w-full rounded-full border border-veryLightGray py-2 px-5 mt-1"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1 mb-0 text-xs text-darkBlue">Max number of guests</h3>
                    <input type="number" value={maxGuests}
                        onChange={ev => setMaxGuests(ev.target.value)}
                        className="text-sm bg-white font-light w-full rounded-full border border-veryLightGray py-2 px-5 mt-1"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1 mb-0 text-xs text-darkBlue">Price per night</h3>
                    <input type="number" value={price}
                        onChange={ev => setPrice(ev.target.value)}
                        className="text-sm bg-white font-light w-full rounded-full border border-veryLightGray py-2 px-5 mt-1"/>
                </div>
                </div>
                <button className="bg-blue rounded-full py-3 w-full my-4 text-white font-medium text-lg mt-16">Publish</button>
            </form>
        </div>
    )
}