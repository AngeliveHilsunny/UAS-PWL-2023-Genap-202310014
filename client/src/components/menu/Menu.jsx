import { Link, useLocation, useParams } from "react-router-dom";
import FormCreateAccommodations from "../form/FormCreateAccommodations";
import SubMenuAccommodation from "../form/SubMenuAccommodation";
import RecommendedPage from "../../pages/recommended/RecommendedPage";
import { useState, useEffect } from "react";
import BookingsPage from "../../pages/bookings/BookingsPage";

export default function Menu() {
  const { pathname } = useLocation();
  const [subpage, setSubpage] = useState(pathname.split("/")?.[2] || "dashboard");

  useEffect(() => {
    if (pathname === "/dashboard") {
      setSubpage("recommended");
    }
  }, [pathname]);

  function linkClasses(type = null) {
    let classes = "py-3 px-5 rounded-full delay-100";
    if (type === subpage.toString()) {
      classes += " bg-blue text-white";
    } else {
      classes += " bg-white text-gray hover:bg-blue hover:bg-opacity-5 duration-300 hover:text-blue";
    }
    return classes;
  }

  return (
    <div>
        <div className="grid justify-items-center">
            <div className="p-1 flex gap-4 text-sm bg-white rounded-full border border-veryLightGray">
                <Link
                  className={linkClasses("recommended")}
                  to={"/dashboard"}
                  onClick={() => setSubpage("recommended")}
                >
                  Recommended accommodation
                </Link>
                <Link
                  className={linkClasses("bookings")}
                  to={"/dashboard/bookings"}
                  onClick={() => setSubpage("bookings")}
                >
                  My bookings
                </Link>
                <Link
                  className={linkClasses("places")}
                  to={"/dashboard/places"}
                  onClick={() => setSubpage("places")}
                >
                  My accommodations
                </Link>
            </div>
        </div>
        <div className="grid justify-items-start mx-24">
          {subpage === "places" && <SubMenuAccommodation />}
          {subpage === "bookings" && <BookingsPage />}
          {subpage === "recommended" && <RecommendedPage />}
        </div>
    </div>
  );
}
