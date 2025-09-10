import features from "../Constants/featuredata.json";

function Feature() {
  return (
    <>
      <section id="features" className="py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your AI-Powered Urban Greening Platform
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Everything you need to create, manage, and connect with green spaces
            across the city.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <div className="inline-block bg-emerald-100 p-4 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Feature;
