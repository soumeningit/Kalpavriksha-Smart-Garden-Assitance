import React from "react";
import {
  Leaf,
  Bot,
  Users,
  Menu,
  X,
  Sun,
  Droplets,
  ShieldCheck,
  CalendarClock,
  Map,
  Award,
} from "lucide-react";
import NavBar from "../Components/Common/NavBar";

export default function FeaturePage() {
  const otherFeatures = [
    {
      icon: <CalendarClock className="w-8 h-8 text-emerald-600" />,
      title: "Gardening Calendar",
      description:
        "Get a personalized schedule for planting, pruning, and fertilizing.",
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      title: "Track Your Progress",
      description:
        "Keep a visual diary of your plants' growth and celebrate your green achievements.",
    },
    {
      icon: <Map className="w-8 h-8 text-emerald-600" />,
      title: "Local Nursery Finder",
      description:
        "Discover the best places in Kolkata to find seeds, soil, and supplies.",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      {/* Header */}
      <NavBar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-emerald-50 text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Your Smart Gardening Toolkit
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Kalpavriksha combines cutting-edge AI with community wisdom to
              provide everything you need to transform your urban space into a
              green oasis.
            </p>
          </div>
        </section>

        {/* Feature 1: Smart Plant Guide */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="pr-0 md:pr-8">
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
                <Leaf className="w-4 h-4 mr-2" /> Smart Plant Guide
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Perfect Plant for Your Space
              </h2>
              <p className="text-gray-600 mb-6">
                Stop the guesswork. Our AI analyzes your specific
                conditions—like balcony sunlight in Kolkata's climate or rooftop
                space—to recommend plants that will not just survive, but
                thrive.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Sun className="w-6 h-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">
                      Personalized Recommendations
                    </h4>
                    <p className="text-gray-600">
                      Tell us about your space, and we'll provide a curated list
                      of flowers, herbs, and vegetables perfect for you.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Droplets className="w-6 h-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Kolkata-Specific Database</h4>
                    <p className="text-gray-600">
                      Our plant database is tailored to the city's unique
                      climate, humidity, and seasonal patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1594979220459-5492e7c2a543?q=80&w=1887&auto=format&fit=crop"
                alt="A variety of potted plants on a sunny balcony"
                className="rounded-2xl shadow-xl w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/10B981/FFFFFF?text=Smart+Guide";
                }}
              />
            </div>
          </div>
        </section>

        {/* Feature 2: AI Care Assistant */}
        <section className="py-20 md:py-28 bg-emerald-50">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1587569700399-52d3a154a43c?q=80&w=1887&auto=format&fit=crop"
                alt="A person using their phone to identify a plant leaf"
                className="rounded-2xl shadow-xl w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/10B981/FFFFFF?text=AI+Assistant";
                }}
              />
            </div>
            <div className="pl-0 md:pl-8 order-1 md:order-2">
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
                <Bot className="w-4 h-4 mr-2" /> AI-Powered Care Assistant
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your 24/7 Digital Botanist
              </h2>
              <p className="text-gray-600 mb-6">
                Worried about a yellowing leaf or an unknown pest? Our AI
                assistant is here to help. Get instant diagnoses, watering
                reminders, and expert care tips right when you need them.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <ShieldCheck className="w-6 h-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Instant Disease Diagnosis</h4>
                    <p className="text-gray-600">
                      Simply snap a photo of your plant's leaf, and our AI will
                      identify potential diseases or pests and suggest organic
                      solutions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CalendarClock className="w-6 h-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Smart Reminders</h4>
                    <p className="text-gray-600">
                      Never forget to water again. Get timely reminders for
                      watering, fertilizing, and other crucial plant care tasks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3: Community */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="pr-0 md:pr-8">
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
                <Users className="w-4 h-4 mr-2" /> Community of Gardeners
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Grow Together with Kolkata
              </h2>
              <p className="text-gray-600 mb-6">
                Connect with a vibrant community of fellow plant lovers across
                the city. Share your successes, ask for advice, and be a part of
                Kolkata's collective green transformation.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Share Your Journey</h4>
                    <p className="text-gray-600">
                      Post photos of your urban garden, from the first sprout to
                      a full bloom, and inspire others.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Leaf className="w-6 h-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Exchange & Collaborate</h4>
                    <p className="text-gray-600">
                      A dedicated space to exchange seeds, share gardening tips,
                      and even organize local greening events.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1526642238124-73a73c72685f?q=80&w=1887&auto=format&fit=crop"
                alt="A group of people happily tending to a community garden"
                className="rounded-2xl shadow-xl w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/10B981/FFFFFF?text=Community";
                }}
              />
            </div>
          </div>
        </section>

        {/* More Features Section */}
        <section className="py-20 md:py-28 bg-emerald-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              And So Much More...
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {otherFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white p-6 rounded-xl shadow-lg text-left"
                >
                  <div className="mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-2xl font-bold mb-4">
            Ready to unlock these features?
          </p>
          <button className="bg-emerald-500 text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Create Your Free Account
          </button>
          <div className="mt-10 border-t border-gray-700 pt-8 text-sm text-gray-400">
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
