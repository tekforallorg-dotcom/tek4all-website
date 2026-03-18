import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Tek4All's privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <div className="space-y-10">
              <p className="text-mid-gray text-sm">Last updated: March 2026</p>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">1. Introduction</h2>
                <p className="text-mid-gray leading-relaxed mb-3">
                  Technology for All Initiative (&ldquo;Tek4All,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a non-governmental organisation registered in Nigeria, headquartered at Ventures Park, 5 Kwaji Close, Maitama, Abuja 904101, FCT, Nigeria.
                </p>
                <p className="text-mid-gray leading-relaxed">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website (tekforall.org), use our services, participate in our programmes, volunteer with us, or otherwise interact with Tek4All. We are committed to protecting your privacy and handling your data with transparency and care.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">2. Information We Collect</h2>
                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black mb-2">2.1 Information You Provide</h3>
                <p className="text-mid-gray leading-relaxed mb-3">We collect information you voluntarily provide, including:</p>
                <ul className="text-mid-gray leading-relaxed space-y-2 ml-5 list-disc">
                  <li><strong>Contact forms:</strong> name, email address, phone number, and message content</li>
                  <li><strong>Partnership enquiries:</strong> name, company email, phone number, and partnership interest details</li>
                  <li><strong>Volunteer applications:</strong> name, email, phone number, skills, and availability information</li>
                  <li><strong>Newsletter subscriptions:</strong> email address</li>
                  <li><strong>Programme participation:</strong> name, age, gender, location, educational background, and other information relevant to programme delivery and impact measurement</li>
                  <li><strong>Event registrations:</strong> name, contact details, and organisational affiliation</li>
                </ul>

                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black mb-2 mt-6">2.2 Information Collected Automatically</h3>
                <p className="text-mid-gray leading-relaxed mb-3">When you visit our website, we may automatically collect:</p>
                <ul className="text-mid-gray leading-relaxed space-y-2 ml-5 list-disc">
                  <li>Device information (browser type, operating system, device type)</li>
                  <li>Usage data (pages visited, time spent, referring URLs)</li>
                  <li>IP address and approximate geographic location</li>
                  <li>Cookies and similar tracking technologies (see Section 7)</li>
                </ul>

                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black mb-2 mt-6">2.3 Media and Photographs</h3>
                <p className="text-mid-gray leading-relaxed">
                  During programmes and events, we may capture photographs and videos for documentation, reporting, and promotional purposes. We obtain appropriate consent before publishing images, with particular care taken for photographs involving children and vulnerable individuals in accordance with our safeguarding policy.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">3. How We Use Your Information</h2>
                <p className="text-mid-gray leading-relaxed mb-3">We use the information we collect for the following purposes:</p>
                <ul className="text-mid-gray leading-relaxed space-y-2 ml-5 list-disc">
                  <li><strong>Programme delivery:</strong> to administer, manage, and improve our digital inclusion programmes</li>
                  <li><strong>Communication:</strong> to respond to enquiries, send updates, newsletters, and programme-related information</li>
                  <li><strong>Partnership management:</strong> to evaluate, establish, and maintain partnerships and collaborations</li>
                  <li><strong>Volunteer coordination:</strong> to process volunteer applications and manage volunteer engagement</li>
                  <li><strong>Impact measurement:</strong> to track, measure, and report on the outcomes and impact of our programmes</li>
                  <li><strong>Reporting and compliance:</strong> to meet reporting obligations to donors, partners, and regulatory bodies</li>
                  <li><strong>Website improvement:</strong> to analyse usage patterns and enhance our website experience</li>
                  <li><strong>Legal compliance:</strong> to comply with applicable laws and regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">4. Legal Basis for Processing</h2>
                <p className="text-mid-gray leading-relaxed mb-3">We process your personal data based on the following legal grounds:</p>
                <ul className="text-mid-gray leading-relaxed space-y-2 ml-5 list-disc">
                  <li><strong>Consent:</strong> where you have given clear consent for us to process your personal data for specific purposes</li>
                  <li><strong>Legitimate interest:</strong> where processing is necessary for our legitimate organisational interests, such as programme delivery and impact measurement</li>
                  <li><strong>Contractual obligation:</strong> where processing is necessary to fulfil our obligations under partnership or volunteer agreements</li>
                  <li><strong>Legal obligation:</strong> where processing is necessary to comply with Nigerian law or other applicable regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">5. Data Sharing and Disclosure</h2>
                <p className="text-mid-gray leading-relaxed mb-3">We do not sell, trade, or rent your personal information. We may share your data with:</p>
                <ul className="text-mid-gray leading-relaxed space-y-2 ml-5 list-disc">
                  <li><strong>Service providers:</strong> trusted third-party services that help us operate our website, manage data, and deliver programmes (e.g., Supabase for database hosting, Vercel for website hosting)</li>
                  <li><strong>Partners and donors:</strong> aggregated, anonymised impact data shared with programme partners and funding organisations for reporting purposes</li>
                  <li><strong>Legal authorities:</strong> where required by law, regulation, or legal process</li>
                  <li><strong>Safeguarding authorities:</strong> where there is a credible risk of harm to a child or vulnerable adult</li>
                </ul>
                <p className="text-mid-gray leading-relaxed mt-3">
                  All third-party service providers are contractually required to protect your data and use it only for the purposes we specify.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">6. Data Security</h2>
                <p className="text-mid-gray leading-relaxed">
                  We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These measures include encrypted data transmission (SSL/TLS), secure database hosting with row-level security, access controls limiting data access to authorised personnel, and regular security reviews. While we strive to protect your data, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">7. Cookies and Tracking</h2>
                <p className="text-mid-gray leading-relaxed mb-3">
                  Our website uses essential cookies required for site functionality, such as authentication and session management. We may also use analytics tools to understand how visitors use our site. You can control cookie preferences through your browser settings. Disabling cookies may affect your experience on our website.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">8. Data Retention</h2>
                <p className="text-mid-gray leading-relaxed">
                  We retain personal information only for as long as necessary to fulfil the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. Programme participant data may be retained for the duration needed for impact reporting and evaluation. Contact form submissions are retained for a reasonable period to ensure follow-up and then archived or deleted. You may request deletion of your data at any time (see Section 9).
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">9. Your Rights</h2>
                <p className="text-mid-gray leading-relaxed mb-3">Depending on your location and applicable law, you may have the following rights regarding your personal data:</p>
                <ul className="text-mid-gray leading-relaxed space-y-2 ml-5 list-disc">
                  <li><strong>Access:</strong> request a copy of the personal data we hold about you</li>
                  <li><strong>Correction:</strong> request correction of inaccurate or incomplete data</li>
                  <li><strong>Deletion:</strong> request deletion of your personal data, subject to legal retention requirements</li>
                  <li><strong>Objection:</strong> object to the processing of your data for specific purposes</li>
                  <li><strong>Withdrawal of consent:</strong> withdraw consent at any time where processing is based on consent</li>
                  <li><strong>Data portability:</strong> request your data in a structured, commonly used format</li>
                </ul>
                <p className="text-mid-gray leading-relaxed mt-3">
                  To exercise any of these rights, contact us at <a href="mailto:impact@tekforall.org" className="text-near-black underline">impact@tekforall.org</a>. We will respond within 30 days.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">10. Children&apos;s Privacy</h2>
                <p className="text-mid-gray leading-relaxed">
                  Many of our programmes serve children and young people. We take the privacy of minors extremely seriously. We collect children&apos;s data only with the consent of a parent, guardian, or school authority, and only for legitimate programme delivery and safeguarding purposes. Children&apos;s personal data is subject to enhanced protection measures, and photographs of minors are only published with explicit written consent.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">11. International Data Transfers</h2>
                <p className="text-mid-gray leading-relaxed">
                  Our website and services are hosted on servers that may be located outside of Nigeria (including the European Union). Where personal data is transferred internationally, we ensure appropriate safeguards are in place, including data processing agreements with our service providers that meet recognised international data protection standards.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">12. Third-Party Links</h2>
                <p className="text-mid-gray leading-relaxed">
                  Our website may contain links to third-party websites, including social media platforms (Instagram, LinkedIn) and partner organisations. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">13. Changes to This Policy</h2>
                <p className="text-mid-gray leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or organisational direction. Material changes will be communicated through our website. The &ldquo;Last updated&rdquo; date at the top of this page indicates when the policy was last revised. Continued use of our website after changes constitutes acceptance of the updated policy.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">14. Applicable Law</h2>
                <p className="text-mid-gray leading-relaxed">
                  This Privacy Policy is governed by the Nigeria Data Protection Act (NDPA) 2023 and, where applicable, the General Data Protection Regulation (GDPR) for users in the European Economic Area. We are committed to complying with all applicable data protection legislation.
                </p>
              </div>

              <div className="pt-6" style={{ borderTop: "1px solid #e5e5e5" }}>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">Contact Us</h2>
                <p className="text-mid-gray leading-relaxed">
                  For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
                </p>
                <div className="mt-4 text-mid-gray text-sm space-y-1">
                  <p><strong>Technology for All Initiative (Tek4All)</strong></p>
                  <p>Ventures Park, 5 Kwaji Close, Maitama, Abuja 904101, FCT, Nigeria</p>
                  <p>Email: <a href="mailto:impact@tekforall.org" className="text-near-black underline">impact@tekforall.org</a></p>
                  <p>Phone: <a href="tel:+2347031064144" className="text-near-black underline">+234-703-106-4144</a></p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
