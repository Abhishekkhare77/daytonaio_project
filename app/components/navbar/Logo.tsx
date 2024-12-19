'use client';
import Image from "next/image";
import {useRouter} from 'next/navigation'
const Logo = () => {
    const router = useRouter();
    return (
        <Image onClick={()=>router.push('/')} alt="logo" className="hidden md:block cursor-pointer" height={150} width={150} src="/images/logo.png"/>
    )
}

export default Logo