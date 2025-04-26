"use client"
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Input } from '../ui/input';
import { Avatar, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  
    useEffect(() => {
      const userObject = Cookies?.get("user");
  
      if (userObject) {
        try {
          const jsonStr = decodeURIComponent(userObject);
          const dataJson = JSON.parse(jsonStr);
          setUserData(dataJson);
        } catch (error) {
          console.error("Failed to parse user cookie:", error);
        }
      }
    }, []);
    

    const handleLogout = () => {
      // Remove the authToken cookie
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("user");
      
      // Redirect to the login page
      router.push("/login"); // Adjust the login URL as needed
    };
  
  





      const orgName = Cookies?.get("organisationName");
    //  let data = ""
      // console.log("data", data);
  return (
    <header className="bg-gray-100/40 shadow p-[10px] flex items-center justify-between">
    {/* Left: Org Name + Role */}
    <div className="flex  items-center gap-4 ">
    <span className="text-lg font-semibold">
  {(orgName || userData?.organisation || '').toUpperCase()}
</span>
      <span className="text-sm text-muted-foreground">{ userData?.displayName}</span>
    </div>

    {/* Middle: Search Bar */}
    <div className="flex-1 px-6 max-w-md">
      <Input type="text" placeholder="Search..." className="w-full" />
    </div>

    {/* Right: Avatar */}
    <DropdownMenu >
      <DropdownMenuTrigger  asChild>
      <Button variant={"ghost"}>
        <Avatar className="cursor-pointer">
          <AvatarImage src={ "/download.png"} alt="hello" />
          </Avatar>
       
         { userData?.email}
        
        
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent   align="end" className='w-[200px]'>
        <DropdownMenuLabel>
          <div className="text-sm font-medium">
            { userData?.firstName}
            { userData?.lastName}</div>
          <div className="text-xs text-muted-foreground">{userData?.displayName}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
  )
}

export default Header