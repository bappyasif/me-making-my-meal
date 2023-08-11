import { SiTypescript, SiTailwindcss, SiRedux, SiReact, SiFirebase, SiUnsplash, SiI18Next, SiMicrosofttranslator, SiReactrouter } from "react-icons/si"

// import headerBg from "../assets/header_bg.jpg"

export const Footer = () => {
  return (
    <div
      className="flex flex-col gap-y-8 items-center py-4"
      style={{
        backgroundImage: `url("https://source.unsplash.com/random/?Cooking,ingredients")`,
        objectFit: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        minHeight: "90px",
        backgroundColor: "rgba(17,17,17,0.6)",
        backgroundBlendMode: "darken"
      }}
    >
      <StackUsed />
      <CopyrightInfo />
    </div>
  )
}

const CopyrightInfo = () => {
  const getYear = new Date().getFullYear()

  return (
    <div>This food recipe app 4M is developed by <a className="nav-item text-slate-200 px-2 py-1 rounded-md" target="_blank" href="https://my-portfolio-green-nine.vercel.app/" title="portfolio link">a. b.</a> &copy; {getYear}</div>
  )
}

const StackUsed = () => {
  const stacksUsed = stackItems.map(item => <div key={item.name} className="flex gap-2 items-center text-xl"><span>{item.name}</span><span>{item.icon}</span></div>)
  return (
    <div className="flex flex-col gap-y-1">
      <h2 className="text-2xl">Stack Used</h2>
      <div className="flex gap-2 flex-wrap">{stacksUsed}</div>
    </div>
  )
}

const stackItems = [
  { name: "Typescript", icon: <SiTypescript /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Redux Toolkits", icon: <SiRedux /> },
  { name: "React", icon: <SiReact /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "Firestore", icon: <SiFirebase /> },
  { name: "Unsplash", icon: <SiUnsplash /> },
  { name: "React Icons", icon: <SiReact /> },
  { name: "I18n", icon: <SiI18Next /> },
  { name: "Microsoft Translation", icon: <SiMicrosofttranslator /> },
  { name: "React Router", icon: <SiReactrouter /> },
  { name: "React Share", icon: <SiReact /> },
]