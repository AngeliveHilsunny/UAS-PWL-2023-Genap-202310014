import { useContext, useState } from 'react';
import Profile from '../../assets/98.png';
import './Header.css';
import { UserContext } from '../../UserContext';

export default function Header () {
    const {user} = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProfileClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
      };

    const handleLogout = () => {
        window.location.href = '/login';
    };

    return (
        <div className='bg-white border-b border-veryLightGray'>
            <header className='p-4 mx-6 flex font-abc items-center justify-between'>
                <a href="" className='logo text-blue font-semibold'>AirLub</a>
                <div className=' items-center flex gap-4'>
                    <div className='search flex items-center rounded-full p-1 bg-white'>
                        <div className='text-search text-gray mr-6 ml-3'>Search any destination...</div>
                        <button className='bg-blue p-2 rounded-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffff" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="darkBlue" className="w-4 h-4">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    {!!user && (
                        <p className='text-darkBlue font-medium text-sm'>{user.username}</p>
                    )}
                    <div className='relative'>
                        <img
                            src={Profile}
                            alt='profile'
                            className='w-9 cursor-pointer'
                            onClick={handleProfileClick}
                        />
                        {isModalOpen && (
                            <div className='absolute right-0 mt-2 py-1.5 px-2 bg-veryWhite rounded-full shadow-lg'>
                                <div className="flex gap-2">
                                    <button
                                        className='text-rose-500 hover:mr-1 duration-700'
                                        onClick={handleCloseModal}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <button
                                        className='text-sm rounded-full text-rose-950 hover:bg-rose-500 hover:text-veryWhite hover:px-2 hover:py-1 duration-500'
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    )
}