import './RegisterPage.css'
import Background from '../../assets/bgregister.png'
import { Link, Navigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const RegisterPage = () => {
    const [username,setusername] = useState('');
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const {setUser} = useContext(UserContext);

    async function registerUser(ev) {
        ev.preventDefault();
        try {
        const {data} = await axios.post('/register', {
            username,
            email,
            password,
        });
        setUser(data);
        alert('Registration successful. Now you can log in');
        setRedirect(true);
        } catch (e) {
        alert('Registration failed. Please try again later');
        }
    }
    if (redirect) {
        return <Navigate to={'/dashboard'} />
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="bg-white font-abc grow flex content-center h-screen items-center relative">
            <div className="ml-28">
                <a href="" className='logo text-blue font-semibold'>AirLub</a>
                <div className="my-8">
                    <p className="text-lightGray text-sm">W E L C O M E</p>
                    <h2 className="text-darkBlue font-bold my-4 title">Create new account</h2>
                    <div className="text-lightGray text-sm">
                        Already have an account?
                        <Link to={'/login'} className='logo text-blue font-normal text-sm'> Log in</Link></div>
                </div>
                <form onSubmit={registerUser}>
                    <label className="block w-72">
                        <span className="after:content-[''] after:ml-0.5 after:text-red-500 block text-sm font-normal text-gray">
                            Username
                        </span>
                        <input 
                            type="text" 
                            name="username" 
                            className=" rounded-2xl mt-2 px-6 py-4 bg-lightBlueGray shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full text-vsm focus:ring-1 placeholder-darkBlue placeholder-opacity-25" 
                            placeholder="your@example.com" 
                            value={username} 
                            onChange={ev => setusername(ev.target.value)}
                        />
                    </label>
                    <label className="block mt-4 w-72">
                        <span className="after:content-[''] after:ml-0.5 after:text-red-500 block text-sm font-normal text-gray">
                            Email
                        </span>
                        <input 
                            type="email" 
                            name="email" 
                            className=" rounded-2xl mt-2 px-6 py-4 bg-lightBlueGray shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full text-vsm focus:ring-1 placeholder-darkBlue placeholder-opacity-25" 
                            placeholder="your@example.com" 
                            value={email} 
                            onChange={ev => setemail(ev.target.value)}
                        />
                    </label>
                    <label className="block mt-4 w-72">
                        <span className="after:content-[''] after:ml-0.5 after:text-red-500 block text-sm font-normal text-gray">
                        Password
                        </span>
                        <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} // Menggunakan tipe "text" atau "password" tergantung dari state showPassword
                            name="password"
                            className=" rounded-2xl mt-2 px-6 py-4 bg-lightBlueGray shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full text-vsm focus:ring-1 placeholder-darkBlue placeholder-opacity-25"
                            placeholder="your password"
                            value={password}
                            onChange={ev => setpassword(ev.target.value)}
                        />
                        <span
                            className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Ikon mata yang dapat menutup dan membuka password */}
                        </span>
                        </div>
                    </label>
                    <button className='mt-8 bg-blue text-white p-4 px-8 rounded-full text-vsm hover:px-9 duration-500'>Create account</button>
                </form>
            </div>
            <img src={Background} alt="profile" className='h-screen right-0 absolute' />
        </div>
    )
}
 export default RegisterPage;