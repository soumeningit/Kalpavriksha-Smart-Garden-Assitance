function Work() {
  return (
    <>
      <section id="how-it-works" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Greening Kolkata in 3 Simple Steps
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start your journey from a concrete jungle to a green paradise with
              ease.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-extrabold text-emerald-200 mb-2">
                01
              </div>
              <h3 className="text-xl font-bold mb-2">Discover</h3>
              <p className="text-gray-600">
                Get AI-driven suggestions for plants that will thrive in your
                specific home environment in Kolkata.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-extrabold text-emerald-200 mb-2">
                02
              </div>
              <h3 className="text-xl font-bold mb-2">Nurture</h3>
              <p className="text-gray-600">
                Use our AI assistant to diagnose issues, set reminders, and
                learn the best care practices.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-extrabold text-emerald-200 mb-2">
                03
              </div>
              <h3 className="text-xl font-bold mb-2">Connect</h3>
              <p className="text-gray-600">
                Join the city-wide community, share your green achievements, and
                inspire others.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Work;
