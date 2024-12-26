import Image from "next/image";
import Link from "next/link";
import Icons from "@/components/icons";
import NavigationItems from "@/components/navigationItems";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-4 flex flex-col gap-4">
      {/* Left sidebar */}
      <div className="flex flex-col gap-3 md:gap-6">
        <div className="flex flex-row items-center gap-4">
          {/* Title */}
          <Link href="/">
            <h1 className="text-2xl md:text-3xl font-sans font-medium">Corban Villa</h1>
          </Link>
          {/* Social Media Icons */}
          <Icons className="ml-auto"/>
        </div>
        {/* NavBar */}
        <NavigationItems horizontal={true}/>
      </div>
      {/* Right content */}
      <div className="w-full h-px bg-gray-200 block" />
      <div className="flex flex-row justify-center gap-4 md:gap-8">
        <div>
          Table of Contents
        </div>
        <div className="w-px h-128 bg-gray-200" />
        <div className="md:w-[32rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
