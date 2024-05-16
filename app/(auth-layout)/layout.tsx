import Image from "next/image";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

//min-h-[calc(100vh_-_128px)]
//h-fit xl:min-h-[calc(100vh_-_130px)] xl:min-h-fit bg-red-500
// bg-gradient-to-b from-blue-from via-blue-via to-blue-to rounded-bl-[100px]
//bg-[url('./Rectangle 463.png')]
//style={{background-image: url('./Rectangle 463.png')}}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  // height: 100vh,
  return (
    <div
      className="  flex flex-row min-h-screen bg-no-repeat bg-right-top bg-contain "
      style={{
        backgroundImage: `url('/Rectangle 463.png')`,
      }}
    >
      <div className="w-full md:w-2/3 min-h-screen flex items-center justify-center">
        {children}
      </div>
      <div
        className="hidden md:flex flex-col items-center justify-start pt-20 w-1/3 
   "
      >
        {/*  <Image fill className="object-cover" alt="Image" src={value} /> */}
        <div className="flex flex-col items-center justify-center bg-white rounded-full p-10">
          <Image
            src={"/Image.png"}
            alt="Logo"
            width={250}
            height={250}
            /* fill */
            className=" object-contain  border-0" /* aspect-square */
          />
        </div>
        <div className=" text-white font-bold text-[64px]">Neurolide</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;

/* const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  // height: 100vh,
  return (
    <div
      className=" with-auth-bg flex flex-row min-h-screen bg-no-repeat bg-right-top bg-contain "
      style={{
        backgroundImage: `url('/Rectangle 463.png')`,
      }}
    >
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center">
        {children}
      </div>
      <div
        className="hidden md:flex flex-col items-center justify-center w-1/2 
   "
      >
        
        <Image
          src={"/photo_2024-03-26_14-23-49-Photoroom 2.png"}
          alt="Logo"
          width={300}
          height={247}
          
          className=" object-contain  border-0" 
        />
        <div className=" text-white font-bold text-[64px]">Analytix</div>
      </div>
    </div>
  );
}; */
