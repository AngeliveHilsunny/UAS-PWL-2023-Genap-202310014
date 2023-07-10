import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Image from '../../components/form/Image';
import './RecommendedPage.css'

export default function RecommendedPage ({ searchQuery }) {
    const [places, setPlaces] = useState([]);
    const [isSaved, setIsSaved] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then(response => {
          setPlaces([...response.data, ...response.data, ...response.data, ...response.data]);
          setIsSaved(new Array(response.data.length).fill(false));
        });
      }, []);

    useEffect(() => {
        // Filter the places based on the searchQuery
        const filtered = places.filter(place => place.title.toLowerCase().includes(searchQuery?.toLowerCase()));
        setFilteredPlaces(filtered);
    }, [searchQuery, places]);

    const handleSaveClick = (index) => {
        const updatedIsSaved = [...isSaved];
        updatedIsSaved[index] = !updatedIsSaved[index];
        setIsSaved(updatedIsSaved);
    };

    const handlePageChange = (path) => {
        window.location.href = path;
    };

        return (
            <div>
                <div className="mt-16 w-full font-abc gap-4 grid items-stretch">
                    <div className="title">
                        <h1 className="text-blue font-semibold text-2xl">Recommended accommodations to stay</h1>
                        <p className="text-gray font-light text-sm mt-1 mb-14">Finest place for you to stay</p>
                    </div>
                </div>
                <div className=" grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
                    {(filteredPlaces.length > 0 ? filteredPlaces : places).map((place, index) => (
                    // <Link to={'/place/'+place._id}>
                        <div className="bg-veryWhite rounded-3xl p-5 hover:drop-shadow-2xl duration-300 cursor-pointer" onClick={() => handlePageChange(`/place/${place._id}`)}>
                            <div className="flex mb-1.5 justify-between">
                                <h3 className="text-sm text-gray-500 text-darkBlue text-sm font-medium h-10 line-clamp-2 w-11/12">{place.title}</h3>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill={isSaved[index] ? 'currentColor' : 'none'}
                                    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                    className={`w-5 h-5 text-blue save hover:mt-1 duration-300 ${isSaved[index] ? 'fill-current' : ''}`}
                                    onClick={() => handleSaveClick(index)}
                                    >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>
                                </svg>
                            </div>
                            <h2 className="text-gray font-light address h2 mb-5 line-clamp-2 h-8 overflow-hidden">{place.address}</h2>
                            <div className="flex">
                                <div className="text-yellow flex mb-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-veryLightGray">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex text-lightGray gap-1">
                                <h4 className=" text-xs mb-5 font-semibold">9.6</h4>
                                <p className="h4 font-light">(80 reviews)</p>
                            </div>
                            <div className="flex items-center mb-3 justify-between">
                                <h2 className="text-darkBlue h2">Average Temperature</h2>
                                <h3 className="text-blue text-sm font-medium">{place.temperature}</h3>
                            </div>
                            <div className="bg-gray-500 mb-2 rounded-2xl flex mb-5">
                                {place.photos?.[0] && (
                                <Image className="rounded-xl object-cover w-full h-32 " src={place.photos?.[0]} alt=""/>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-lightGray h4">Per-night</h4>
                                    <span className="font-medium text-blue text-sm">$ {place.price}</span>
                                </div>
                                <h4 className="text-darkBlue p-2 px-4 bg-veryLightGray rounded-full h4 cursor-pointer hover:border hover:border-blue hover:text-blue hover:bg-veryWhite duration-500">Explore</h4>
                            </div>
                        </div>
                    // </Link> 
                    ))} 
                </div>
            </div>
        )
    }