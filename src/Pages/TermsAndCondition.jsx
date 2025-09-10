import Footer from "../Components/Common/Footer";
import NavBar from "../Components/Common/NavBar";

export default function TermsAndConditions() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-700">
      <NavBar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-emerald-50">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Terms and Conditions
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
                Please read these Terms and Conditions ("Terms", "Terms and
                Conditions") carefully before using the Kalpavriksha website and
                mobile application (the "Service") operated by Kalpavriksha
                ("us", "we", or "our").
              </p>

              <p>
                Your access to and use of the Service is conditioned on your
                acceptance of and compliance with these Terms. These Terms apply
                to all visitors, users, and others who access or use the
                Service. By accessing or using the Service you agree to be bound
                by these Terms. If you disagree with any part of the terms then
                you may not access the Service.
              </p>

              <h2>1. Accounts</h2>
              <p>
                When you create an account with us, you must provide us
                information that is accurate, complete, and current at all
                times. Failure to do so constitutes a breach of the Terms, which
                may result in immediate termination of your account on our
                Service. You are responsible for safeguarding the password that
                you use to access the Service and for any activities or actions
                under your password, whether your password is with our Service
                or a third-party service.
              </p>

              <h2>2. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and
                functionality are and will remain the exclusive property of
                Kalpavriksha and its licensors. The Service is protected by
                copyright, trademark, and other laws of both India and foreign
                countries. Our trademarks and trade dress may not be used in
                connection with any product or service without the prior written
                consent of Kalpavriksha.
              </p>

              <h2>3. Subscriptions</h2>
              <p>
                Some parts of the Service are billed on a subscription basis
                ("Subscription(s)"). You will be billed in advance on a
                recurring and periodic basis ("Billing Cycle"). Billing cycles
                are set either on a monthly or annual basis, depending on the
                type of subscription plan you select when purchasing a
                Subscription. At the end of each Billing Cycle, your
                Subscription will automatically renew under the exact same
                conditions unless you cancel it or Kalpavriksha cancels it.
              </p>

              <h2>4. User Content</h2>
              <p>
                Our Service allows you to post, link, store, share and otherwise
                make available certain information, text, graphics, videos, or
                other material ("Content"). You are responsible for the Content
                that you post to the Service, including its legality,
                reliability, and appropriateness. By posting Content to the
                Service, you grant us the right and license to use, modify,
                publicly perform, publicly display, reproduce, and distribute
                such Content on and through the Service.
              </p>

              <h2>5. Prohibited Uses</h2>
              <p>
                You may use the Service only for lawful purposes and in
                accordance with the Terms. You agree not to use the Service:
              </p>
              <ul>
                <li>
                  In any way that violates any applicable national or
                  international law or regulation.
                </li>
                <li>
                  For the purpose of exploiting, harming, or attempting to
                  exploit or harm minors in any way by exposing them to
                  inappropriate content or otherwise.
                </li>
                <li>
                  To transmit, or procure the sending of, any advertising or
                  promotional material, including any "junk mail", "chain
                  letter," "spam," or any other similar solicitation.
                </li>
                <li>
                  To impersonate or attempt to impersonate Kalpavriksha, a
                  Kalpavriksha employee, another user, or any other person or
                  entity.
                </li>
              </ul>

              <h2>6. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms. Upon termination,
                your right to use the Service will immediately cease.
              </p>

              <h2>7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with
                the laws of West Bengal, India, without regard to its conflict
                of law provisions. Our failure to enforce any right or provision
                of these Terms will not be considered a waiver of those rights.
              </p>

              <h2>8. Changes</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material we
                will try to provide at least 30 days' notice prior to any new
                terms taking effect. What constitutes a material change will be
                determined at our sole discretion.
              </p>

              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at:{" "}
                <a
                  href="mailto:legal@kalpavriksha.app"
                  className="text-emerald-600 hover:underline"
                >
                  legal@kalpavriksha.app
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
