import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Globe,
  ChevronRight,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Destinations", href: "/destinations" },
  ];

  const popularDestinations = [
    { name: "Rajasthan", href: "/destinations/rajasthan" },
    { name: "Kerala", href: "/destinations/kerala" },
    { name: "Himachal Pradesh", href: "/destinations/himachal" },
    { name: "Goa", href: "/destinations/goa" },
    { name: "Ladakh", href: "/destinations/ladakh" },
  ];

  return (
    <footer className="bg-gradient-to-b bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Yatra Sahayak</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted travel companion for exploring the diverse beauty and
              culture of India. Let us help you create unforgettable memories.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              {popularDestinations.map((destination, index) => (
                <li key={index}>
                  <a
                    href={destination.href}
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    {destination.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-blue-400" />
                <span className="text-gray-300">
                  Mumbai, Maharashtra, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-blue-400" />
                <span className="text-gray-300">+91 1234567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-blue-400" />
                <span className="text-gray-300">info@yatrasahayak.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe size={20} className="text-blue-400" />
                <span className="text-gray-300">www.yatrasahayak.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Yatra Sahayak. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white text-sm"
              >
                Terms of Service
              </a>
              <a href="/faq" className="text-gray-400 hover:text-white text-sm">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
