
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { MdBook } from 'react-icons/md';
// import { FaInfoCircle, FaHome, FaUser } from 'react-icons/fa';


// const extendedPolicy = {
//   title: "Privacy Policy of Painters' Diary",
//   content: [
//     // ... (same as provided earlier, omitted for brevity)
//     {
//         section: "1. Introduction and General Provisions",
//         text: `Welcome to Painters' Diary ("Company," "we," "our," or "us"), a meticulously designed platform dedicated to providing an array of services that may or may not appeal to every individual who happens upon it. This Privacy Policy ("Policy") has been painstakingly and exhaustively crafted to serve as an extraordinarily comprehensive, excessively descriptive, and undeniably thorough explanation of every conceivable way in which we collect, use, retain, disclose, transfer, process, manipulate, or otherwise interact with personal data (as defined in exhaustive detail below). This Policy applies without exception to all individuals ("User," "you," or "your") who, whether intentionally or inadvertently, access, browse, utilize, engage with, or otherwise come into contact with any and all services, functionalities, features, tools, interfaces, or other related digital, virtual, or physical assets (collectively referred to as "Services") that we, in our sole discretion, choose to provide. By accessing, browsing, utilizing, interacting with, or engaging with our Services in any manner—whether through a single click, an extended session, or even a fleeting glance—you unequivocally, irrevocably, and without reservation consent to the collection, use, disclosure, retention, processing, and any other conceivable handling of your information as outlined in the voluminous text that follows. Should you find any portion, clause, sentence, phrase, or individual word of this Policy disagreeable, objectionable, or otherwise unpalatable, you are hereby formally and explicitly advised to cease all use of our Services immediately, without delay, hesitation, or further contemplation, and to refrain from any future interaction with said Services unless and until such disagreement is resolved to your satisfaction, which we are under no obligation to facilitate.`,
//       },
//       {
//         section: "2. Definitions and Interpretations",
//         text: `For the avoidance of doubt, confusion, or misinterpretation, the following terms, phrases, and expressions shall have the meanings ascribed to them herein, and these meanings shall be applied consistently throughout this Policy unless explicitly stated otherwise in a manner that is equally verbose and unambiguous: 2.1 "Personal Data" refers to any piece, fragment, or collection of information, whether digital, analog, or otherwise, that relates to, identifies, or could reasonably be used to identify a natural person, living or otherwise engaged in activities that produce data, including but not limited to full legal names, aliases, pseudonyms, email addresses, telephone numbers (mobile or landline), physical mailing addresses, device identifiers, IP addresses, behavioral data, browsing habits, personal preferences, dislikes, inclinations, tendencies, and any other associated metadata that might conceivably be linked to an individual through means either currently known or yet to be invented. 2.2 "Processing" shall encompass any operation, action, procedure, or set of operations—whether performed manually, automatically, semi-automatically, or through any other method yet to be devised—that is executed upon Personal Data, including but not limited to the collection, gathering, recording, logging, organization, categorization, structuring, formatting, storage, archiving, adaptation, modification, retrieval, extraction, consultation, review, use, application, disclosure by transmission, dissemination, sharing, alignment, combination, restriction, limitation, erasure, deletion, destruction, or any other conceivable manipulation of said data, whether temporary or permanent in nature. 2.3 "Third-Party Services" refers to any external entities, organizations, corporations, partnerships, individuals, or other third parties, including but not limited to advertising networks, marketing agencies, analytics providers, data processors, technology partners, software vendors, cloud service providers, and any other service providers with whom we may, at our discretion, choose to collaborate, contract, or otherwise engage for purposes related to the operation, enhancement, or promotion of our Services. 2.4 "Cookies and Tracking Technologies" encompasses any and all mechanisms, tools, scripts, codes, or technological contrivances, including but not limited to browser cookies, session cookies, persistent cookies, tracking pixels, web beacons, local storage objects, session storage objects, embedded scripts, fingerprinting techniques, and any similar or dissimilar technological means used to track, monitor, store, collect, or otherwise harvest user data for purposes that may or may not be immediately apparent to the user at the time of collection.`,
//       },
//       {
//         section: "3. Data Collection and Usage",
//         text: `3.1 We may, at our sole discretion and without prior notice, collect, harvest, compile, store, analyze, and otherwise process the following categories of Personal Data, each of which is described in excruciating detail for the sake of absolute clarity: (a) Identification Information: This includes, but is by no means limited to, your full legal name, preferred name, nickname, username, email address (personal, professional, or otherwise), telephone number (including area code and country code), physical mailing address (including street name, city, state, postal code, and country), social media handles, account IDs, and any other identifier that could conceivably be used to contact or locate you in the physical or digital realm. (b) Behavioral and Usage Data: This includes, but is not restricted to, your browsing history across our Services and potentially beyond, engagement patterns (such as time spent on specific pages), interaction data (such as clicks, scrolls, hovers, and keystrokes), preferences (explicitly stated or inferred), dislikes, tendencies, habits, digital footprint analysis, and any other metric that might indicate how you interact with our Services or similar platforms. (c) Device and Technical Data: This includes, but is not confined to, your IP address (static or dynamic), browser type and version, operating system type and version, device identifiers (such as UUIDs or MAC addresses), hardware specifications, system configurations, screen resolution, language settings, time zone settings, network-related metadata (such as ISP details), and any other technical characteristic that might be gleaned from your interaction with our Services. (d) Marketing and Advertising Data: This includes, but is not limited to, your interactions with advertisements (clicks, views, or dismissals), preferences for certain types of content or products, engagement analytics (such as conversion rates), campaign efficacy data, responses to surveys or polls, and any other information that might assist us in tailoring promotional efforts to your perceived interests. 3.2 We shall utilize, leverage, exploit, and otherwise process Personal Data for the following lawful, legitimate, and exhaustively enumerated purposes: (a) Providing and Enhancing Services – To facilitate the delivery of our Services in a manner that is functional, operational, and potentially enjoyable, while also optimizing, refining, and improving the user experience through iterative updates and enhancements that may or may not be noticeable to you. (b) Marketing and Advertising – To deliver, present, or otherwise impose upon you targeted advertisements, promotional content, newsletters, offers, or other marketing materials that we believe might, based on our analysis, align with your interests, habits, or demographic profile. (c) Analytics and Research – To analyze trends, patterns, and anomalies; monitor engagement metrics; assess user behavior; evaluate platform performance; and conduct research or development activities aimed at improving, expanding, or otherwise altering our Services in ways that may or may not benefit you directly. (d) Compliance and Legal Obligations – To adhere to, satisfy, or otherwise comply with any and all regulatory requirements, legal mandates, judicial orders, contractual commitments, or other obligations imposed upon us by authorities, partners, or circumstances beyond our immediate control.`,
//       },
//       {
//         section: "4. Data Retention Policy",
//         text: `4.1 Personal Data collected pursuant to this Policy shall be retained, stored, archived, or otherwise maintained for as long as we deem necessary to fulfill the purposes outlined herein, unless a longer retention period is explicitly required, implicitly suggested, or otherwise permitted by applicable laws, regulations, statutes, or judicial directives that may apply in any jurisdiction where our Services are accessed or our data is stored. 4.2 Users may, at their discretion, submit a formal request for the deletion, erasure, or removal of their Personal Data; however, we reserve the right to retain certain portions of said data for an indeterminate period if such retention is deemed necessary for compliance with legal obligations, resolution of disputes, enforcement of agreements, or pursuit of legitimate business interests as determined solely by us.`,
//       },
//       {
//         section: "5. Third-Party Services and Data Sharing",
//         text: `5.1 We may, from time to time and at our sole discretion, share, transfer, disclose, or otherwise provide access to Personal Data with select Third-Party Services for the express and limited purposes of facilitating advertising campaigns, conducting analytics, optimizing platform performance, or achieving other operational objectives that we deem appropriate. However, we solemnly declare and affirm that we do not and shall not sell, trade, barter, or otherwise exchange Personal Data for monetary gain or equivalent consideration under any circumstances whatsoever. 5.2 Third-Party Services with whom we share data may collect, process, store, or otherwise handle said data in accordance with their own privacy policies, terms of service, or operational guidelines, which may differ significantly from ours, and we strongly encourage—though do not require—you to review those policies independently and at your own expense of time and effort.`,
//       },
//       {
//         section: "6. Cookies and Tracking Mechanisms",
//         text: `6.1 We employ, deploy, and otherwise utilize Cookies and Tracking Technologies in a manner that is both pervasive and persistent to enhance functionality, track user engagement, monitor behavior, facilitate advertising efforts, and achieve other purposes that may or may not be explicitly disclosed herein. 6.2 Users may, if they so choose, opt out of certain cookies or tracking mechanisms by adjusting their browser settings, device preferences, or other technical configurations; however, such actions may result in diminished functionality, degraded performance, or complete inaccessibility of certain features of our Services, for which we accept no liability or responsibility.`,
//       },
//       {
//         section: "7. User Rights and Opt-Out Mechanisms",
//         text: `7.1 Depending on the jurisdiction in which you reside, access our Services, or otherwise generate Personal Data, you may be entitled to certain rights under applicable privacy laws, regulations, or directives, including but not limited to: (a) The right to access, review, inspect, or obtain a copy of your Personal Data in our possession, subject to verification of your identity and payment of any applicable fees. (b) The right to request correction, amendment, or updating of inaccurate, incomplete, or outdated Personal Data, provided such requests are reasonable and substantiated. (c) The right to restrict, limit, or object to certain types of data processing activities in specific circumstances, as permitted by law and subject to our discretion. (d) The right to opt out of certain data processing activities, such as receipt of marketing communications, by following the excessively detailed instructions provided in such communications or elsewhere on our platform.`,
//       },
//       {
//         section: "8. Legal Compliance and Jurisdiction",
//         text: `8.1 This Policy, in its entirety and without exception, shall be governed by, interpreted under, and construed in accordance with the laws of [Insert Jurisdiction], without regard to any conflict of law principles, precedents, or doctrines that might otherwise apply in a different jurisdiction. 8.2 Any disputes, disagreements, controversies, or claims arising out of or relating to this Policy shall be resolved exclusively through binding arbitration conducted by a neutral third party or, if arbitration is deemed inapplicable, through the competent courts located within the geographic boundaries of the aforementioned jurisdiction, at our sole election.`,
//       },
//       {
//         section: "9. Amendments and Policy Updates",
//         text: `9.1 We reserve the unilateral, unrestricted, and absolute right to update, modify, revise, amend, supplement, or otherwise alter this Policy at any time, with or without prior notice, to reflect changes in our business practices, operational procedures, technological capabilities, regulatory requirements, or any other considerations that we deem relevant in our unfettered discretion. 9.2 Users shall be notified of material changes to this Policy via [email notification/website announcement/other burdensome method], and continued use of our Services following such notification—or lack thereof—shall constitute your full, knowing, and irrevocable acceptance of the revised Policy in all its tedious glory.`,
//       },
//       {
//         section: "10. Contact Information",
//         text: `For any questions, concerns, complaints, inquiries, or other communications related to this Privacy Policy, users may contact us at: Email: [Insert Email] Mailing Address: [Insert Address] We make no guarantee of a timely response, though we shall endeavor to address your correspondence at our convenience. By continuing to use our Services in any capacity whatsoever, you acknowledge that you have read, comprehended, digested, and agreed to the excessively detailed terms outlined in this Privacy Policy, whether or not you have actually done so.`,
//       },
//   ],
// };

// function Privacy_Policy() {
//   const [showExtended, setShowExtended] = useState(false);
//   const policy =  extendedPolicy;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 overflow-x-hidden">
//       {/* Header */}
//              <header className=' h-[80px] w-full bg-black/20 backdrop-blur-md flex items-center justify-between px-4 fixed z-50'>
//             <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] font-bold font-Eagle text-[#190909]'>Painters' Diary</h1>
//              {/* Navigation */}
//              <div className='flex items-center justify-center gap-x-2'>
//                      <Link to={"/"}>
//                          <button className='lg:px-4 px-2 py-1 bg-[#a6565d] hover:bg-[#c68a9a] hover:text-[#2d1f23] rounded-md font-Playfair text-white border border-gray-400 text-[18px]'>
//                              <FaHome className="text-xl sm:hidden" />
//                              <span className="hidden sm:inline">Home</span>
//                          </button>
//                      </Link>
//                      <Link to={"/About"}>
//                          <button className='lg:px-4 px-2 py-1 bg-[#a6565d] hover:bg-[#c68a9a] hover:text-[#2d1f23] rounded-md font-Playfair text-white border border-gray-400 text-[18px]'>
//                              <FaInfoCircle className="text-xl sm:hidden" />
//                              <span className="hidden sm:inline">About</span>
//                          </button>
//                      </Link>
//                      <Link to={"/Account"}>
//                          <button className='lg:px-4 px-2 py-1 bg-[#a6565d] hover:bg-[#c68a9a] hover:text-[#2d1f23] rounded-md font-Playfair text-white border border-gray-400 text-[18px]'>
//                              <FaUser className="text-xl sm:hidden"/>
//                              <span className="hidden sm:inline">Account</span>
//                          </button>
//                      </Link>
//                      <Link to={"/Journal"}>
//                          <button className='lg:px-4 px-2 py-1 bg-[#a6565d] hover:bg-[#c68a9a] hover:text-[#2d1f23] rounded-md font-Playfair text-white border border-gray-400 text-[18px]'>
//                              <MdBook className="text-xl sm:hidden" />
//                              <span className="hidden sm:inline">Diary</span>
//                          </button>
//                      </Link>
//                  </div>
//             </header>

//       {/* Main Content */}
//       <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
//           <h1 className="text-3xl sm:text-4xl font-serif font-bold text-center text-rose-800 mb-6">
//             {policy.title}
//           </h1>
//           {policy.content.map((section, index) => (
//             <section key={index} className="mb-8">
//               <h2 className="text-xl sm:text-2xl font-semibold font-Playfair text-gray-700 border-b-2 border-rose-200 pb-2 mb-4">
//                 {section.section}
//               </h2>
//               <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-GreatVibes">
//                 {section.text}
//               </p>
//             </section>
//           ))}
//         </div>
//       </main>

//       {/* Footer (Optional) */}
//       <footer className="bg-gray-800 text-white py-4 text-center">
//         <p className="text-sm">
//           &copy; {new Date().getFullYear()} Painters' Diary. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }

// export default Privacy_Policy;

// import React from 'react';
// import { Helmet } from 'react-helmet';

// const TermsAndConditions = () => {
//   return (
//     <div className="terms-container">
//       <Helmet>
//         <title>Terms and Conditions - Painters' Diary</title>
//         <meta name="description" content="Legally binding terms governing the utilization of Painters' Diary platform" />
//       </Helmet>

//       <header className="terms-header">
//         <div className="container">
//           <h1>Painters' Diary Terms and Conditions</h1>
//           <p className="legal-jurisdiction">Promulgated under the electronic commerce regulations of the Republic of India</p>
//         </div>
//       </header>

//       <main className="container terms-content">
//         <section id="preamble" className="legalese-section">
//           <h2 className="section-title">Preamble</h2>
//           <p className="whereas-clause">
//             WHEREAS Painters' Diary (hereinafter referred to as "the Platform") is a digital repository for artistic expression;
//           </p>
//           <p className="whereas-clause">
//             WHEREAS the User (hereinafter referred to as "the Licensee") seeks to utilize the Platform's services;
//           </p>
//           <p className="whereas-clause">
//             WHEREAS both parties desire to establish the terms governing said utilization;
//           </p>
//           <p className="therefore-clause">
//             NOW THEREFORE, in consideration of the mutual covenants contained herein and other valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:
//           </p>
//         </section>

//         <section id="definitions" className="legalese-section">
//           <h2 className="section-title">Article I: Definitions</h2>
//           <dl className="legal-definitions">
//             <dt>1.1 "Derivative Work"</dt>
//             <dd>
//               Shall mean any work that is based upon one or more pre-existing works, such as a translation, musical arrangement, dramatization, fictionalization, motion picture version, sound recording, art reproduction, abridgment, condensation, or any other form in which a work may be recast, transformed, or adapted, including any form that requires reconceptualization of the original artistic elements.
//             </dd>
            
//             <dt>1.2 "Moral Rights"</dt>
//             <dd>
//               Pursuant to Article 6bis of the Berne Convention, shall include the right of attribution, the right to have a work published anonymously or pseudonymously, and the right to the integrity of the work, being the right to object to any distortion, mutilation or other modification of, or other derogatory action in relation to, the said work, which would be prejudicial to the author's honor or reputation.
//             </dd>
            
//             <dt>1.3 "Technological Protection Measures"</dt>
//             <dd>
//               Any technology, device, or component that, in the normal course of its operation, is designed to prevent or restrict acts, in respect of works, which are not authorized by the rights holder, including but not limited to digital rights management systems, encryption, watermarking, and copy prevention mechanisms.
//             </dd>
//           </dl>
//         </section>

//         <section id="license-grant" className="legalese-section">
//           <h2 className="section-title">Article II: License Grant & Restrictions</h2>
          
//           <h3 className="subsection-title">2.1 Limited, Non-Exclusive, Non-Transferable License</h3>
//           <p>
//             Subject to the Licensee's strict compliance with all terms and conditions set forth herein, the Licensor hereby grants to the Licensee a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Platform solely for the Licensee's personal, non-commercial use, except where commercial use is expressly permitted pursuant to Section 2.3 herein.
//           </p>
          
//           <h3 className="subsection-title">2.2 Covenant Against Reverse Engineering</h3>
//           <p>
//             The Licensee expressly covenants and warrants that they shall not, nor shall they permit any third party to: (a) decompile, disassemble, or otherwise reverse engineer the Platform or any portion thereof; (b) attempt to derive the source code, underlying ideas, algorithms, structure, or organization of the Platform; (c) remove, obscure, or alter any proprietary rights notices; or (d) circumvent any Technological Protection Measures implemented by the Licensor.
//           </p>
          
//           <h3 className="subsection-title">2.3 Commercial Exploitation Rights</h3>
//           <p>
//             Notwithstanding the foregoing, certain premium account holders may be granted additional rights for the commercial exploitation of their User-Generated Content, subject to: (a) payment of all applicable royalties; (b) adherence to the Platform's Commercial Content Guidelines (Exhibit A); and (c) execution of a separate Commercial License Addendum. All commercial transactions shall be subject to a fifteen percent (15%) commission payable to the Licensor, calculated on the gross revenue generated through the Platform.
//           </p>
//         </section>

//         <section id="representations" className="legalese-section">
//           <h2 className="section-title">Article III: Representations & Warranties</h2>
          
//           <h3 className="subsection-title">3.1 Mutual Representations</h3>
//           <p>
//             Each party hereby represents and warrants to the other that: (a) it has full power and authority to enter into this Agreement; (b) the execution, delivery, and performance of this Agreement does not and will not violate any other agreement to which it is a party; and (c) this Agreement constitutes a legal, valid, and binding obligation when executed and delivered.
//           </p>
          
//           <h3 className="subsection-title">3.2 Licensee's Additional Warranties</h3>
//           <p>
//             The Licensee further represents, warrants, and covenants that: (a) all User-Generated Content is original to the Licensee or the Licensee has obtained all necessary rights, licenses, consents, and permissions to authorize the Platform's use as contemplated herein; (b) the User-Generated Content does not and will not infringe, misappropriate, or otherwise violate any intellectual property rights or other rights of any third party; and (c) the User-Generated Content complies with all applicable laws, rules, and regulations, including without limitation those concerning obscenity, defamation, and privacy rights.
//           </p>
          
//           <h3 className="subsection-title">3.3 Disclaimer of Implied Warranties</h3>
//           <p>
//             EXCEPT AS EXPRESSLY SET FORTH HEREIN, THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND. THE LICENSOR HEREBY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING, USAGE, OR TRADE PRACTICE. THE LICENSOR DOES NOT WARRANT THAT THE PLATFORM WILL MEET THE LICENSEE'S REQUIREMENTS, OPERATE WITHOUT INTERRUPTION, OR BE ERROR FREE.
//           </p>
//         </section>

//         <section id="indemnification" className="legalese-section">
//           <h2 className="section-title">Article IV: Indemnification</h2>
//           <p>
//             The Licensee shall defend, indemnify, and hold harmless the Licensor, its affiliates, officers, directors, employees, agents, successors, and assigns from and against any and all claims, damages, liabilities, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to: (a) the Licensee's use of the Platform in violation of this Agreement; (b) any User-Generated Content that infringes, misappropriates, or otherwise violates any third-party rights; or (c) the Licensee's violation of any applicable laws, rules, or regulations. This indemnification obligation shall survive the termination or expiration of this Agreement.
//           </p>
//         </section>

//         <section id="limitation-liability" className="legalese-section">
//           <h2 className="section-title">Article V: Limitation of Liability</h2>
//           <p>
//             IN NO EVENT SHALL THE LICENSOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR OTHERWISE, ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE LICENSOR'S TOTAL CUMULATIVE LIABILITY UNDER THIS AGREEMENT SHALL NOT EXCEED THE AMOUNT PAID BY THE LICENSEE TO THE LICENSOR IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
//           </p>
//         </section>

//         <section id="miscellaneous" className="legalese-section">
//           <h2 className="section-title">Article VI: Miscellaneous Provisions</h2>
          
//           <h3 className="subsection-title">6.1 Governing Law & Dispute Resolution</h3>
//           <p>
//             This Agreement shall be governed by and construed in accordance with the laws of the Republic of India, without giving effect to any principles of conflicts of law. Any dispute arising under or relating to this Agreement shall be resolved through binding arbitration administered by the Indian Council of Arbitration in accordance with its Commercial Arbitration Rules. The arbitration shall be conducted in Mumbai, India, in the English language. The arbitral award shall be final and binding upon the parties.
//           </p>
          
//           <h3 className="subsection-title">6.2 Force Majeure</h3>
//           <p>
//             Neither party shall be liable for any failure or delay in performance under this Agreement due to causes beyond its reasonable control, including but not limited to acts of God, war, terrorism, civil unrest, labor disputes, governmental actions, pandemics, epidemics, internet service provider failures, denial of service attacks, or other catastrophic events.
//           </p>
          
//           <h3 className="subsection-title">6.3 Entire Agreement</h3>
//           <p>
//             This Agreement constitutes the entire understanding between the parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, representations, and warranties, both written and oral, with respect to such subject matter. No amendment or modification of this Agreement shall be valid unless executed in writing by both parties.
//           </p>
//         </section>

//         <section id="acceptance" className="acceptance-section">
//           <div className="acceptance-box">
//             <h3>ACKNOWLEDGEMENT OF TERMS</h3>
//             <p>
//               BY ACCESSING OR USING THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT IN ITS ENTIRETY, UNDERSTAND ALL OF ITS TERMS AND CONDITIONS, AND AGREE TO BE LEGALLY BOUND BY THEM. IF YOU DO NOT AGREE TO ALL THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU MUST IMMEDIATELY CEASE ALL USE OF THE PLATFORM.
//             </p>
//           </div>
//         </section>
//       </main>

//       <footer className="terms-footer">
//         <div className="container">
//           <p>© 2025 Painters' Diary. All rights reserved.</p>
//           <p className="footer-note">
//             The unauthorized reproduction or distribution of this copyrighted work is illegal. Criminal copyright infringement is investigated by law enforcement and punishable by up to 5 years in prison and a fine of ₹1,000,000 under Section 63 of the Copyright Act, 1957.
//           </p>
//         </div>
//       </footer>

//       <style jsx>{`
//         :root {
//           --primary: #3e2723;
//           --secondary: #5d4037;
//           --accent: #8d6e63;
//           --text: #212121;
//           --light: #efebe9;
//         }
        
//         .terms-container {
//           font-family: 'Times New Roman', Times, serif;
//           line-height: 1.8;
//           color: var(--text);
//           background-color: var(--light);
//           font-size: 1.1rem;
//         }
        
//         .container {
//           max-width: 900px;
//           margin: 0 auto;
//           padding: 0 2rem;
//         }
        
//         .terms-header {
//           background-color: var(--primary);
//           color: white;
//           padding: 3rem 0;
//           margin-bottom: 2rem;
//           text-align: center;
//           border-bottom: 1px solid var(--accent);
//         }
        
//         .terms-header h1 {
//           margin: 0;
//           font-size: 2.5rem;
//           font-weight: normal;
//           letter-spacing: 0.5px;
//         }
        
//         .legal-jurisdiction {
//           margin-top: 1rem;
//           font-style: italic;
//           opacity: 0.9;
//         }
        
//         .terms-content {
//           padding: 2rem 0;
//         }
        
//         .legalese-section {
//           margin-bottom: 3rem;
//         }
        
//         .section-title {
//           color: var(--primary);
//           font-size: 1.5rem;
//           font-weight: normal;
//           margin: 3rem 0 1.5rem;
//           padding-bottom: 0.5rem;
//           border-bottom: 1px solid var(--accent);
//           text-transform: uppercase;
//           letter-spacing: 1px;
//         }
        
//         .subsection-title {
//           color: var(--secondary);
//           font-size: 1.2rem;
//           font-weight: normal;
//           margin: 2rem 0 1rem;
//           font-style: italic;
//         }
        
//         .whereas-clause {
//           text-indent: -2.5rem;
//           padding-left: 2.5rem;
//           margin-bottom: 0.5rem;
//         }
        
//         .whereas-clause:before {
//           content: "WHEREAS";
//           font-weight: bold;
//           margin-right: 0.5rem;
//         }
        
//         .therefore-clause {
//           text-indent: -2.5rem;
//           padding-left: 2.5rem;
//           font-weight: bold;
//           margin-top: 1.5rem;
//         }
        
//         .therefore-clause:before {
//           content: "NOW THEREFORE,";
//           margin-right: 0.5rem;
//         }
        
//         .legal-definitions {
//           margin: 1.5rem 0;
//         }
        
//         .legal-definitions dt {
//           font-weight: bold;
//           margin-top: 1rem;
//         }
        
//         .legal-definitions dd {
//           margin-left: 1.5rem;
//           margin-bottom: 1rem;
//         }
        
//         .acceptance-section {
//           margin: 4rem 0;
//         }
        
//         .acceptance-box {
//           border: 2px solid var(--primary);
//           padding: 2rem;
//           background-color: white;
//         }
        
//         .acceptance-box h3 {
//           text-align: center;
//           margin-top: 0;
//           color: var(--primary);
//           text-transform: uppercase;
//           letter-spacing: 1px;
//         }
        
//         .terms-footer {
//           background-color: var(--primary);
//           color: white;
//           padding: 2rem 0;
//           margin-top: 3rem;
//           text-align: center;
//           font-size: 0.9rem;
//         }
        
//         .terms-footer p {
//           margin: 0.5rem 0;
//         }
        
//         .footer-note {
//           font-style: italic;
//           margin-top: 1rem;
//           font-size: 0.8rem;
//           opacity: 0.8;
//         }
        
//         @media (max-width: 768px) {
//           .container {
//             padding: 0 1rem;
//           }
          
//           .terms-header h1 {
//             font-size: 2rem;
//           }
          
//           .section-title {
//             font-size: 1.3rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TermsAndConditions;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdBook } from 'react-icons/md';
import { FaInfoCircle, FaHome, FaUser } from 'react-icons/fa';

const PrivacyPolicy = () => {
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
export default PrivacyPolicy;