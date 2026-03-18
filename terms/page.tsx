import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions governing your use of the Tek4All website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="Terms and conditions governing your use of our website and services."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <div className="space-y-10">
              <p className="text-mid-gray text-sm">Last updated: March 2026</p>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">1. Acceptance of Terms</h2>
                <p className="text-mid-gray leading-relaxed">
                  By accessing or using the website operated by Technology for All Initiative (&ldquo;Tek4All,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) at tekforall.org, including all associated subdomains and services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website or services. These terms apply to all visitors, users, volunteers, partners, and programme participants.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">2. About Tek4All</h2>
                <p className="text-mid-gray leading-relaxed">
                  Tek4All is a non-governmental organisation (NGO) established in 2024, registered in Nigeria, with its headquarters at Ventures Park, 5 Kwaji Close, Maitama, Abuja 904101, FCT, Nigeria. Our mission is to equip underserved communities with future-ready digital skills, empowering all Nigerians to thrive through inclusive opportunities, digital education, and connectivity.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">3. Use of Website</h2>
                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black mb-2">3.1 Permitted Use</h3>
                <p className="text-mid-gray leading-relaxed mb-3">You may use our website for lawful purposes only, including:</p>
                <ul className="text-mid-gray leading-relaxed space-y-2 ml-5 list-disc">
                  <li>Learning about Tek4All&apos;s programmes, initiatives, and impact</li>
                  <li>Submitting enquiries, partnership requests, or volunteer applications</li>
                  <li>Subscribing to our newsletter and community updates</li>
                  <li>Accessing our blog content and programme resources</li>
                  <li>Viewing our gallery and media content</li>
                </ul>

                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black mb-2 mt-6">3.2 Prohibited Use</h3>
                <p className="text-mid-gray leading-relaxed mb-3">You agree not to:</p>
                <ul className="text-mid-gray leading-relaxed space-y-2 ml-5 list-disc">
                  <li>Use the website in any manner that could damage, disable, or impair the site</li>
                  <li>Attempt to gain unauthorised access to any part of the website or its systems</li>
                  <li>Use automated tools, bots, or scrapers to extract data from the website without prior written permission</li>
                  <li>Submit false, misleading, or fraudulent information through any forms</li>
                  <li>Use the website to transmit malware, spam, or other harmful content</li>
                  <li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity</li>
                  <li>Reproduce, distribute, or commercially exploit our content without authorisation</li>
                  <li>Use any content from the website in a way that misrepresents Tek4All&apos;s mission or activities</li>
                </ul>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">4. Intellectual Property</h2>
                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black mb-2">4.1 Tek4All Content</h3>
                <p className="text-mid-gray leading-relaxed mb-3">
                  All content on this website — including but not limited to text, graphics, logos, images, photographs, videos, data, software, and design — is the property of Tek4All or its content suppliers and is protected by Nigerian and international intellectual property laws. The Tek4All name, logo, and &ldquo;Skilling Lives, Uplifting Minds&rdquo; tagline are proprietary marks of Technology for All Initiative.
                </p>

                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black mb-2 mt-6">4.2 Limited Licence</h3>
                <p className="text-mid-gray leading-relaxed">
                  You are granted a limited, non-exclusive, non-transferable licence to access and view the content on this website for personal, non-commercial, and informational purposes. You may share links to our content and reference our publicly available materials with proper attribution. Any other use, including reproduction, modification, distribution, or republication, requires our prior written consent.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">5. User Submissions</h2>
                <p className="text-mid-gray leading-relaxed mb-3">
                  When you submit information through our website (contact forms, partnership enquiries, volunteer applications, newsletter sign-ups), you:
                </p>
                <ul className="text-mid-gray leading-relaxed space-y-2 ml-5 list-disc">
                  <li>Confirm that the information you provide is accurate and complete</li>
                  <li>Consent to Tek4All storing and processing your submission in accordance with our Privacy Policy</li>
                  <li>Understand that form submissions do not create a binding agreement, employment relationship, or partnership until formally confirmed in writing by Tek4All</li>
                  <li>Accept that we may use the information to contact you regarding your enquiry or related Tek4All activities</li>
                </ul>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">6. Programmes and Services</h2>
                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black mb-2">6.1 Programme Participation</h3>
                <p className="text-mid-gray leading-relaxed mb-3">
                  Participation in Tek4All programmes is subject to eligibility criteria, availability, and any additional terms communicated at the time of registration. We reserve the right to modify, suspend, or discontinue any programme at any time.
                </p>

                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black mb-2 mt-6">6.2 Corporate Training (B2B)</h3>
                <p className="text-mid-gray leading-relaxed mb-3">
                  Corporate training services are subject to separate agreements between Tek4All and the contracting organisation. Enquiries submitted through the website are for informational purposes and do not constitute a binding contract.
                </p>

                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-near-black mb-2 mt-6">6.3 MoonDesk</h3>
                <p className="text-mid-gray leading-relaxed">
                  MoonDesk is a separate product by Tek4All with its own terms of service available at moondesk.tekforall.org. Use of MoonDesk is governed by those terms, not these website Terms of Use.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">7. Volunteering</h2>
                <p className="text-mid-gray leading-relaxed">
                  Volunteer applications submitted through the website are expressions of interest. Acceptance as a volunteer is at Tek4All&apos;s discretion and subject to our volunteer onboarding process, which includes agreement to our Volunteer Handbook, Code of Conduct, and Safeguarding Policy. Volunteers are not employees of Tek4All and do not receive compensation for their services.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">8. Partnerships and Donations</h2>
                <p className="text-mid-gray leading-relaxed">
                  Partnership enquiries and donation offers submitted through the website are preliminary expressions of interest. Formal partnerships are established through written agreements detailing scope, responsibilities, and commitments. Tek4All commits to transparency and accountability in reporting the use of all donations and partnership contributions, in line with our organisational values.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">9. Media and Photographs</h2>
                <p className="text-mid-gray leading-relaxed">
                  Photographs and media content displayed on this website are owned by or licenced to Tek4All. Images of programme participants, beneficiaries, and community members are published only with appropriate consent. You may not download, reproduce, or distribute photographs from this website without prior written permission. Any use of images depicting identifiable individuals requires explicit consent from those individuals or their guardians.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">10. Safeguarding</h2>
                <p className="text-mid-gray leading-relaxed">
                  Tek4All is committed to safeguarding children, young people, and vulnerable adults. All interactions facilitated through this website — including volunteer applications, programme participation, and community engagement — are subject to our safeguarding policies. If you become aware of any safeguarding concern involving Tek4All activities, please report it immediately to <a href="mailto:impact@tekforall.org" className="text-near-black underline">impact@tekforall.org</a>.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">11. Disclaimer of Warranties</h2>
                <p className="text-mid-gray leading-relaxed">
                  This website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, express or implied. Tek4All does not warrant that the website will be uninterrupted, error-free, or free from viruses or other harmful components. While we strive to ensure all information on the website is accurate and up to date, we do not guarantee the completeness, reliability, or accuracy of any content.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">12. Limitation of Liability</h2>
                <p className="text-mid-gray leading-relaxed">
                  To the fullest extent permitted by law, Tek4All, its directors, officers, employees, volunteers, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use this website or our services. This includes, without limitation, damages for loss of data, profits, or other intangible losses. Our total liability for any claim arising from these Terms shall not exceed the amount paid by you (if any) for accessing our services.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">13. External Links</h2>
                <p className="text-mid-gray leading-relaxed">
                  Our website may contain links to third-party websites, including but not limited to partner organisations, social media platforms (Instagram, LinkedIn), and MoonDesk (moondesk.tekforall.org). These links are provided for convenience and do not imply endorsement. Tek4All is not responsible for the content, privacy practices, or terms of use of any third-party website.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">14. Indemnification</h2>
                <p className="text-mid-gray leading-relaxed">
                  You agree to indemnify, defend, and hold harmless Tek4All and its officers, directors, employees, volunteers, and agents from any claims, liabilities, damages, losses, or expenses (including reasonable legal fees) arising from your use of the website, violation of these Terms, or infringement of any third-party rights.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">15. Modifications</h2>
                <p className="text-mid-gray leading-relaxed">
                  Tek4All reserves the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to this page. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision. Your continued use of the website after any changes constitutes acceptance of the revised terms. We recommend reviewing this page periodically.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">16. Governing Law and Dispute Resolution</h2>
                <p className="text-mid-gray leading-relaxed">
                  These Terms of Use are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from or in connection with these Terms shall first be resolved through good-faith negotiation. If unresolved, disputes shall be submitted to mediation, and if mediation fails, to the jurisdiction of the courts of the Federal Capital Territory, Abuja, Nigeria.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">17. Severability</h2>
                <p className="text-mid-gray leading-relaxed">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                </p>
              </div>

              <div className="pt-6" style={{ borderTop: "1px solid #e5e5e5" }}>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-near-black mb-3">Contact Us</h2>
                <p className="text-mid-gray leading-relaxed">
                  For questions about these Terms of Use, please contact us:
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
