import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Users, BarChart2 } from "lucide-react";
import logo from "@/public/logo.svg";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold flex items-center space-x-2 justify-center"
          >
            {/* <BarChart2 className="h-6 w-6" /> */}
            <Image src={logo} alt="logo" className="h-6 w-auto" />
            <span className="mt-2">Tradize</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" passHref>
              <Button className="text-white bg-gray-900 flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Button>
            </Link>
            <Link href="/user" passHref>
              <Button className="text-white bg-gray-900  flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Client Interface</span>
              </Button>
            </Link>
            <Link href="/admin" passHref>
              <Button className="text-white bg-gray-900 flex items-center space-x-2">
                <BarChart2 className="h-5 w-5" />
                <span>Settlement Interface</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
