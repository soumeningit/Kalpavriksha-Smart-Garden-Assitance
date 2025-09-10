import Footer from "../Components/Common/Footer";
import NavBar from "../Components/Common/NavBar";

export default function Disclaimer() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-700">
      <NavBar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-emerald-50">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Disclaimer
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              Last updated: August 28, 2025
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="prose lg:prose-lg max-w-none space-y-8">
              <p>
                The information provided by Kalpavriksha ("we," "us," or "our")
                on our website and mobile application (the "Service") is for
                general informational purposes only. All information on the
                Service is provided in good faith, however, we make no
                representation or warranty of any kind, express or implied,
                regarding the accuracy, adequacy, validity, reliability,
                availability, or completeness of any information on the Service.
              </p>

              <h2>1. No Professional Advice</h2>
              <p>
                The information provided by the Service, including but not
                limited to AI-powered plant diagnostics, care schedules, and
                gardening tips, is intended for informational and educational
                purposes only. It does not constitute professional horticultural
                or agricultural advice. You should not rely on the information
                from the Service as a substitute for, nor does it replace,
                professional advice from a certified horticulturist, arborist,
                or agricultural scientist. Always seek the advice of a qualified
                professional with any questions you may have regarding a plant's
                health or condition.
              </p>

              <h2>2. External Links Disclaimer</h2>
              <p>
                The Service may contain (or you may be sent through the Service)
                links to other websites or content belonging to or originating
                from third parties. Such external links are not investigated,
                monitored, or checked for accuracy, adequacy, validity,
                reliability, availability, or completeness by us. We do not
                warrant, endorse, guarantee, or assume responsibility for the
                accuracy or reliability of any information offered by
                third-party websites linked through the site.
              </p>

              <h2>3. Errors and Omissions Disclaimer</h2>
              <p>
                While we have made every attempt to ensure that the information
                contained in this Service has been obtained from reliable
                sources, Kalpavriksha is not responsible for any errors or
                omissions or for the results obtained from the use of this
                information. All information in the Service is provided "as is",
                with no guarantee of completeness, accuracy, timeliness or of
                the results obtained from the use of this information.
              </p>

              <h2>4. Views Expressed Disclaimer</h2>
              <p>
                The Service may contain views and opinions which are those of
                the authors and do not necessarily reflect the official policy
                or position of any other author, agency, organization, employer,
                or company, including Kalpavriksha. Comments published by users
                are their sole responsibility and the users will take full
                responsibility, liability, and blame for any libel or litigation
                that results from something written in or as a direct result of
                something written in a comment.
              </p>

              <h2>5. "Use at Your Own Risk" Disclaimer</h2>
              <p>
                All information in the Service is provided with the
                understanding that Kalpavriksha is not herein engaged in
                rendering legal, accounting, tax, or other professional advice
                and services. As such, it should not be used as a substitute for
                consultation with professional advisers. In no event shall
                Kalpavriksha or its suppliers be liable for any special,
                incidental, indirect, or consequential damages whatsoever
                arising out of or in connection with your access or use or
                inability to access or use the Service.
              </p>

              <h2>6. Contact Us</h2>
              <p>
                If you have any questions about this Disclaimer, you can contact
                us at:{" "}
                <a
                  href="mailto:disclaimer@kalpavriksha.app"
                  className="text-emerald-600 hover:underline"
                >
                  disclaimer@kalpavriksha.app
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
