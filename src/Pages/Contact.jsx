import React from "react";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import NavBar from "../Components/Common/NavBar";

export default function Contact() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      {/* Header */}
      <NavBar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-emerald-50 text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question, a suggestion, or want to collaborate? We'd love
              to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Form & Details Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-2xl shadow-xl">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form action="#" method="POST" className="space-y-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-5 w-5 h-5 text-gray-400" />
                    <textarea
                      placeholder="Your Message"
                      rows="5"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
              {/* Contact Details */}
              <div className="bg-emerald-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Our Office</h3>
                      <p className="text-gray-600">
                        123 Green Avenue, Park Street Area, Kolkata, West Bengal
                        700016
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email Us</h3>
                      <p className="text-gray-600">hello@kalpavriksha.app</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Call Us</h3>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
                {/* Map Placeholder */}
                <div className="mt-8 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="border-t border-gray-700 pt-8 text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Kalpavriksha. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
