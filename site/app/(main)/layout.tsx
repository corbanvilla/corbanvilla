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
    <div className="m-4 md:mt-32 flex flex-col md:flex-row justify-center gap-4 md:gap-8">
      {/* Left sidebar */}
      <div className="flex flex-col gap-3 md:gap-6">
        <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6 md:-mb-2">
          {/* Image */}
          <Link href="/">
            <div className="w-12 h-12 md:w-64 md:h-64 relative">
              <Image src="/corban.jpg" fill alt="Corban" />
            </div>
          </Link>
          {/* Title */}
          <Link href="/">
            <h1 className="text-2xl md:text-3xl font-sans font-medium">Corban Villa</h1>
          </Link>
          {/* Social Media Icons */}
          <Icons className="md:hidden flex-auto"/>
        </div>
        {/* NavBar */}
        <NavigationItems />

        {/* Icons */}
        <Icons className="hidden md:block"/>
      </div>
      {/* Single Pixel Line */}
      <div className="w-px h-128 bg-gray-200 hidden md:block" />
      <div className="w-full h-px bg-gray-200 block md:hidden" />
      {/* Right content */}
      <div className="md:w-[32rem]">
        {children}
      </div>
    </div>
  );
}
