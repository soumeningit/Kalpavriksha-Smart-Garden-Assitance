import NavBar from "../Components/Common/NavBar";
import Footer from "../Components/Common/Footer";
import HeroSection from "../Components/HeroSection";
import Feature from "../Components/Feature";
import Work from "../Components/Work";
import UpdateProfile from "../Dashboard/Components/UpdateProfile";

// Main App Component
export default function Home() {
  return (
    <div className="bg-emerald-50 min-h-screen font-sans text-gray-800">
      {/* Header */}
      <NavBar />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <Feature />

        {/* How It Works Section */}
        <Work />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// export default Home;
