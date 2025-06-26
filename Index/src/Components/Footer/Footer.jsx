
import { useState } from 'react'
import { Link } from 'react-router-dom'
import footer from './Footer-images/freepik-export-20240930073049yijq.png'
import palette from './Footer-images/pallete.jpg'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


function Footer() {
  const foot = {
    backgroundImage: `url(${footer})`,
  };

  return (
    <footer className="min-h-screen bg-slate-100 dark:bg-[#040d1200] w-full bg-cover bg-center flex justify-center items-center">
      <div
        className="md:h-[94vh] h-full w-[95vw] border border-red-50 rounded-lg shadow-lg bg-center bg-cover lg:my-0 my-4"
        style={foot}
      >
        {/* Top Navbar */}
        <nav className="w-full h-[100px] flex items-center justify-center md:justify-between px-4 md:px-6">
          {/* Logo */}
          <div className="h-[60px] w-[60px] bg-red-400 rounded-full overflow-hidden border-2 border-red-50 hidden md:block">
            <img className="h-full w-full" src={palette} alt="Logo" />
          </div>
          {/* Logo Name */}~
          <div className="text-center lg:ml-[-40%]">
            <h1 className="font-eagle text-lg md:text-4xl font-bold">
              Painters' Diary
            </h1>
            <h6 className="font-cookie text-sm md:text-2xl font-medium mt-[-4px]">
              The Diary of Every Artist
            </h6>
          </div>
          {/* Sign Up Button */}
          <Link to="/signup">
          <div>
            <button className="font-news w-full bg-red-400 px-2 md:px-3 md:rounded-lg text-sm md:text-lg text-white md:block hidden">
              Sign Up
            </button>
          </div>
          </Link>
        </nav>

        {/* Important Events */}
        <div className="my-6">
          <h1 className="text-center text-lg md:text-2xl font-bold">
            Important Events
          </h1>
          <div className="h-[30vh] w-[90%] mx-auto mt-4 border border-white rounded-xl"></div>
        </div>
        
         {/* Footer Links */}
<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 px-[5vw] mt-8 text-center sm:text-left">
  {[
    {
      title: "Company",
      links: [
        { text: "Home", to: "/" },
        { text: "About", to: "/About" },
        { text: "Community", to: "/Community" },
        { text: "Blog", to: "/Blog" }
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "FAQs", to: "/FAQs" },
        { text: "Reviews", to: "/reviews" },
        { text: "Help & Support", to: "/Resources/Help" },
        { text: "Events", to: "/events" }
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Terms & Conditions", to: "Legal/Terms_Conditions" },
        { text: "Privacy Policy", to: "/Legal/Privacy_Policy" },
        { text: "License", to: "Legal/License" },
        { text: "Cookies", to: "/cookies" }
      ],
    },
    {
      title: "Product",
      links: [
        { text: "Update", to: "/update" },
        { text: "Security", to: "/security" }
      ],
    },
    {
      title: "Contact Us",
      links: [
        { text: "Berunanpukuriya" },
        { text: "Malikapur" },
        { text: "Kolkata, 700126" },
        { text: "+918617331488" }
      ],
    },
  ].map((section, idx) => (
    <div key={idx}>
      <h1 className="text-lg md:text-xl font-dmserif text-white">
        {section.title}
      </h1>
      {section.links.map((link, index) => (
        <Link key={index} to={link.to || "#"}>
          <p
            className="text-sm md:text-base font-news font-semibold hover:underline hover:text-cyan-600 cursor-pointer"
          >
            {link.text}
          </p>
        </Link>
      ))}
    </div>
  ))}
</div>

        {/* Contact Info */}
        <div className="flex flex-col items-center justify-center mx-auto mt-10">
          <p className="text-sm md:text-base">EMAIL US</p>
          <p className="text-sm md:text-base">swarnadipb727@gmail.com</p>
        </div>

        {/* Social Media */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="hidden md:block w-[20vw] h-[2px] bg-black"></div>
          <div className="flex gap-6">
           
             {[
              { Icon: FaFacebook },
              { Icon: FaInstagram },
              { Icon: FaXTwitter },
              { Icon: FaYoutube },
              { Icon: FaLinkedin }
            ].map(({ Icon }, idx) => (
              <div
                key={idx}
                className="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] rounded-lg cursor-pointer flex items-center justify-center transition-transform duration-200 hover:scale-110"
              >
                <Icon className="h-full w-full p-1 text-black hover:text-cyan-600" />
              </div>
            ))}
          </div>
          <div className="hidden md:block w-[20vw] h-[2px] bg-black"></div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-center my-6 text-center text-xs md:text-sm">
          <p>Copyright © 2024 Painters' Diary. All Rights Reserved.</p>
          <p>
            This website and its content are the property of Painters' Diary.
            Unauthorized use is prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer

