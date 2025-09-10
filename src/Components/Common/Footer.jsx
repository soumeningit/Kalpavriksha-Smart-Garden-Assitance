import { useState, useEffect } from "react";
import { LuLeaf, LuArrowUp } from "react-icons/lu";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { quickLinks } from "../../Constants/footerData.json";
import { terms } from "../../Constants/footerData.json";
import { socialLinks } from "../../Constants/footerData.json";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const iconsMap = {
    FaGithub: FaGithub,
    FaTwitter: FaTwitter,
    FaFacebook: FaFacebook,
    FaInstagram: FaInstagram,
    FaLinkedin: FaLinkedin,
  };

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer id="contact" className="bg-gray-800 text-white relative">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center md:text-left">
            {/* Column 1: Brand and Tagline */}
            <div className="md:col-span-2">
              <Link
                to="/"
                className="inline-flex items-center justify-center md:justify-start space-x-2 mb-4"
              >
                <LuLeaf className="w-8 h-8 text-emerald-500" />
                <span className="text-2xl font-bold">Kalpavriksha</span>
              </Link>
              <p className="text-gray-400">
                Building a greener, healthier world, together.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.url}
                      className="text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                {terms.map((term) => (
                  <li key={term.name}>
                    <Link
                      to={term.url}
                      className="text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      {term.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="font-bold mb-4">Stay Updated</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-l-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-gray-400"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-r-md font-semibold transition-colors"
                >
                  Go
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 mr-10 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Kalpavriksha. All Rights
              Reserved.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = iconsMap[social.icon]; // Get the actual component
                return (
                  <Link
                    key={social.name}
                    to={social.url}
                    aria-label={social.name}
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {IconComponent && <IconComponent className="text-2xl" />}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 z-50 cursor-pointer"
          aria-label="Scroll to top"
        >
          <LuArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
