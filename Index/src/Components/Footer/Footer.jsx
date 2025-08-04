import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
  const sections = [
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
        { text: "Terms & Conditions", to: "/Legal/Terms_Conditions" },
        { text: "Privacy Policy", to: "/Legal/Privacy_Policy" },
        { text: "License", to: "/Legal/License" },
        { text: "Cookies", to: "/cookies" }
      ],
    },
    {
      title: "Product",
      links: [
        { text: "Update", to: "/Update" },
        { text: "Security", to: "/Product/Security" }
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
  ];

  const socialLinks = [
    { Icon: FaFacebook, link: 'https://www.facebook.com/profile.php?id=61577769513723' },
    { Icon: FaInstagram, link: 'https://instagram.com/your_instagram' },
    { Icon: FaXTwitter, link: 'https://twitter.com/your_twitter' },
    { Icon: FaYoutube, link: 'https://youtube.com/@blackberry-cc5vy?si=bL2epR4xYk1NbV9F' },
    { Icon: FaLinkedin, link: 'https://linkedin.com/in/your_linkedin' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-700 text-white w-full pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="font-eagle text-2xl md:text-4xl">Painters' Diary</h1>
          <p className="font-cookie text-lg md:text-xl text-gray-300 mt-1">
            The Diary of Every Artist
          </p>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-dmserif text-lg mb-4">{section.title}</h3>
              {section.links.map((link, i) =>
                link.to ? (
                  <Link
                    key={i}
                    to={link.to}
                    className="block text-sm text-gray-300 hover:text-cyan-400 transition duration-200"
                  >
                    {link.text}
                  </Link>
                ) : (
                  <p key={i} className="text-sm text-gray-400">{link.text}</p>
                )
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-600 mb-8" />

        {/* Contact & Social */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm">EMAIL US</p>
          <p className="text-sm text-cyan-300 font-medium">swarnadipb727@gmail.com</p>

          <div className="flex gap-6 mt-4">
            {socialLinks.map(({ Icon, link }, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl sm:text-2xl hover:text-cyan-400 transition-transform transform hover:scale-125"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-xs text-gray-400">
          <p>© 2024 Painters' Diary. All rights reserved.</p>
          <p className="max-w-xl mx-auto mt-2">
            This website and its content are the property of Painters' Diary. Unauthorized use is strictly prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


