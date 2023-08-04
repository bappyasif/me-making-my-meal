import headerBg from "../assets/header_bg.jpg"
import heroBg from "../assets/hero_bg.png"

export const HeaderImage = () => {
    return (
        // <img  src={headerBg} alt="Header background image of food items" />
        <div
            className="absolute z-0 h-72 w-full rotate-180"
            style={{
                backgroundImage: `url("${headerBg}")`,
                objectFit: "cover",
                maxHeight: "290px"
            }}
        >

        </div>
    )
}

export const HeroImage = () => {
    return (
        // <img  src={headerBg} alt="Header background image of food items" />
        <div
            className="absolute z-0 h-96 w-full rotate-180"
            style={{
                backgroundImage: `url("${heroBg}")`,
                objectFit: "cover",
                // maxHeight: "290px"
            }}
        >

        </div>
    )
}
