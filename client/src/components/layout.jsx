import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";

export default function Layout () {
    return (
        <div className="">
            <LoginPage/>
            <Outlet/>
        </div>
    )
}