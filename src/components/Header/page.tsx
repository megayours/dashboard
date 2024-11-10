"use client"

import { ConnectKitButton } from "connectkit";
import Link from "next/link";

const Header = () => {
    return <div className="flex justify-between items-center p-4">
        <Link href="/interactive" className="text-md font-thin">Demo</Link>
        <h1 className="text-3xl"><Link href="/">Dashboard</Link></h1>
        <ConnectKitButton />
    </div>
}

export default Header;