import Link from "next/link";
import { useState } from "react";

const MenuItems = () => {
  const menuList = [
    {
      label: "About",
      link: "about",
    },
    {
      label: "Posts",
      link: "posts",
    },
    {
      label: "Project",
      link: "project",
    },
    {
      label: "ChangeLog",
      link: "changeLog",
    },
  ];

  const menu = menuList.map((item, index) => {
    const { label, link } = item;
    return (
      <Link href={`/${link}`} className="hover:text-blue-700">
        {label}
      </Link>
    );
  });
  return <>{menu}</>;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  function toggleNavbar() {
    const navbarToggle = document.querySelector(".navbar-toggle");
    navbarToggle.classList.toggle("open");
    setMenuOpen(!menuOpen);
  }

  return (
    <header className="z-20 bg-white w-full fixed border">
      <div className="flex wrapper h-16 items-center">
        <Link href="/" className="font-bold text-2xl mr-16">
          Stanley Yin
        </Link>
        <div className="hidden md:flex gap-12">
          <MenuItems />
        </div>
        <div className="navbar ml-auto md:hidden">
          <div className="navbar-toggle" onClick={toggleNavbar}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </div>
      <div
        className={`mx-auto overflow-hidden text-center transition-all duration-300 md:hidden flex gap-4 flex-col ${
          menuOpen ? "h-40" : "h-0"
        }`}
      >
        <MenuItems />
      </div>
    </header>
  );
}
