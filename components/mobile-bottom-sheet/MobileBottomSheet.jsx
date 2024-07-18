"use client";
import React, { useState , useEffect } from "react";
import "./mobile-screen.scss";
import Link from "next/link";
import { CrownOutlined, HomeOutlined, PlusCircleOutlined, SearchOutlined, UserOutlined } from "@/utils/icons";
import { usePathname } from "next/navigation";

let mobileMenu = [
  {
    key: "home",
    url: "/",
    label: "Home",
    lightIcon : <HomeOutlined/>,
    themeIcon : <HomeOutlined style={{color : "#8c193f"}}/>
  },
  {
    key: "search",
    url: "/filter-card",
    label: "Search",
    lightIcon : <SearchOutlined/>,
    themeIcon : <SearchOutlined style={{color : "#8c193f"}}/>
  },
  {
    key: "post",
    url: "/post-property",
    label: "Post",
    lightIcon : <PlusCircleOutlined/>,
    themeIcon : <PlusCircleOutlined style={{color : "#8c193f"}}/>
  },
  {
    key: "prime",
    url: "/plans",
    label: "Prime",
    lightIcon : <CrownOutlined />,
    themeIcon : <CrownOutlined style={{color : "#8c193f"}}/>
  },
  {
    key: "profile",
    url: "/profile",
    label: "Profile",
    lightIcon : <UserOutlined/>,
    themeIcon : <UserOutlined style={{color : "#8c193f"}}/>
  },
];

const MobileBottomSheet = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const pathname = usePathname()

  useEffect(() => {
    async function checkPath(){
      if(pathname.includes('/login')){
        setActiveMenu('home')
      }
      else{
        mobileMenu.forEach(menu => {
          if(pathname == menu.url){
            setActiveMenu(menu.key)
            return;
          }
        })
      }
    }
    checkPath()
  }, [])

  return (
    <section className="mobile-screen-bottom-sheet">
      <div className="mobile-screen-bottom-sheet-inner">
        {mobileMenu.map((option) => (
          <Link
            href={{
              pathname: option.url,
            }}
            className={`mobile-option-card ${
              option.key == activeMenu ? `activemenu` : ``
            }`}
            onClick={() => setActiveMenu(option.key)}
          >
            {
              activeMenu == option.key ? option.themeIcon : option.lightIcon
            }
            <p>{option.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MobileBottomSheet;