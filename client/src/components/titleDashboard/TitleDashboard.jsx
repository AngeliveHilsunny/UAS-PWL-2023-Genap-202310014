import Plane from '../../assets/plane.png'
import './TitleDashboard.css'

export default function TitleDashboard () {
    return (
        <div className="font-abc grid justify-items-center">
            <h1 className='text-darkBlue font-medium text-center title my-11'>Book an amazing experience</h1>
            <img src={Plane} alt="plane" className=''/>
        </div>
    )
}