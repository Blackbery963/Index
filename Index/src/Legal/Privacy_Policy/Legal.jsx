// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { MdBook } from 'react-icons/md';
// import { FaInfoCircle, FaHome, FaUser } from 'react-icons/fa';

// const Legal = () => {
//   const policySections = [
//     {
//       title: "Preamble & Definitions",
//       content: `WHEREAS Painters' Diary ("Platform", "Service", "We", "Us", "Our") provides digital artistic services; AND WHEREAS the User ("You", "Your") desires to utilize said services; NOW THEREFORE, the parties hereby agree to the following terms governing data collection and processing:

// 1.1 "Personal Data" shall mean any information relating to an identified or identifiable natural person, including but not limited to: identifiers (name, ID numbers, online identifiers); demographic information; commercial information; biometric data; internet activity; geolocation data; and inferences drawn therefrom.

// 1.2 "Processing" means any operation performed on Personal Data, whether automated or manual, including: collection, recording, organization, structuring, storage, adaptation, retrieval, consultation, use, disclosure, dissemination, alignment, combination, restriction, erasure, or destruction.`
//     },
//     {
//       title: "Data Collection Protocol",
//       content: `2.1 The Platform shall collect, inter alia, the following data categories:
// (a) Identifiers: Name, email, IP address, device identifiers, account credentials;
// (b) Commercial Information: Transaction history, preferences, feedback;
// (c) Technical Data: Browser type, operating system, usage patterns;
// (d) Geolocation Data: Approximate physical location derived from IP;
// (e) Inferences: User preferences, characteristics, predispositions.

// 2.2 Data collection modalities include:
// • Direct user input through interface elements
// • Automated tracking technologies (cookies, beacons, scripts)
// • Third-party data enrichment services
// • Analytics platforms and advertising networks`
//     },
//     {
//       title: "Processing Purposes & Legal Bases",
//       content: `3.1 Personal Data shall be processed for the following legitimate business interests:
// • Service provision and functionality enhancement
// • User authentication and account management
// • Platform security and fraud prevention
// • Analytics and performance optimization
// • Marketing communications (subject to opt-out)
// • Compliance with legal obligations

// 3.2 Legal bases for processing include:
// (a) Contractual necessity for core service delivery;
// (b) Legitimate business interests, weighed against user rights;
// (c) Legal compliance requirements;
// (d) With user consent where expressly required.`
//     },
//     {
//       title: "Data Retention Framework",
//       content: `4.1 Retention periods shall be determined by:
// • The original collection purpose
// • Ongoing business needs
// • Legal and regulatory requirements
// • User account status (active/suspended/terminated)

// 4.2 Standard retention schedule:
// • Account data: 3 years post-termination
// • Transaction records: 7 years for tax compliance
// • Analytics data: 25 months from collection
// • Marketing preferences: Until withdrawal of consent

// 4.3 Notwithstanding the foregoing, data may be retained:
// • For litigation holds
// • During dispute resolution
// • For historical research (in anonymized form)
// • When required by competent authorities`
//     },
//     {
//       title: "Third-Party Disclosures",
//       content: `5.1 Categories of recipients include:
// • Payment processors (Stripe, PayPal)
// • Cloud service providers (AWS, Google Cloud)
// • Analytics providers (Google Analytics, Mixpanel)
// • Marketing platforms (Mailchimp, HubSpot)
// • Customer support systems (Zendesk, Intercom)

// 5.2 International data transfers shall:
// • Comply with Chapter V of GDPR
// • Utilize Standard Contractual Clauses where applicable
// • Implement supplementary measures as needed
// • Disclose cross-border transfers in our DPA`
//     },
//     {
//       title: "User Rights & Obligations",
//       content: `6.1 Users may exercise the following rights, subject to verification:
// • Right of access (Article 15 GDPR)
// • Right to rectification (Article 16 GDPR)
// • Right to erasure (Article 17 GDPR)
// • Right to restriction (Article 18 GDPR)
// • Right to data portability (Article 20 GDPR)
// • Right to object (Article 21 GDPR)

// 6.2 Request procedures:
// • Submit authenticated request via account portal
// • Provide sufficient identification evidence
// • Allow 30 days for response (may be extended)
// • No fee unless manifestly unfounded/excessive`
//     },
//     {
//       title: "Security Measures",
//       content: `7.1 Technical safeguards include:
// • AES-256 encryption for data at rest
// • TLS 1.3 for data in transit
// • Regular penetration testing
// • Multi-factor authentication
// • Role-based access controls
// • Anonymization/pseudonymization where feasible

// 7.2 Organizational measures comprise:
// • Data protection training for staff
// • Confidentiality agreements
// • Access logging and monitoring
// • Incident response protocols
// • Vendor security assessments`
//     },
//     {
//       title: "Policy Amendments",
//       content: `8.1 We reserve the unilateral right to modify this Policy:
// • To reflect processing changes
// • For legal/regulatory compliance
// • To incorporate new technologies
// • For business practice updates

// 8.2 Material changes will be communicated via:
// • Platform notifications (30 days prior)
// • Email to registered users
// • Updated revision date (below)
// • Archive of previous versions`
//     }
//   ];

//   return (
//  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
//       {/* Header */}
//       <header className="h-[80px] w-full bg-black/20 backdrop-blur-md flex items-center justify-between px-4 fixed z-50">
//         <h1 className="lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] font-bold font-Eagle text-[#190909] dark:text-white">
//           Painters' Diary
//         </h1>
//         <div className="flex items-center justify-center gap-x-2">
//           <Link to="/">
//             <button className="lg:px-4 px-2 py-1 hover:text-[#2d1f23] rounded-md font-Playfair text-white text-[18px]">
//               <FaHome className="text-xl sm:hidden" />
//               <span className="hidden sm:inline">Home</span>
//             </button>
//           </Link>
//           <Link to="/About">
//             <button className="lg:px-4 px-2 py-1 hover:text-[#2d1f23] rounded-md font-Playfair text-white text-[18px]">
//               <FaInfoCircle className="text-xl sm:hidden" />
//               <span className="hidden sm:inline">About</span>
//             </button>
//           </Link>
//           <Link to="/Account">
//             <button className="lg:px-4 px-2 py-1 hover:text-[#2d1f23] rounded-md font-Playfair text-white text-[18px]">
//               <FaUser className="text-xl sm:hidden" />
//               <span className="hidden sm:inline">Account</span>
//             </button>
//           </Link>
//           <Link to="/Journal">
//             <button className="lg:px-4 px-2 py-1 hover:text-[#2d1f23] rounded-md font-Playfair text-white text-[18px]">
//               <MdBook className="text-xl sm:hidden" />
//               <span className="hidden sm:inline">Diary</span>
//             </button>
//           </Link>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
//           <div className="p-8 bg-gradient-to-r from-rose-900 to-rose-700 text-white">
//             <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-2">Privacy Policy</h1>
//             <p className="text-rose-100 font-medium">
//               Last Updated:{' '}
//               {new Date().toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//               })}
//             </p>
//           </div>

//           <div className="p-6 sm:p-8">
//             <div className="prose prose-lg max-w-none dark:prose-invert">
//               {policySections.map((section, index) => (
//                 <section key={index} className="mb-12">
//                   <h2 className="text-2xl font-serif font-semibold text-rose-800 dark:text-rose-300 border-b border-rose-200 dark:border-rose-500 pb-2 mb-4">
//                     Article {index + 1}: {section.title}
//                   </h2>
//                   <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-Quicksand">
//                     {section.content.split('\n').map((paragraph, i) => (
//                       <p key={i} className="mb-4">
//                         {paragraph}
//                       </p>
//                     ))}
//                   </div>
//                 </section>
//               ))}
//             </div>

//             <div className="mt-12 p-6 bg-rose-50 dark:bg-rose-900 rounded-lg border border-rose-200 dark:border-rose-600">
//               <h3 className="text-xl font-serif font-semibold text-rose-800 dark:text-rose-200 mb-3">Acknowledgement</h3>
//               <p className="text-gray-700 dark:text-gray-300 mb-4">
//                 BY CONTINUING TO USE THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE REVIEWED THIS PRIVACY POLICY IN ITS ENTIRETY, UNDERSTAND ITS TERMS, AND CONSENT TO ALL DATA PROCESSING ACTIVITIES DESCRIBED HEREIN.
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 This document constitutes the entire agreement between you and Painters' Diary regarding privacy matters and supersedes all prior agreements or understandings, whether written or oral.
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-6">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="mb-4 md:mb-0">
//               <p className="text-sm">
//                 &copy; {new Date().getFullYear()} Painters' Diary. All rights reserved.
//               </p>
//             </div>
//             <div className="flex space-x-4">
//               <Link to="/Legal/Terms_Conditions" className="text-sm hover:text-rose-300">
//                 Terms of Service
//               </Link>
//               <Link to="/Legal/License" className="text-sm hover:text-rose-300">
//                 License
//               </Link>
//               <Link to="/contact" className="text-sm hover:text-rose-300">
//                 Contact
//               </Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )}
// export default Legal

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { User } from 'lucide-react';

const Legal = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const policySections = [
    {
      title: "ARTICLE I: PREAMBLE AND DEFINITIONS",
      content: `THIS PRIVACY POLICY ("Policy") constitutes a legally binding agreement between Painters' Diary ("Data Controller", "Us", "We") and the User ("Data Subject", "You"). By accessing the Platform, You hereby explicitly acknowledge and consent to the data processing practices stipulated herein.

1.1 "Personally Identifiable Information" (PII) refers to any representation of information that permits the identity of an individual to whom the information applies to be reasonably inferred by either direct or indirect means.

1.2 "Processing" implies any operation or set of operations which is performed on personal data or on sets of personal data, whether or not by automated means, such as collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction.`
    },
    {
      title: "ARTICLE II: DATA COLLECTION MECHANISMS",
      content: `2.1 Direct Acquisition: We collect data explicitly provided by the Data Subject pursuant to the creation of a user profile, including but not limited to legal nomenclature, electronic mail addresses, and authentication credentials.

2.2 Automated Surveillance: The Platform utilizes algorithmic tracking technologies, including persistent cookies and beacons, to aggregate telemetry regarding user interaction, device configuration, network latency, and User Agent strings.

2.3 Third-Party Integration: We may actively aggregate data from external authentication providers (e.g., Google OAuth) contingent upon Your authorization settings within said third-party infrastructures.`
    },
    {
      title: "ARTICLE III: LEGAL BASIS FOR PROCESSING",
      content: `3.1 Contractual Necessity: Processing is requisite for the performance of the Service Agreement to which the Data Subject is party.

3.2 Legitimate Interests: Data may be processed for purposes of fraud mitigation, network security diagnostics, and the optimization of proprietary algorithms, provided such interests are not overridden by the fundamental rights and freedoms of the Data Subject.

3.3 Compliance: Processing is mandated by applicable statutory obligations, including tax reporting (e.g., VAT/GST compliance) and law enforcement cooperation protocols.`
    },
    {
      title: "ARTICLE IV: TELEMETRY AND LOCAL STORAGE PROTOCOLS",
      content: `4.1 Cookies and Local Storage: The Platform employs "Cookies" (small text files placed on Your device) and HTML5 Local Storage to facilitate session management, preferences retention, and authentication persistence.

4.2 Analytical Scripts: We utilize proprietary and third-party scripts to collect non-PII metrics regarding traffic sources, dwell time, and click-through rates. You may disable these scripts via browser-level content blocking, though this may result in a degradation of Platform functionality.`
    },
    {
      title: "ARTICLE V: DATA RETENTION AND ARCHIVAL",
      content: `5.1 Temporal Limitation: PII shall not be retained longer than is necessary for the purposes for which the personal data are processed.

5.2 Archival Procedures: Upon account termination, data enters a "Soft Deletion" state for thirty (30) days, after which it is permanently expunged from production databases, notwithstanding residual copies existing in immutable backup archives for a period not exceeding seven (7) years for regulatory compliance and audit trails.`
    },
    {
      title: "ARTICLE VI: DISCLOSURE TO THIRD PARTIES",
      content: `6.1 We do not sell PII. However, disclosure may occur under the following circumstances:
(a) To sub-processors (e.g., cloud infrastructure providers, payment gateways) bound by strict Data Processing Agreements (DPAs);
(b) Pursuant to a valid court order, subpoena, or other legal process;
(c) In the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of the Data Controller's assets.`
    },
    {
      title: "ARTICLE VII: INTERNATIONAL DATA TRANSFERS",
      content: `7.1 Cross-Border Transmission: Information collected may be stored and processed in any country where We engage service providers. By using the Service, You consent to the transfer of information to countries outside of Your country of residence, including the United States, which may have data protection rules that differ from those of Your country.

7.2 Safeguards: All international transfers are conducted in accordance with Standard Contractual Clauses (SCCs) approved by the European Commission or equivalent mechanisms ensuring adequate levels of protection.`
    },
    {
      title: "ARTICLE VIII: INTELLECTUAL PROPERTY AND USER CONTENT",
      content: `8.1 User-Generated Content: While You retain copyright over the artistic works uploaded to the Platform, You grant Us a non-exclusive, worldwide, royalty-free license to display, reproduce, and adapt said content strictly for the purpose of operating and promoting the Service.

8.2 Metadata Ownership: Any metadata, tagging structures, or algorithmic categorizations derived from Your content processing shall remain the sole intellectual property of the Platform.`
    },
    {
      title: "ARTICLE IX: COMPLIANCE WITH COPPA (CHILDREN'S PRIVACY)",
      content: `9.1 Age Restriction: The Service is not directed to individuals under the age of thirteen (13). We do not knowingly collect PII from children under 13. If We become aware that a child under 13 has provided Us with PII, We will take steps to delete such information.

9.2 Parental Control: If You become aware that Your child has provided Us with Personal Data without Your consent, You must contact Us immediately at the provided legal channels.`
    },
    {
      title: "ARTICLE X: INDEMNIFICATION",
      content: `10.1 You agree to defend, indemnify, and hold harmless the Data Controller, its licensees, and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) Your use and access of the Service, or b) a breach of this Policy.`
    },
    {
      title: "ARTICLE XI: LIMITATION OF LIABILITY",
      content: `11.1 To the maximum extent permitted by applicable law, the Data Controller shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from unauthorized access to or use of our servers and/or any personal information stored therein.`
    },
    {
      title: "ARTICLE XII: GOVERNING LAW AND SEVERABILITY",
      content: `12.1 Jurisdiction: This Policy shall be governed and construed in accordance with the laws of the jurisdiction in which the Data Controller is incorporated, without regard to its conflict of law provisions.

12.2 Severability: If any provision of this Policy is held to be invalid or unenforceable by a court, the remaining provisions of this Policy will remain in effect.`
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-300 font-sans text-sm md:text-base">
      
      {/* HEADER: Clean, Left-Aligned Logo, Right-Aligned User */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 z-50">
        <div className="flex items-center">
          <Link to="/" className="text-lg font-bold tracking-tight text-black dark:text-white font-Eagle">
            Painters' Diary
          </Link>
        </div>
        <div>
          <Link to="/Account" className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            <User size={18} />
          </Link>
        </div>
      </header>

      {/* MAIN DOCUMENT CONTAINER */}
      <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        
        {/* DOCUMENT TITLE */}
        <div className="mb-12 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2 uppercase tracking-wide">Privacy Policy</h1>
          <p className="text-zinc-500 font-mono text-xs">
            Effective Date: {lastUpdated} | Document Ref: PD-LGL-2025-v2.0
          </p>
        </div>

        {/* CONTENT BLOCKS */}
        <div className="space-y-12">
          {policySections.map((section, index) => (
            <section key={index} className="flex flex-col gap-3">
              <h2 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider">
                {section.title}
              </h2>
              <div className="text-zinc-700 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap text-justify selection:bg-zinc-200 dark:selection:bg-zinc-800">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* FOOTER BLOCK */}
        <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 mb-6 text-justify">
            NOTICE: This document constitutes a binding agreement between You and the Platform. We reserve the right to amend these terms at any time. Continued use of the Service following any changes signifies Your acceptance of the new terms. If you have inquiries regarding this document, specific legal rights, or compliance protocols, correspondence should be directed to our legal department via the designated channels.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 text-xs font-bold uppercase tracking-wide text-black dark:text-white">
            <a href="mailto:legal@painterdiary.com" className="hover:underline">Legal Contact</a>
            <Link to="/Legal/Terms" className="hover:underline">Terms of Service</Link>
            <Link to="/Legal/Cookies" className="hover:underline">Cookie Policy</Link>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Legal;