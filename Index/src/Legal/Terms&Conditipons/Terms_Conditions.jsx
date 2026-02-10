// import React, { useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const TermsAndConditions = () => {
//   useEffect(() => {
//     AOS.init({ duration: 800, once: true });
//   }, []);

//   return (
//     <div className="terms-container">
//       <Helmet>
//         <title>Terms and Conditions - Painters' Diary</title>
//         <meta name="description" content="Comprehensive terms and conditions governing the use of Painters' Diary platform for artists and art enthusiasts" />
//         <meta name="keywords" content="art platform terms, painters diary conditions, user agreement, content policy" />
//       </Helmet>

//       <header className="terms-header">
//         <div className="container">
//           <h1>Painters' Diary Terms and Conditions</h1>
//           <p className="header-subtitle">Last Updated: June 22, 2025 | Effective Immediately</p>
//         </div>
//       </header>

//       <main className="w-[90%] max-w-5xl mx-auto py-12 md:py-16">
//         <section data-aos="fade-up">
//           <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
//             Terms and Conditions
//           </h1>
//           <p className="text-center text-neutral-400 mb-12">
//             Last Updated: June 22, 2025
//           </p>

//           <div className="space-y-8 text-sm md:text-base leading-relaxed">
//             {/* Introduction */}
//             <div data-aos="fade-up" data-aos-delay="100">
//               <h2 className="text-xl md:text-2xl font-semibold">1. Preamble and Contractual Acceptance</h2>
//               <p>
//                 This comprehensive legal instrument, hereinafter referred to as the "Terms and Conditions" or "Agreement," constitutes a binding contractual obligation between you, the individual or entity accessing, utilizing, or otherwise engaging with the digital platform known as Painters' Diary (hereinafter referred to as the "Platform," "Service," "Website," "We," "Us," or "Our"), accessible via the uniform resource locator{' '}
//                 <a
//                   href="https://www.paintersdiary.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-400 hover:underline"
//                 >
//                   https://www.paintersdiary.com
//                 </a>, including but not limited to all subdomains, mobile applications, application programming interfaces (APIs), and ancillary services provided thereunder. By engaging with the Platform in any capacity, whether through browsing, account creation, content submission, or any other interaction, you expressly acknowledge and irrevocably assent to be bound by the entirety of this Agreement, including all policies, guidelines, and addenda incorporated herein by reference.
//               </p>
//               <p>
//                 The Platform, designed as a virtual sanctuary for artists, creators, and aficionados of the fine arts, imposes upon you, the User (hereinafter "You," "Your," or "User"), a legal obligation to comply with all stipulations herein. Should you, or any entity you represent, find any provision of this Agreement unacceptable, you are hereby directed to immediately cease all interaction with the Platform to avoid incurring legal liability.
//               </p>
//               <div className="border-l-4 border-blue-400 pl-4 mt-4">
//                 <h3 className="text-lg font-semibold">Notice of Legal Binding</h3>
//                 <p>
//                   Your engagement with the Platform constitutes an affirmative representation that you have thoroughly reviewed, comprehended, and unconditionally accepted these Terms in their entirety; that you consent to all supplementary rules, community standards, and operational policies referenced herein; that you satisfy all eligibility criteria delineated in Section 2; and, where applicable, that you possess full legal authority to bind any represented entity to these Terms. Non-compliance with these conditions mandates immediate cessation of Platform use.
//                 </p>
//               </div>
//             </div>

//             {/* Eligibility */}
//             <div data-aos="fade-up" data-aos-delay="200">
//               <h2 className="text-xl md:text-2xl font-semibold">2. Eligibility and Registration Prerequisites</h2>
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold">2.1 Age and Jurisdictional Capacity</h3>
//                 <p>
//                   The Platform is expressly intended for individuals and entities possessing the requisite legal capacity to enter into binding agreements. To access and utilize the Platform, you must be at least thirteen (13) years of age. Individuals under the age of majority in their respective jurisdiction (typically eighteen (18)) must procure verifiable parental or legal guardian consent, evidenced by written documentation submitted to{' '}
//                   <a
//                     href="mailto:support@paintersdiary.com"
//                     className="text-blue-400 hover:underline"
//                   >
//                     support@paintersdiary.com
//                   </a>, supervised account creation, or explicit guardian acceptance of these Terms. Adult users affirm full legal capacity under applicable jurisdictional laws, and institutional users must be duly authorized representatives with binding authority.
//                 </p>
//               </div>
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold">2.2 Registration and Verification Protocols</h3>
//                 <p>
//                   Access to certain premium functionalities of the Platform necessitates completion of a multifaceted registration process, designed to ensure compliance with legal and operational standards. This process encompasses:
//                 </p>
//                 <ol className="list-decimal pl-6 space-y-2">
//                   <li>
//                     <strong>Submission of Foundational Information:</strong> You shall provide accurate and complete particulars, including but not limited to your legal name, a verifiable email address, and a password adhering to stringent security requirements (minimum twelve (12) characters, incorporating alphanumeric and special characters).
//                   </li>
//                   <li>
//                     <strong>Profile Establishment for Artistic Engagement:</strong> Artist accounts require submission of a portfolio comprising no fewer than three (3) original works, an artist statement of at least one hundred fifty (150) words articulating creative intent, and a professional profile image compliant with Platform specifications.
//                   </li>
//                   <li>
//                     <strong>Verification for Commercial Transactions:</strong> Accounts engaging in commercial activities must furnish government-issued identification, tax documentation for payment processing, and, where applicable, business registration documents to validate legal status and compliance with fiscal regulations.
//                   </li>
//                 </ol>
//                 <p className="mt-2">
//                   All sensitive data submitted during registration is safeguarded using 256-bit encryption protocols, consistent with industry-leading security standards. For further details on data handling, consult our{' '}
//                   <a
//                     href="/privacy-policy"
//                     className="text-blue-400 hover:underline"
//                   >
//                     Privacy Policy
//                   </a>.
//                 </p>
//               </div>
//             </div>

//             {/* Content Policy */}
//             <div data-aos="fade-up" data-aos-delay="300">
//               <h2 className="text-xl md:text-2xl font-semibold">3. Content Policy and Intellectual Property Framework</h2>
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold">3.1 Ownership and Licensing Structure</h3>
//                 <p>
//                   Recognizing the paramount importance of creative ownership, Painters' Diary establishes a tiered licensing framework to govern User Content, defined as any artwork, diary entries, comments, or other materials submitted to the Platform. By uploading User Content, you grant Painters' Diary the following licenses, contingent upon your account type:
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                   <div className="border p-4 rounded-lg">
//                     <h4 className="font-semibold">Standard License</h4>
//                     <ul className="list-disc pl-4">
//                       <li>Applicable to all non-commercial accounts.</li>
//                       <li>Grants a non-exclusive, worldwide, royalty-free license to display, reproduce, and distribute User Content for Platform operations.</li>
//                       <li>Includes rights for promotional activities across digital and physical media.</li>
//                       <li>Permits sublicensing to technical service providers for operational purposes.</li>
//                     </ul>
//                   </div>
//                   <div className="border p-4 rounded-lg">
//                     <h4 className="font-semibold">Commercial License</h4>
//                     <ul className="list-disc pl-4">
//                       <li>Optional for users engaging in sales.</li>
//                       <li>Extends to print-on-demand and limited merchandising rights.</li>
//                       <li>Subject to a fifteen percent (15%) commission on all transactions.</li>
//                       <li>Requires explicit opt-in during account configuration.</li>
//                     </ul>
//                   </div>
//                   <div className="border p-4 rounded-lg">
//                     <h4 className="font-semibold">Premium License</h4>
//                     <ul className="list-disc pl-4">
//                       <li>Reserved for professional accounts with verified status.</li>
//                       <li>Negotiated on a case-by-case basis with bespoke terms.</li>
//                       <li>Includes revenue-sharing arrangements and potential gallery representation.</li>
//                       <li>Subject to additional contractual agreements.</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold">3.2 Prohibited Content Taxonomy</h3>
//                 <p>
//                   To preserve the integrity of our creative ecosystem, the Platform strictly prohibits the submission of User Content that falls within the following classifications:
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                   <div className="border p-4 rounded-lg">
//                     <h4 className="font-semibold">Legal Infractions</h4>
//                     <ul className="list-disc pl-4">
//                       <li>Infringement of copyrights, trademarks, or other intellectual property rights.</li>
//                       <li>Distribution of counterfeit or fraudulent artistic works.</li>
//                       <li>Depictions of regulated substances or activities in violation of applicable laws.</li>
//                     </ul>
//                   </div>
//                   <div className="border p-4 rounded-lg">
//                     <h4 className="font-semibold">Community Standards Violations</h4>
//                     <ul className="list-disc pl-4">
//                       <li>Content promoting hate speech, discrimination, or harassment based on protected characteristics.</li>
//                       <li>Non-consensual imagery or materials violating privacy rights.</li>
//                       <li>Glorification or graphic depiction of violence or harm.</li>
//                     </ul>
//                   </div>
//                   <div className="border p-4 rounded-lg">
//                     <h4 className="font-semibold">Deceptive or Misleading Practices</h4>
//                     <ul className="list-disc pl-4">
//                       <li>Misrepresentation of AI-generated content as human-created art.</li>
//                       <li>Engagement in artificial inflation of metrics or fake engagement services.</li>
//                       <li>Plagiarism of artist statements, biographies, or creative works.</li>
//                     </ul>
//                   </div>
//                 </div>
//                 <p className="mt-2">
//                   We reserve the right to remove, suspend, or otherwise restrict access to any User Content deemed non-compliant with these standards, with or without prior notice, at our sole discretion.
//                 </p>
//               </div>
//             </div>

//             {/* Contact and Dispute Resolution */}
//             <div data-aos="fade-up" data-aos-delay="400">
//               <h2 className="text-xl md:text-2xl font-semibold">4. Contact Information and Dispute Resolution Mechanisms</h2>
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold">4.1 Communication Channels</h3>
//                 <p>
//                   For inquiries, concerns, or formal communications regarding these Terms or the Platform, the following designated contact points are available:
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                   <div className="border p-4 rounded-lg">
//                     <h4 className="font-semibold">General Inquiries</h4>
//                     <p>
//                       Email:{' '}
//                       <a
//                         href="mailto:support@paintersdiary.com"
//                         className="text-blue-400 hover:underline"
//                       >
//                         support@paintersdiary.com
//                       </a>
//                     </p>
//                     <p>Expected Response Time: Within two (2) business days.</p>
//                   </div>
//                   <div className="border p-4 rounded-lg">
//                     <h4 className="font-semibold">Legal Correspondence</h4>
//                     <p>
//                       Email:{' '}
//                       <a
//                         href="mailto:legal@paintersdiary.com"
//                         className="text-blue-400 hover:underline"
//                       >
//                         legal@paintersdiary.com
//                       </a>
//                     </p>
//                     <p>Registered Agent: LegalDiary Services LLC, Mumbai, India.</p>
//                   </div>
//                   <div className="border p-4 rounded-lg">
//                     <h4 className="font-semibold">Copyright and Intellectual Property Claims</h4>
//                     <p>
//                       DMCA Designated Agent:{' '}
//                       <a
//                         href="mailto:copyright@paintersdiary.com"
//                         className="text-blue-400 hover:underline"
//                       >
//                         copyright@paintersdiary.com
//                       </a>
//                     </p>
//                     <p>Physical Address: 123 Creative Lane, Mumbai, Maharashtra, India.</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold">4.2 Dispute Resolution Framework</h3>
//                 <p>
//                   In the event of any dispute, controversy, or claim arising out of or relating to these Terms or your use of the Platform, the following multi-tiered resolution process shall apply:
//                 </p>
//                 <ol className="list-decimal pl-6 space-y-2">
//                   <li>
//                     <strong>Written Notice of Dispute:</strong> The aggrieved party shall submit a detailed written notice to the other party, specifying the nature of the dispute and proposed remedies. A thirty (30) calendar day period for amicable resolution shall commence upon receipt of such notice.
//                   </li>
//                   <li>
//                     <strong>Mediation:</strong> Should the dispute remain unresolved, the parties agree to submit to non-binding mediation under the Commercial Mediation Rules of the American Arbitration Association (AAA), conducted in Mumbai, India, with costs shared equally unless otherwise agreed.
//                   </li>
//                   <li>
//                     <strong>Binding Arbitration:</strong> If mediation fails, the dispute shall be resolved through binding arbitration in Mumbai, India, administered by a single arbitrator under the AAA Commercial Arbitration Rules. The arbitrator’s decision shall be final and enforceable in any court of competent jurisdiction.
//                   </li>
//                   <li>
//                     <strong>Small Claims Exception:</strong> Disputes within the jurisdictional limits of small claims courts in Mumbai, India, may be pursued in such courts at the discretion of the claimant.
//                   </li>
//                 </ol>
//                 <p className="mt-2">
//                   These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any legal action or proceeding shall be instituted exclusively in the courts of Mumbai, India.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="terms-footer">
//         <div className="container footer-content">
//           <div className="footer-links">
//             <a href="/privacy">Privacy Policy</a>
//             <a href="/cookies">Cookie Policy</a>
//             <a href="/community">Community Guidelines</a>
//             <a href="/security">Security Information</a>
//           </div>
//           <div className="copyright-notice">
//             <p>© 2025 Painters' Diary International. All rights reserved.</p>
//             <p>Patent Pending Technologies | VAT ID: [Number] | ISSN: [Number]</p>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         :root {
//           --primary: #4a322b; /* Darker brown for headers and accents */
//           --secondary: #6d4c41; /* Muted brown for secondary elements */
//           --accent: #3c2f2f; /* Dark accent for borders and highlights */
//           --text: #e0e0e0; /* Light gray for text */
//           --background: #1a1a1a; /* Dark background */
//           --card-bg: #252525; /* Slightly lighter dark for cards */
//           --error: #ef5350; /* Red for errors */
//           --success: #4caf50; /* Green for success */
//         }

//         .terms-container {
//           font-family: 'Crimson Text', Georgia, serif;
//           line-height: 1.8;
//           color: var(--text);
//           background-color: var(--background);
//           font-size: 1.1rem;
//         }

//         .container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 2rem;
//         }

//         .terms-header {
//           background: linear-gradient(135deg, var(--primary) 0%, #2c1b18 100%);
//           color: var(--text);
//           padding: 3rem 0;
//           margin-bottom: 2rem;
//           text-align: center;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.3);
//         }

//         .terms-header h1 {
//           margin: 0;
//           font-size: 2.8rem;
//           font-weight: 700;
//           letter-spacing: 0.5px;
//         }

//         .header-subtitle {
//           margin-top: 1rem;
//           opacity: 0.7;
//           font-size: 1.1rem;
//         }

//         .section-title {
//           color: var(--primary);
//           font-size: 1.8rem;
//           margin: 3rem 0 1.5rem;
//           padding-bottom: 0.8rem;
//           border-bottom: 2px solid var(--accent);
//           display: flex;
//           align-items: center;
//         }

//         .section-number {
//           display: inline-block;
//           margin-right: 0.8rem;
//           font-weight: 700;
//         }

//         .subsection-title {
//           color: var(--secondary);
//           font-size: 1.4rem;
//           margin: 2rem 0 1rem;
//         }

//         .highlight-box {
//           background-color: #2e2e2e;
//           padding: 1.5rem;
//           border-left: 4px solid var(--secondary);
//           margin: 2rem 0;
//           border-radius: 0 4px 4px 0;
//         }

//         .attention-box {
//           background-color: #1e3a8a;
//           border-left-color: #3b82f6;
//         }

//         .attention-title {
//           color: #93c5fd;
//           margin-top: 0;
//         }

//         .attention-list {
//           padding-left: 1.5rem;
//         }

//         .attention-list li {
//           margin-bottom: 0.5rem;
//         }

//         .warning-text {
//           color: var(--error);
//           font-weight: 500;
//           margin-top: 1rem;
//         }

//         .note-text {
//           font-style: italic;
//           color: var(--secondary);
//           margin-top: 1rem;
//         }

//         .primary-link {
//           color: var(--primary);
//           font-weight: 600;
//           text-decoration: underline;
//         }

//         .secondary-link {
//           color: var(--secondary);
//           text-decoration: underline;
//         }

//         .policy-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 1.5rem;
//           margin: 2rem 0;
//         }

//         .policy-card {
//           background: var(--card-bg);
//           padding: 1.5rem;
//           border-radius: 8px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.2);
//           border-top: 4px solid var(--accent);
//         }

//         .policy-card h4 {
//           margin-top: 0;
//           color: var(--primary);
//         }

//         .prohibited-content {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 1.5rem;
//           margin: 1.5rem 0;
//         }

//         .prohibited-category {
//           background: var(--card-bg);
//           padding: 1.2rem;
//           border-radius: 6px;
//           box-shadow: 0 1px 4px rgba(0,0,0,0.2);
//         }

//         .prohibited-category h5 {
//           margin: 0 0 0.8rem;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .contact-methods {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 1.5rem;
//           margin: 2rem 0;
//         }

//         .contact-card {
//           background: var(--card-bg);
//           padding: 1.5rem;
//           border-radius: 8px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.2);
//         }

//         .contact-card h4 {
//           margin-top: 0;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .contact-link {
//           color: var(--primary);
//           font-weight: 500;
//         }

//         .process-steps {
//           padding-left: 1.5rem;
//           list-style-type: none;
//           counter-reset: step-counter;
//         }

//         .process-steps li {
//           counter-increment: step-counter;
//           margin-bottom: 1rem;
//           position: relative;
//           padding-left: 2.5rem;
//         }

//         .process-steps li::before {
//           content: counter(step-counter);
//           position: absolute;
//           left: 0;
//           top: 0;
//           background: var(--primary);
//           color: var(--text);
//           width: 1.8rem;
//           height: 1.8rem;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 0.9rem;
//         }

//         .terms-footer {
//           background: var(--primary);
//           color: var(--text);
//           padding: 3rem 0;
//           margin-top: 4rem;
//         }

//         .footer-content {
//           display: flex;
//           flex-direction: column;
//           gap: 2rem;
//         }

//         .footer-links {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 1.5rem;
//           justify-content: center;
//         }

//         .footer-links a {
//           color: var(--text);
//           text-decoration: none;
//           transition: opacity 0.2s;
//         }

//         .footer-links a:hover {
//           opacity: 0.8;
//           text-decoration: underline;
//         }

//         .copyright-notice {
//           text-align: center;
//           opacity: 0.7;
//           font-size: 0.9rem;
//         }

//         @media (max-width: 768px) {
//           .container {
//             padding: 0 1.2rem;
//           }

//           .terms-header h1 {
//             font-size: 2.2rem;
//           }

//           .section-title {
//             font-size: 1.6rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TermsAndConditions;


import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const TermsAndConditions = () => {
  const effectiveDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const legalText = [
    {
      title: "ARTICLE I: RECITALS AND DEFINITIONS",
      content: `1.1 PREAMBLE. This Terms of Service Agreement (hereinafter referred to as the "Agreement") is a master agreement between Painters' Diary ("Service Provider", "Us", "We") and the entity or individual ("Subscriber", "User", "You") accessing the proprietary digital ecosystem. 

1.2 DEFINITIONS. 
(a) "Constructive Notice" implies knowledge of a fact presumed by law to have been acquired, irrespective of actual knowledge.
(b) "Force Majeure" encompasses acts of God, war, cyber-warfare, distributed denial of service (DDoS) attacks, and sub-oceanic cable severances.
(c) "User Generated Content" (UGC) refers to any semantic data, visual representations, or binary code uploaded by the User.

1.3 INTERPRETATION. In this Agreement, unless the context otherwise requires: words importing the singular include the plural and vice versa; references to statutes include all statutory modifications or re-enactments; and headings are for convenience only and shall not affect the interpretation of this Agreement.`
    },
    {
      title: "ARTICLE II: GRANT OF LICENSE AND RESTRICTIONS",
      content: `2.1 LICENSE GRANT. Subject to the terms and conditions of this Agreement, We hereby grant to You a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Service strictly in accordance with this Agreement.

2.2 RESTRICTIONS ON USE. You shall not, directly or indirectly: 
(i) reverse engineer, decompile, disassemble or otherwise attempt to discover the source code, object code or underlying structure, ideas, know-how or algorithms relevant to the Services; 
(ii) modify, translate, or create derivative works based on the Services; 
(iii) use the Services for timesharing or service bureau purposes or otherwise for the benefit of a third party; 
(iv) remove any proprietary notices or labels.

2.3 RESERVATION OF RIGHTS. All rights not expressly granted to You in this Agreement are reserved and retained by Us and Our licensors.`
    },
    {
      title: "ARTICLE III: USER OBLIGATIONS AND WARRANTIES",
      content: `3.1 REPRESENTATIONS. You represent and warrant that: (a) You are at least eighteen (18) years of age or the age of majority in Your jurisdiction; (b) You possess the legal right and ability to enter into this Agreement; and (c) the performance of Your obligations hereunder does not violate any other agreement to which You are a party.

3.2 COVENANTS. You covenant that You shall not use the Service to:
(a) Transmit any material that contains adware, malware, spyware, software viruses, or any other harmful code;
(b) Impersonate any person or entity, or falsely state or otherwise misrepresent Your affiliation with a person or entity;
(c) Interfere with or disrupt the integrity or performance of the Service or the data contained therein.`
    },
    {
      title: "ARTICLE IV: INTELLECTUAL PROPERTY RIGHTS",
      content: `4.1 PROPRIETARY RIGHTS. You acknowledge and agree that the Service and any necessary software used in connection with the Service contain proprietary and confidential information that is protected by applicable intellectual property and other laws.

4.2 LICENSE TO USER CONTENT. By submitting, posting or displaying Content on or through the Service, You grant Us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such Content in any and all media or distribution methods (now known or later developed).

4.3 WAIVER OF MORAL RIGHTS. To the fullest extent permitted by law, You waive any moral rights, rights of paternity, rights of integrity, or similar rights in Your Content.`
    },
    {
      title: "ARTICLE V: PAYMENT, TAXES, AND CURRENCY",
      content: `5.1 FEES. Access to certain functionalities is contingent upon payment of fees ("Subscription Fees"). All fees are denominated in United States Dollars (USD) unless explicitly stated otherwise.

5.2 TAXATION. You are responsible for all applicable taxes, including but not limited to Value Added Tax (VAT), Goods and Services Tax (GST), and sales tax, arising from or as a result of your subscription to or use of the Service.

5.3 NO REFUNDS. EXCEPT AS REQUIRED BY APPLICABLE LAW, ALL FEES PAID ARE NON-REFUNDABLE. WE DO NOT PROVIDE PRICE PROTECTION OR REFUNDS IN THE EVENT OF A PRICE DROP OR PROMOTIONAL OFFERING.`
    },
    {
      title: "ARTICLE VI: DATA PROTECTION AND PRIVACY",
      content: `6.1 DATA PROCESSING. Our collection and use of personal information in connection with the Services is described in our Privacy Policy. You agree to the data practices, including the technical processing and transmission of Your Content, as described therein.

6.2 INTERNATIONAL TRANSFERS. You acknowledge that Your data may be transferred to, stored in, or processed in jurisdictions with data protection laws that differ from those in Your country of residence.`
    },
    {
      title: "ARTICLE VII: DISCLAIMER OF WARRANTIES",
      content: `7.1 "AS IS" BASIS. THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.

7.2 NO WARRANTY. WE MAKE NO WARRANTY THAT (I) THE SERVICE WILL MEET YOUR REQUIREMENTS, (II) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS.`
    },
    {
      title: "ARTICLE VIII: LIMITATION OF LIABILITY",
      content: `8.1 CONSEQUENTIAL DAMAGES WAIVER. IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (i) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (ii) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (iii) ANY CONTENT OBTAINED FROM THE SERVICE; AND (iv) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE) OR ANY OTHER LEGAL THEORY.

8.2 LIABILITY CAP. IN NO EVENT SHALL THE AGGREGATE LIABILITY OF THE COMPANY EXCEED THE GREATER OF ONE HUNDRED U.S. DOLLARS (U.S. $100.00) OR THE AMOUNT YOU PAID THE COMPANY, IF ANY, IN THE PAST SIX MONTHS FOR THE SERVICES GIVING RISE TO THE CLAIM.`
    },
    {
      title: "ARTICLE IX: INDEMNIFICATION",
      content: `9.1 INDEMNITY. You agree to defend, indemnify and hold harmless the Company and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) Your use and access of the Service, by You or any person using Your account and password, or b) a breach of these Terms.`
    },
    {
      title: "ARTICLE X: DISPUTE RESOLUTION AND ARBITRATION",
      content: `10.1 MANDATORY ARBITRATION. Any dispute, controversy or claim arising out of or relating to this contract, including the formation, interpretation, breach or termination thereof, including whether the claims asserted are arbitrable, will be referred to and finally determined by arbitration in accordance with the JAMS International Arbitration Rules. The tribunal will consist of one arbitrator. The place of arbitration will be New York, New York.

10.2 CLASS ACTION WAIVER. YOU AND THE COMPANY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.`
    },
    {
      title: "ARTICLE XI: TERMINATION",
      content: `11.1 TERMINATION FOR CONVENIENCE. We may terminate or suspend Your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach the Terms.

11.2 EFFECT OF TERMINATION. Upon termination, Your right to use the Service will immediately cease. If You wish to terminate Your account, You may simply discontinue using the Service. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.`
    },
    {
      title: "ARTICLE XII: MISCELLANEOUS PROVISIONS",
      content: `12.1 SEVERABILITY. If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.

12.2 WAIVER. Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.

12.3 ENTIRE AGREEMENT. These Terms constitute the entire agreement between Us and You regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.

12.4 ASSIGNMENT. We may assign our rights and obligations under these Terms without notification. You may not assign these Terms without our prior written consent.`
    },
    {
      title: "ARTICLE XIII: CONTACT AND NOTICE",
      content: `13.1 METHOD OF NOTICE. All notices under this Agreement shall be in writing and shall be deemed to have been duly given when received, if personally delivered or sent by certified or registered mail, return receipt requested; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; or the day after it is sent, if sent for next day delivery by recognized overnight delivery service.

13.2 CONTACT INFORMATION. For specific legal inquiries regarding this Agreement, correspondence should be directed to: legal@paintersdiary.com`
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-400 font-serif leading-loose text-justify selection:bg-zinc-200 dark:selection:bg-zinc-800">
      
      <header className="fixed top-0 left-0 w-full h-16  border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 z-50">
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

      {/* HEADER - STRICTLY UTILITARIAN */}
      <header className="w-full py-16 px-8 border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black sticky top-0 z-50 opacity-95">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-black text-black dark:text-zinc-200 uppercase tracking-[0.2em] mb-4 text-center">
            Terms of Service
          </h1>
          <div className="flex flex-col md:flex-row gap-4 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            <span>Doc ID: LEG-2025-X99</span>
            <span className="hidden md:inline">|</span>
            <span>Effective: {effectiveDate}</span>
            <span className="hidden md:inline">|</span>
            <span>Jurisdiction: Delaware, USA</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - THE WALL OF TEXT */}
      <main className="max-w-5xl mx-auto px-8 py-24">
        
        {/* DISCLAIMER BLOCK */}
        <div className="mb-20 p-8 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/20 text-xs font-mono text-zinc-600 dark:text-zinc-500 text-justify uppercase tracking-wide">
          <p>
            NOTICE: PLEASE READ THESE TERMS CAREFULLY. BY ACCESSING THIS SITE YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS BELOW. THESE TERMS AND CONDITIONS ARE SUBJECT TO CHANGE WITHOUT NOTICE, FROM TIME TO TIME IN OUR SOLE DISCRETION. WE WILL NOTIFY YOU OF AMENDMENTS TO THESE TERMS AND CONDITIONS BY POSTING THEM TO THIS WEBSITE. IF YOU DO NOT AGREE WITH THESE TERMS AND CONDITIONS, PLEASE DO NOT ACCESS THIS WEBSITE.
          </p>
        </div>

        {/* ARTICLES */}
        <div className="space-y-16">
          {legalText.map((article, index) => (
            <article key={index} className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-8 md:pl-12">
              <h2 className="text-sm font-bold text-black dark:text-zinc-200 uppercase tracking-widest mb-6 select-none">
                {article.title}
              </h2>
              <div className="text-zinc-800 dark:text-zinc-400 text-sm md:text-base whitespace-pre-wrap font-medium">
                {article.content}
              </div>
            </article>
          ))}
        </div>

        {/* FOOTER BLOCK */}
        <div className="mt-32 pt-12 border-t-2 border-zinc-100 dark:border-zinc-900 text-center">
          <p className="text-[10px] text-zinc-400 mb-8 font-mono uppercase">
            Constructive Notice served upon access. No signature required for enforcement.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-500">
            <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">Return Home</Link>
            <Link to="/contact" className="hover:text-black dark:hover:text-white transition-colors">Legal Contact</Link>
            <span className="text-zinc-300 dark:text-zinc-700 select-none">|</span>
            <span className="cursor-not-allowed opacity-50">Print Document</span>
          </div>
        </div>

      </main>
    </div>
  );
};

export default TermsAndConditions;