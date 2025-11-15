import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdBook } from 'react-icons/md';
import { FaInfoCircle, FaHome, FaUser } from 'react-icons/fa';

const Legal = () => {
  const policySections = [
    {
      title: "Preamble & Definitions",
      content: `WHEREAS Painters' Diary ("Platform", "Service", "We", "Us", "Our") provides digital artistic services; AND WHEREAS the User ("You", "Your") desires to utilize said services; NOW THEREFORE, the parties hereby agree to the following terms governing data collection and processing:

1.1 "Personal Data" shall mean any information relating to an identified or identifiable natural person, including but not limited to: identifiers (name, ID numbers, online identifiers); demographic information; commercial information; biometric data; internet activity; geolocation data; and inferences drawn therefrom.

1.2 "Processing" means any operation performed on Personal Data, whether automated or manual, including: collection, recording, organization, structuring, storage, adaptation, retrieval, consultation, use, disclosure, dissemination, alignment, combination, restriction, erasure, or destruction.`
    },
    {
      title: "Data Collection Protocol",
      content: `2.1 The Platform shall collect, inter alia, the following data categories:
(a) Identifiers: Name, email, IP address, device identifiers, account credentials;
(b) Commercial Information: Transaction history, preferences, feedback;
(c) Technical Data: Browser type, operating system, usage patterns;
(d) Geolocation Data: Approximate physical location derived from IP;
(e) Inferences: User preferences, characteristics, predispositions.

2.2 Data collection modalities include:
• Direct user input through interface elements
• Automated tracking technologies (cookies, beacons, scripts)
• Third-party data enrichment services
• Analytics platforms and advertising networks`
    },
    {
      title: "Processing Purposes & Legal Bases",
      content: `3.1 Personal Data shall be processed for the following legitimate business interests:
• Service provision and functionality enhancement
• User authentication and account management
• Platform security and fraud prevention
• Analytics and performance optimization
• Marketing communications (subject to opt-out)
• Compliance with legal obligations

3.2 Legal bases for processing include:
(a) Contractual necessity for core service delivery;
(b) Legitimate business interests, weighed against user rights;
(c) Legal compliance requirements;
(d) With user consent where expressly required.`
    },
    {
      title: "Data Retention Framework",
      content: `4.1 Retention periods shall be determined by:
• The original collection purpose
• Ongoing business needs
• Legal and regulatory requirements
• User account status (active/suspended/terminated)

4.2 Standard retention schedule:
• Account data: 3 years post-termination
• Transaction records: 7 years for tax compliance
• Analytics data: 25 months from collection
• Marketing preferences: Until withdrawal of consent

4.3 Notwithstanding the foregoing, data may be retained:
• For litigation holds
• During dispute resolution
• For historical research (in anonymized form)
• When required by competent authorities`
    },
    {
      title: "Third-Party Disclosures",
      content: `5.1 Categories of recipients include:
• Payment processors (Stripe, PayPal)
• Cloud service providers (AWS, Google Cloud)
• Analytics providers (Google Analytics, Mixpanel)
• Marketing platforms (Mailchimp, HubSpot)
• Customer support systems (Zendesk, Intercom)

5.2 International data transfers shall:
• Comply with Chapter V of GDPR
• Utilize Standard Contractual Clauses where applicable
• Implement supplementary measures as needed
• Disclose cross-border transfers in our DPA`
    },
    {
      title: "User Rights & Obligations",
      content: `6.1 Users may exercise the following rights, subject to verification:
• Right of access (Article 15 GDPR)
• Right to rectification (Article 16 GDPR)
• Right to erasure (Article 17 GDPR)
• Right to restriction (Article 18 GDPR)
• Right to data portability (Article 20 GDPR)
• Right to object (Article 21 GDPR)

6.2 Request procedures:
• Submit authenticated request via account portal
• Provide sufficient identification evidence
• Allow 30 days for response (may be extended)
• No fee unless manifestly unfounded/excessive`
    },
    {
      title: "Security Measures",
      content: `7.1 Technical safeguards include:
• AES-256 encryption for data at rest
• TLS 1.3 for data in transit
• Regular penetration testing
• Multi-factor authentication
• Role-based access controls
• Anonymization/pseudonymization where feasible

7.2 Organizational measures comprise:
• Data protection training for staff
• Confidentiality agreements
• Access logging and monitoring
• Incident response protocols
• Vendor security assessments`
    },
    {
      title: "Policy Amendments",
      content: `8.1 We reserve the unilateral right to modify this Policy:
• To reflect processing changes
• For legal/regulatory compliance
• To incorporate new technologies
• For business practice updates

8.2 Material changes will be communicated via:
• Platform notifications (30 days prior)
• Email to registered users
• Updated revision date (below)
• Archive of previous versions`
    }
  ];

  return (
 <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="h-[80px] w-full bg-black/20 backdrop-blur-md flex items-center justify-between px-4 fixed z-50">
        <h1 className="lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] font-bold font-Eagle text-[#190909] dark:text-white">
          Painters' Diary
        </h1>
        <div className="flex items-center justify-center gap-x-2">
          <Link to="/">
            <button className="lg:px-4 px-2 py-1 hover:text-[#2d1f23] rounded-md font-Playfair text-white text-[18px]">
              <FaHome className="text-xl sm:hidden" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </Link>
          <Link to="/About">
            <button className="lg:px-4 px-2 py-1 hover:text-[#2d1f23] rounded-md font-Playfair text-white text-[18px]">
              <FaInfoCircle className="text-xl sm:hidden" />
              <span className="hidden sm:inline">About</span>
            </button>
          </Link>
          <Link to="/Account">
            <button className="lg:px-4 px-2 py-1 hover:text-[#2d1f23] rounded-md font-Playfair text-white text-[18px]">
              <FaUser className="text-xl sm:hidden" />
              <span className="hidden sm:inline">Account</span>
            </button>
          </Link>
          <Link to="/Journal">
            <button className="lg:px-4 px-2 py-1 hover:text-[#2d1f23] rounded-md font-Playfair text-white text-[18px]">
              <MdBook className="text-xl sm:hidden" />
              <span className="hidden sm:inline">Diary</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 bg-gradient-to-r from-rose-900 to-rose-700 text-white">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-2">Privacy Policy</h1>
            <p className="text-rose-100 font-medium">
              Last Updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {policySections.map((section, index) => (
                <section key={index} className="mb-12">
                  <h2 className="text-2xl font-serif font-semibold text-rose-800 dark:text-rose-300 border-b border-rose-200 dark:border-rose-500 pb-2 mb-4">
                    Article {index + 1}: {section.title}
                  </h2>
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-Quicksand">
                    {section.content.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 p-6 bg-rose-50 dark:bg-rose-900 rounded-lg border border-rose-200 dark:border-rose-600">
              <h3 className="text-xl font-serif font-semibold text-rose-800 dark:text-rose-200 mb-3">Acknowledgement</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                BY CONTINUING TO USE THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE REVIEWED THIS PRIVACY POLICY IN ITS ENTIRETY, UNDERSTAND ITS TERMS, AND CONSENT TO ALL DATA PROCESSING ACTIVITIES DESCRIBED HEREIN.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This document constitutes the entire agreement between you and Painters' Diary regarding privacy matters and supersedes all prior agreements or understandings, whether written or oral.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Painters' Diary. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/Legal/Terms_Conditions" className="text-sm hover:text-rose-300">
                Terms of Service
              </Link>
              <Link to="/Legal/License" className="text-sm hover:text-rose-300">
                License
              </Link>
              <Link to="/contact" className="text-sm hover:text-rose-300">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )}
export default Legal