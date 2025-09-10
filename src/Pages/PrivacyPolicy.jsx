import Footer from "../Components/Common/Footer";
import NavBar from "../Components/Common/NavBar";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-700">
      <NavBar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-emerald-50">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Privacy Policy
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
                Kalpavriksha ("us", "we", or "our") operates the Kalpavriksha
                website and mobile application (the "Service"). This page
                informs you of our policies regarding the collection, use, and
                disclosure of personal data when you use our Service and the
                choices you have associated with that data.
              </p>

              <p>
                We use your data to provide and improve the Service. By using
                the Service, you agree to the collection and use of information
                in accordance with this policy. Unless otherwise defined in this
                Privacy Policy, terms used in this Privacy Policy have the same
                meanings as in our Terms and Conditions.
              </p>

              <h2>1. Information Collection and Use</h2>
              <p>
                We collect several different types of information for various
                purposes to provide and improve our Service to you. This
                includes, but is not limited to, your name, email address, and
                photos of plants you upload for diagnostic purposes ("Personal
                Data").
              </p>

              <h2>2. Use of Data</h2>
              <p>Kalpavriksha uses the collected data for various purposes:</p>
              <ul>
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>
                  To allow you to participate in interactive features of our
                  Service when you choose to do so
                </li>
                <li>To provide customer support</li>
                <li>
                  To gather analysis or valuable information so that we can
                  improve our Service
                </li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>

              <h2>3. Data Security</h2>
              <p>
                The security of your data is important to us, but remember that
                no method of transmission over the Internet, or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your Personal Data, we
                cannot guarantee its absolute security.
              </p>

              <h2>4. Service Providers</h2>
              <p>
                We may employ third party companies and individuals to
                facilitate our Service ("Service Providers"), to provide the
                Service on our behalf, to perform Service-related services or to
                assist us in analyzing how our Service is used. These third
                parties have access to your Personal Data only to perform these
                tasks on our behalf and are obligated not to disclose or use it
                for any other purpose.
              </p>

              <h2>5. Links to Other Sites</h2>
              <p>
                Our Service may contain links to other sites that are not
                operated by us. If you click on a third party link, you will be
                directed to that third party's site. We strongly advise you to
                review the Privacy Policy of every site you visit. We have no
                control over and assume no responsibility for the content,
                privacy policies or practices of any third party sites or
                services.
              </p>

              <h2>6. Children's Privacy</h2>
              <p>
                Our Service does not address anyone under the age of 13
                ("Children"). We do not knowingly collect personally
                identifiable information from anyone under the age of 13. If you
                are a parent or guardian and you are aware that your Children
                has provided us with Personal Data, please contact us. If we
                become aware that we have collected Personal Data from children
                without verification of parental consent, we take steps to
                remove that information from our servers.
              </p>

              <h2>7. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page. We will let you know via email and/or a prominent
                notice on our Service, prior to the change becoming effective
                and update the "last updated" date at the top of this Privacy
                Policy.
              </p>

              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:{" "}
                <a
                  href="mailto:privacy@kalpavriksha.app"
                  className="text-emerald-600 hover:underline"
                >
                  privacy@kalpavriksha.app
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
