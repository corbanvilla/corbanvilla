import Link from 'next/link';

export default function Nav() {

    return (
        <nav className="bg-white w-full flex items-center justify-center drop-shadow-sm z-10">
            <div className="flex flex-row items-center justify-between p-4 container">
                <Link href="/">
                    <h1 className="text-2xl font-extralight">Corban Villa</h1>
                </Link>
                <div>
                    <ul className="flex flex-row gap-6 font-extralight">
                        <Link href="#portfolio">
                            <li className="text-xl">portfolio</li>
                        </Link>
                        <Link href="#about">
                            <li className="text-xl">about</li>
                        </Link>
                        <Link href="#contact">
                            <li className="text-xl">contact</li>
                        </Link>
                        {/* <li className="text-xl">blog</li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}