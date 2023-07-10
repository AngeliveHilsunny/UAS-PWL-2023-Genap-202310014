import BottomTitle from "../../components/bottomTitle/BottomTitle";
import FormCreateAccommodations from "../../components/form/FormCreateAccommodations";
import Header from "../../components/header/Header";
import Menu from "../../components/menu/menu";
import TitleDashboard from "../../components/titleDashboard/TitleDashboard";
import './Dashboard.css'

export default function Dashboard () {
    return (
        <div className="bg-white pb-24">
            <Header />
            <TitleDashboard />
            <div className="m-12 mx-20 mb-24">
                <div className="pt-16 yx-28 bg-white rounded-3xl border  border-veryLightGray border-box font-abc">
                    <div>
                        <Menu />
                    </div>
                    <div className="mt-16 mx-24 grid justify-items-start font-abc">
                        {/* <FormCreateAccommodations /> */}
                    </div>
                </div>
            </div>
            <BottomTitle />
        </div>
    )
}