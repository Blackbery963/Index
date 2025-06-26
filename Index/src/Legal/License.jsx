import React from 'react';
import { Helmet } from 'react-helmet';
import { FaBalanceScale, FaCopyright, FaCreativeCommons } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LicenseAgreement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
      <Helmet>
        <title>License Agreement - Painters' Diary</title>
        <meta name="description" content="Legal license terms governing use of Painters' Diary content and services" />
      </Helmet>

      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-rose-800 dark:text-white font-Eagle">Painters' Diary</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-rose-700 dark:hover:text-rose-400 font-Playfair">Home</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-rose-700 dark:hover:text-rose-400 font-Playfair">About</Link>
            <Link to="/privacy" className="text-gray-700 dark:text-gray-300 hover:text-rose-700 dark:hover:text-rose-400 font-Playfair">Privacy</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
          {/* License Header */}
          <div className="p-8 bg-gradient-to-r from-rose-900 to-rose-700 text-white">
            <div className="flex items-center space-x-4">
              <FaBalanceScale className="text-3xl" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold">Content License Agreement</h1>
                <p className="text-rose-100 font-medium">Effective Date: {new Date().toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}</p>
              </div>
            </div>
          </div>

          {/* License Content */}
          <div className="p-6 sm:p-8">
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-semibold text-rose-800 dark:text-rose-300 border-b border-rose-200 dark:border-rose-600 pb-2 mb-4">
                <FaCreativeCommons className="inline mr-2" />
                Article 1: Intellectual Property Rights
              </h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p><strong>1.1 Ownership Retention:</strong> All original content created and uploaded by users ("User Content") remains the exclusive property of the respective creators.</p>
                <p><strong>1.2 License Grant:</strong> By uploading content, you grant Painters' Diary a <span className="font-semibold">worldwide, non-exclusive, royalty-free</span> license to use and promote the content for:</p>
                <ul className="list-disc pl-6 my-4">
                  <li>Platform operation and service provision</li>
                  <li>Promotional and marketing activities</li>
                  <li>Technical adaptations for display and distribution</li>
                  <li>Archival and preservation purposes</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-semibold text-rose-800 dark:text-rose-300 border-b border-rose-200 dark:border-rose-600 pb-2 mb-4">
                <FaCopyright className="inline mr-2" />
                Article 2: Permitted Uses
              </h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p><strong>2.1 User License:</strong> Painters' Diary grants users a limited, non-commercial license to:</p>
                <ul className="list-decimal pl-6 my-4">
                  <li>View and display content for personal enjoyment</li>
                  <li>Share content via platform-native sharing tools</li>
                  <li>Create personal collections and inspiration boards</li>
                  <li>Generate non-commercial derivative works (with attribution)</li>
                </ul>
                <p><strong>2.2 Commercial Licensing:</strong> Commercial use requires written permission from the creator and Painters’ Diary via our <span className="font-semibold">Commercial Licensing Program</span>.</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-semibold text-rose-800 dark:text-rose-300 border-b border-rose-200 dark:border-rose-600 pb-2 mb-4">
                Article 3: Restrictions & Prohibitions
              </h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>Users agree not to:</p>
                <ul className="list-disc pl-6 my-4">
                  <li>Remove or alter copyright notices</li>
                  <li>Scrape or mass-download content</li>
                  <li>Claim authorship of others' work</li>
                  <li>Use content in illegal or harmful ways</li>
                  <li>Resell content without transformation</li>
                  <li>Bypass platform protections</li>
                </ul>
                <p className="bg-rose-50 dark:bg-rose-900 p-4 rounded border-l-4 border-rose-500 dark:border-rose-400">
                  <strong>Note:</strong> Violations may result in termination and legal action.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-semibold text-rose-800 dark:text-rose-300 border-b border-rose-200 dark:border-rose-600 pb-2 mb-4">
                Article 4: Digital Millennium Copyright Act (DMCA)
              </h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>To report infringement under DMCA, please submit:</p>
                <ol className="list-decimal pl-6 my-4">
                  <li>Description of copyrighted work</li>
                  <li>URL of the infringing content</li>
                  <li>Your contact information</li>
                  <li>A good faith statement</li>
                  <li>Signature and accuracy declaration</li>
                </ol>
                <p>Send to: <span className="font-mono">copyright@paintersdiary.com</span></p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif font-semibold text-rose-800 dark:text-rose-300 border-b border-rose-200 dark:border-rose-600 pb-2 mb-4">
                Article 5: General Provisions
              </h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p><strong>5.1 Governing Law:</strong> Governed by the laws of [Your State].</p>
                <p><strong>5.2 Amendments:</strong> Terms may be updated. Continued use implies acceptance.</p>
                <p><strong>5.3 Severability:</strong> Invalid provisions won’t affect remaining terms.</p>
                <p><strong>5.4 Entire Agreement:</strong> This is the full agreement between you and Painters' Diary.</p>
              </div>
            </section>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-serif font-semibold text-gray-800 dark:text-white mb-3">Acceptance of Terms</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                BY USING PAINTERS' DIARY, YOU AGREE TO BE BOUND BY THIS LICENSE AGREEMENT. IF YOU DISAGREE, YOU MUST CEASE USE IMMEDIATELY.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Questions? Email us at: <span className="font-mono">legal@paintersdiary.com</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Painters' Diary. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link to="/Legal/Terms_Conditions" className="text-sm hover:text-rose-300">Terms</Link>
              <Link to="/Legal/Privacy_Policy" className="text-sm hover:text-rose-300">Privacy</Link>
              <Link to="/Legal/License" className="text-sm hover:text-rose-300">License</Link>
              <Link to="/contact" className="text-sm hover:text-rose-300">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LicenseAgreement;
