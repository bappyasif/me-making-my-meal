import headerBg from "../assets/header_bg.jpg"

export const HeaderImage = () => {
    return (
        // <img  src={headerBg} alt="Header background image of food items" />
        <div
            // className="absolute z-0 h-72 w-full rotate-180"
            className="absolute z-0 w-full"
            style={{
                backgroundImage: `url("${headerBg}")`,
                // backgroundImage: `url("${heroTwoBg}")`,
                // backgroundImage: `url("${appBg}")`,
                objectFit: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: "290px",
                backgroundColor: "rgba(17,17,17,0.6)",
                backgroundBlendMode: "darken"
            }}
        >

        </div>
    )
}

export const HeroTwoImage = () => {
    return (
        <div
            className="absolute z-0 h-72 w-full"
            style={{
                // backgroundImage: `url("${heroTwoBg}")`,
                objectFit: "fill",
                maxHeight: "290px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundColor: "rgba(17,17,17,0.6)",
                backgroundBlendMode: "darken"
            }}
        >

        </div>
    )
}

export const HeroThreeImage = () => {
    return (
        <div
            className="absolute top-72 z-0 h-72 w-full"
            style={{
                // backgroundImage: `url("${heroThreeBg}")`,
                objectFit: "fill",
                minHeight: "501px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundColor: "rgba(17,17,17,0.6)",
                backgroundBlendMode: "darken"
            }}
        >

        </div>
    )
}

export const AppBackgroundImage = () => {
    return (
        <div
            className="absolute top-72 z-0 h-full w-full"
            style={{
                // backgroundImage: `url("${appBg}")`,
                objectFit: "fill",
                // minHeight: "1100px",
                // minWidth: "450px",
                // width:"100vw",
                // height: "2240px",
                backgroundRepeat: "repeat-y",
                backgroundSize: "100% 100%",
                backgroundColor: "rgba(17,17,17,0.6)",
                backgroundBlendMode: "darken"
            }}
        >

        </div>
    )
}

export const HeroImage = () => {
    return (
        // <img  src={headerBg} alt="Header background image of food items" />
        <div
            className="absolute z-0 h-96 w-full"
            style={{
                // backgroundImage: `url("${heroBg}")`,
                objectFit: "cover",
                // maxHeight: "290px"
                minHeight: "510px",
                // backgroundImage: `url("https://source.unsplash.com/random/?Coding")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                // objectFit: "cover",
                backgroundColor: "rgba(17,17,17,0.6)",
                backgroundBlendMode: "darken"
            }}
        >

        </div>
    )
}
