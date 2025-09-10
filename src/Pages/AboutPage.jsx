import React from "react";
import { Leaf, Target, Users, BrainCircuit, Menu, X } from "lucide-react";
import NavBar from "../Components/Common/NavBar";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Aarav Sharma",
      role: "Founder & AI Architect",
      imageUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
      bio: "Passionate about using technology to solve environmental challenges in his hometown of Kolkata.",
    },
    {
      name: "Priya Das",
      role: "Lead Botanist & Community Manager",
      imageUrl:
        "https://images.unsplash.com/photo-1582233479579-f2e1281a44c2?q=80&w=1887&auto=format&fit=crop",
      bio: "An expert in urban gardening, Priya helps our community choose and nurture the perfect plants.",
    },
    {
      name: "Rohan Mehta",
      role: "Full-Stack Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop",
      bio: "The technical wizard who brings the Kalpavriksha platform to life with clean, efficient code.",
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
              Our Mission: To Re-Green Kolkata
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe that a greener city is a healthier, happier city.
              Kalpavriksha was born from a simple idea: empower every citizen of
              Kolkata to become a guardian of green, one plant at a time.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1592205838205-a08eb2a42533?q=80&w=1925&auto=format&fit=crop"
                alt="A lush balcony garden overlooking a cityscape"
                className="rounded-2xl shadow-xl w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/10B981/FFFFFF?text=Our+Vision";
                }}
              />
            </div>
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                From Concrete Jungle to Urban Oasis
              </h2>
              <p className="text-gray-600 mb-4">
                Living in the vibrant heart of Kolkata, we saw endless concrete
                and a yearning for nature. Many of us have balconies, rooftops,
                and community spaces with the potential to become lush green
                pockets. But a common question held us back: "Where do I even
                start?"
              </p>
              <p className="text-gray-600">
                Many want to grow plants but are unsure what will survive in
                Kolkata's unique climate, how to care for them, or how to tackle
                pests and diseases. Kalpavriksha is our answer. We're leveraging
                the power of AI to remove the guesswork, making gardening
                accessible, enjoyable, and successful for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-20 md:py-28 bg-emerald-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Our Approach
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-white p-5 rounded-full shadow-lg mb-4">
                  <BrainCircuit className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Guidance</h3>
                <p className="text-gray-600">
                  Our smart assistant provides personalized plant
                  recommendations and acts as your 24/7 digital botanist.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white p-5 rounded-full shadow-lg mb-4">
                  <Users className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Connection</h3>
                <p className="text-gray-600">
                  We're building a network for Kolkata's plant lovers to share
                  knowledge, celebrate growth, and inspire one another.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white p-5 rounded-full shadow-lg mb-4">
                  <Target className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Data-Driven Impact</h3>
                <p className="text-gray-600">
                  Every plant logged helps create a city-wide map of green
                  spaces, contributing to larger urban reforestation goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Meet the Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex flex-col items-center">
                  <img
                    src={member.imageUrl}
                    alt={`Photo of ${member.name}`}
                    className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/128x128/a7a7a7/FFFFFF?text=Team";
                    }}
                  />
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-emerald-600 font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 max-w-xs">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-2xl font-bold mb-4">Ready to grow with us?</p>
          <button className="bg-emerald-500 text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Your Garden Today
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
