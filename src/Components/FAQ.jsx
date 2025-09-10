import { HelpCircle } from "lucide-react";
import { faqs } from "../Constants/plansData.json";

function FAQ() {
  return (
    <>
      <section className="py-20 md:py-28 bg-emerald-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-2">
              Have questions? We have answers.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer"
              >
                <summary className="font-semibold flex justify-between items-center">
                  {faq.q}
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                </summary>
                <p className="text-gray-600 mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQ;
