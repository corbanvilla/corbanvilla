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
                        <li>
                            <Link className="text-xl" href="#portfolio">portfolio</Link>
                        </li>
                        <li>
                            <Link className="text-xl" href="#about">about</Link>
                        </li>
                        <li>
                            <Link className="text-xl" href="#contact">contact</Link>
                        </li>
                        {/* <li className="text-xl">blog</li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}