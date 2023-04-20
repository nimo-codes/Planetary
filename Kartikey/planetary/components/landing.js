import Image from "next/image";
import stars from "../public/stars.jpg";
import cosmic from "../public/cosmic.gif"

export default function Landing() {
  return (
    <div className="bg-[url('../public/stars.jpg')] h-full pt-5 w-full relative bg-contain">
      <h1 className="text-white mx-2 z-20 w-full xl:mx-10 xl:text-7xl text-2xl font-semibold font-Lato">
        {" "}
        Welcome to our space exploration website!
      </h1>
      <div className="flex ">
        <h2 className="text-white mx-2 mt-4 z-20 xl:mx-10 xl:mt-8  xl:w-[900px] xl:text-5xl text-xl font-Lato ">
          We are excited to offer you an immersive and educational experience
          that allows you to explore the wonders of space from the comfort of
          your own device.{" "}
        </h2>
        <model-viewer
          disable-zoom
          camera-controls
          auto-rotate
          src="/Planets.glb"
        ></model-viewer>
      </div>
      <h2 className="text-white z-20 mx-2 mt-4 xl:mx-10 xl:mt-8  xl:w-[900px] xl:text-5xl text-xl font-Lato ">
        We offer <b>four unique features </b> that will take you on a journey
        through the cosmos like never before.
      </h2>
      
      <div className="mt-96 bg-[url('../public/stars.jpg')] bg-cover flex">
        <div className="flex flex-col">
      <h1 className="text-white  mx-2 z-20 w-full xl:mx-10 xl:text-7xl text-2xl font-semibold font-Lato">
        {" "}
        Cosmic Incarnation
      </h1>
      <h2 className="text-white mx-2 mt-4 z-20 xl:mx-10 xl:mt-8  xl:w-[900px] xl:text-5xl text-xl font-Lato ">
      This feature is designed to offer users a unique experience by showcasing images of astronomical events and objects that occurred on the day of their birth.<br/> 
        </h2>
        <h2 className="text-white mx-2 mt-4 z-20 xl:mx-10 xl:mt-8  xl:w-[900px] xl:text-5xl text-xl font-Lato ">With the vast and breathtaking imagery available through NASA's API, users can explore the wonders of the universe and appreciate the marvels of space in a whole new way.{" "}</h2>
        <h2 className="text-white mx-2 mt-4 z-20 xl:mx-10 xl:mt-8  xl:w-[900px] xl:text-5xl text-xl font-Lato "> So, buckle up and get ready to embark on a cosmic journey through time and space with our exciting feature!</h2>
        </div>
        <div className="flex flex-col justify-evenly ml-10">
            <Image className="rounded-3xl" src={cosmic}></Image>
            <button className="text-white hover:scale-105 self-center px-5 py-2 rounded-full xl:text-4xl border-2 xl:mr-96">Check it Out!</button>
        </div>
      </div>
    </div>
  );
}
