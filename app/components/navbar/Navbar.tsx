'use client';
import { SafeUser } from "@/app/types";
import { User } from "@prisma/client";
import Container from "../Container"
import Categories from "./Categories";
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"

interface NavbarProps {
  currentUser?:SafeUser | null;
}

const Navbar:React.FC<NavbarProps> = ({currentUser}) => {
  return (
    <div className="fixed w-full bg-white shadow-sm z-10">
        <div className="py-4 border-b-[1px]">

        <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                <Logo/>
                <Search/>
                <UserMenu currentUser={currentUser}/>
            </div>
        </Container>
        <Categories/>

        </div>
    </div>
  )
}

export default Navbar
