import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

import CorbanPhoto from '../public/corban.jpg'
import GitHubIcon from '../public/social/github.svg'
import LinkedInIcon from '../public/social/linkedin.svg'
import TwitterIcon from '../public/social/twitter.svg'
import MailIcon from '../public/social/mail.svg'
import Links from '../data/links'

// https://github.com/vasturiano/react-force-graph/issues/155
const DynamicForceGraph = dynamic(() => import('./ForceGraph'), { ssr: false });

export const metadata: Metadata = {
    metadataBase: new URL('https://corbanvilla.com/'),
    title: 'Corban Villa',
    description: 'Corban Villa\'s personal website',
    robots: '*',
    openGraph: {
        images: '/corban.jpg',
    }
}

const Landing = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[70vh] gap-7">
            <p className="text-7xl font-thin">
                <span className="opacity-0 animate-fade-in-150">Hello World,</span>
                <span className="opacity-0 animate-fade-in-500">👋 I&apos;m</span>
            </p>
            <p className="text-8xl font-extralight opacity-0 animate-fade-in-1000">
                Corban Villa
            </p>
        </div>
    )
}

const Work = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-7">
            <DynamicForceGraph/>
        </div>
    )
}

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "My first post",
            image: "/next.svg",
            slug: "my-first-post",
            teaser: "This is my first post"
        },
        {
            id: 2,
            title: "My second post",
            image: "/next.svg",
            slug: "my-second-post",
            teaser: "This is my second post"
        },
        {
            id: 3,
            title: "My third post",
            image: "/next.svg",
            slug: "my-third-post",
            teaser: "This is my third post"
        },
    ];

    return (
        <div className="flex flex-row items-center justify-center w-full h-[70vh] gap-14">
        
            {
                posts.map((post) => {
                    return (
                        <div key={post.id} className="flex flex-col bg-gray-300">
                            <Link href={`/blog/${post.slug}`}>
                                <div className="relative w-64 h-64">
                                    <Image
                                        src={post.image}
                                        alt="Picture of the author"
                                        fill
                                    />
                                </div>
                                <h3>
                                    {post.title}
                                </h3>
                                <p>
                                    {post.teaser}
                                </p>
                            </Link>
                        </div>
                    )
                })
            }

        </div>
    )
}

const About = () => {
    return (
        <div className="flex flex-row items-center justify-center w-full gap-7 px-10 py-32">
            <div className="relative w-64 h-64">
                <Image
                    src={CorbanPhoto}
                    alt="Picture of Corban"
                    fill
                    className='object-contain'
                />
            </div>
            <div className="flex flex-col w-1/2">
                <p className="text-5xl font-extralight">
                    About me
                </p>
                <p className="font-extralight">
                    Corban is currently an undergraduate at NYU Abu Dhabi. He studies Computer Science and contributes to research in the Center for Cyber Security and MoMA lab.
                </p>
            </div>
        </div>
    )
}

const Contact = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-10 py-40">
            <p className="text-5xl font-extralight">
                Reach out
            </p>
            <div className="grid grid-cols-2 grid-rows-2 gap-10">
                <div className="relative h-32 w-32 ease-out duration-300 hover:scale-110 hover:cursor-pointer">
                    <Link href={Links.email}>
                        <Image
                            src={MailIcon}
                            alt="Mail Icon"
                            fill
                        />
                    </Link>
                </div>
                <div className="relative h-32 w-32 ease-out duration-300 hover:scale-110 hover:cursor-pointer">
                    <Link href={Links.github}>
                        <Image
                            src={GitHubIcon}
                            alt="GitHub"
                            fill
                        />
                    </Link>
                </div>
                <div className="relative h-32 w-32 ease-out duration-300 hover:scale-110 hover:cursor-pointer">
                    <Link href={Links.linkedin}>
                        <Image
                            src={LinkedInIcon}
                            alt="LinkedIn"
                            fill
                        />
                    </Link>
                </div>
                <div className="relative h-32 w-32 ease-out duration-300 hover:scale-110 hover:cursor-pointer">
                    <Link href={Links.twitter}>
                        <Image
                            src={TwitterIcon}
                            alt="Twitter"
                            fill
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

const Divider = ({ title }: { title: string }) => {
    return (
        <div id={title} className="items-start justify-start flex">
            <div className="flex flex-col">
                <p className="px-4 text-lg font-extralight">{title}</p>
                <div className="h-[0.5px] underline bg-black"/>
            </div>
        </div>
    )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 bg-repeat" style={{ backgroundImage: "url('/site-bg.svg')", backgroundSize: "40px 40px" }}>
        <div className="container">
            <Landing/>
            <Divider title="portfolio"/>
            <Work/>
            {/* <Divider title="my blog..."/>
            <Blog/> */}
            <Divider title="about"/>
            <About/>
            <Divider title="contact"/>
            <Contact/>
        </div>
    </main>
  )
}
