import React from "react";
import { Leaf, Search, Camera, Users, Menu, X, ArrowRight } from "lucide-react";
import NavBar from "../Components/Common/NavBar";

export default function WorkPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
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
              From Seed to Success
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Starting your urban garden is as easy as 1-2-3. Follow these
              simple steps to begin your journey towards a greener space.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 space-y-24">
            {/* Step 1: Discover */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1512428209355-e23c042735d5?q=80&w=1887&auto=format&fit=crop"
                  alt="Person browsing plants on a tablet"
                  className="rounded-2xl shadow-xl w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/10B981/FFFFFF?text=Discover";
                  }}
                />
              </div>
              <div>
                <span className="text-6xl font-extrabold text-emerald-100">
                  01
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2">
                  Discover Your Perfect Plant
                </h2>
                <p className="text-gray-600 mb-4">
                  Start by telling us about your space. Is it a sunny balcony, a
                  shady corner, or a spacious rooftop? Our AI-powered guide uses
                  this information to create a personalized list of plants that
                  are perfectly suited for your home in Kolkata.
                </p>
                <div className="flex items-center text-emerald-600 font-semibold">
                  <Search className="w-5 h-5 mr-2" />
                  <span>Get personalized recommendations.</span>
                </div>
              </div>
            </div>

            {/* Step 2: Nurture */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <span className="text-6xl font-extrabold text-emerald-100">
                  02
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2">
                  Nurture with AI Assistance
                </h2>
                <p className="text-gray-600 mb-4">
                  Once you've chosen your plant, Kalpavriksha becomes your
                  personal gardening assistant. Snap a photo of a leaf to
                  diagnose problems, get smart reminders for watering, and
                  access a rich library of care tips to help your plant
                  flourish.
                </p>
                <div className="flex items-center text-emerald-600 font-semibold">
                  <Camera className="w-5 h-5 mr-2" />
                  <span>Diagnose, remind, and learn.</span>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1466692311509-341b61b69e20?q=80&w=2070&auto=format&fit=crop"
                  alt="A person gently watering a small potted plant"
                  className="rounded-2xl shadow-xl w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/10B981/FFFFFF?text=Nurture";
                  }}
                />
              </div>
            </div>

            {/* Step 3: Connect */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
                  alt="Two people smiling and looking at a plant together"
                  className="rounded-2xl shadow-xl w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/10B981/FFFFFF?text=Connect";
                  }}
                />
              </div>
              <div>
                <span className="text-6xl font-extrabold text-emerald-100">
                  03
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2">
                  Connect with the Community
                </h2>
                <p className="text-gray-600 mb-4">
                  You're not gardening alone! Share photos of your progress, ask
                  questions, and exchange tips with a growing community of plant
                  enthusiasts across Kolkata. Celebrate your green achievements
                  and inspire others to join the movement.
                </p>
                <div className="flex items-center text-emerald-600 font-semibold">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Share, learn, and grow together.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-emerald-600">
          <div className="container mx-auto px-6 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Plant Your First Seed?
            </h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join the Kalpavriksha community today and take the first step
              towards creating your own beautiful urban garden.
            </p>
            <button className="bg-white text-emerald-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center">
              Start Your Green Journey <ArrowRight className="w-5 h-5 ml-2" />
            </button>
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
