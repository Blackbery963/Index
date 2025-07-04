import React from "react";
import { Helmet } from "react-helmet";

const Security = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 py-12 px-4 sm:px-6">
      <Helmet>
        <title>Security & Privacy - Painters' Diary</title>
        <meta name="description" content="Learn about our comprehensive security measures and privacy protections at Painters' Diary" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1f7d53]">
            🔒 Security & Privacy at Painters' Diary
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trust is our top priority. We implement enterprise-grade security measures to protect your artistic journey.
          </p>
        </div>

        <section className="mb-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="bg-[#1f7d53] text-white p-2 rounded-full mr-3">🔐</span>
            Data Protection
          </h2>
          <div className="space-y-4">
            <p>
              We employ <strong>end-to-end encryption</strong> for all sensitive data transfers using TLS 1.3 protocols. 
              Your artwork metadata and personal information are encrypted at rest using AES-256 encryption, 
              the same standard used by financial institutions.
            </p>
            <p>
              Our <strong>zero-knowledge architecture</strong> ensures that even our engineers cannot access your 
              raw password data. We use bcrypt with work factor 12 for password hashing, making brute force 
              attacks computationally impractical.
            </p>
          </div>
        </section>

        <section className="mb-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="bg-[#1f7d53] text-white p-2 rounded-full mr-3">🛡️</span>
            Account Security Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2 text-lg">Multi-Factor Authentication</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Time-based one-time passwords (TOTP) via authenticator apps</li>
                <li>Biometric authentication on supported devices</li>
                <li>Emergency recovery codes for account restoration</li>
                <li>Device recognition and anomaly detection</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-lg">Session Protection</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Automatic logout after 30 minutes of inactivity</li>
                <li>Concurrent session management</li>
                <li>Detailed login history with device fingerprints</li>
                <li>IP address anomaly detection</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="bg-[#1f7d53] text-white p-2 rounded-full mr-3">🏗️</span>
            Infrastructure Security
          </h2>
          <div className="space-y-4">
            <p>
              Our systems are hosted on <strong>SOC 2 Type II compliant</strong> infrastructure with:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Distributed denial-of-service (DDoS) protection</li>
              <li>Web application firewalls with machine learning rules</li>
              <li>Regular penetration testing by independent security firms</li>
              <li>Isolated container environments for each service</li>
              <li>Immutable infrastructure with automated patching</li>
            </ul>
            <p>
              We maintain <strong>geographically redundant backups</strong> with point-in-time recovery 
              capabilities for up to 90 days.
            </p>
          </div>
        </section>

        <section className="mb-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="bg-[#1f7d53] text-white p-2 rounded-full mr-3">🔍</span>
            Privacy & Compliance
          </h2>
          <div className="space-y-4">
            <p>
              Painters' Diary adheres to global privacy regulations including:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border-l-4 border-[#1f7d53] pl-4">
                <h3 className="font-bold">GDPR Compliance</h3>
                <p className="text-sm text-gray-600">
                  We meet all General Data Protection Regulation requirements for EU users.
                </p>
              </div>
              <div className="border-l-4 border-[#1f7d53] pl-4">
                <h3 className="font-bold">CCPA Ready</h3>
                <p className="text-sm text-gray-600">
                  California Consumer Privacy Act provisions are fully supported.
                </p>
              </div>
            </div>
            <p>
              Our <strong>data minimization</strong> approach means we only collect what's necessary, 
              and our <strong>privacy by design</strong> philosophy ensures protection is built into 
              every feature from the ground up.
            </p>
          </div>
        </section>

        <section className="mb-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="bg-[#1f7d53] text-white p-2 rounded-full mr-3">🛠️</span>
            Security Best Practices for Artists
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-bold mb-2">Password Hygiene</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Use our built-in password generator for strong credentials</li>
                <li>Never reuse passwords across different services</li>
                <li>Consider using a reputable password manager</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-bold mb-2">Device Security</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Keep your operating system and browser updated</li>
                <li>Use device encryption where available</li>
                <li>Be cautious with public WiFi - use our mobile app for better security</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-bold mb-2">Phishing Awareness</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>We will never ask for your password via email</li>
                <li>Always check for our verified badge in communications</li>
                <li>Report suspicious messages to security@paintersdiary.com</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="bg-[#1f7d53] text-white p-2 rounded-full mr-3">🚨</span>
            Vulnerability Disclosure Program
          </h2>
          <div className="space-y-4">
            <p>
              We welcome responsible disclosure of security vulnerabilities. Our security team 
              acknowledges all reports within <strong>24 hours</strong> and provides regular 
              updates until resolution.
            </p>
            <div className="bg-[#1f7d53]/10 p-4 rounded-lg border border-[#1f7d53]/30">
              <h3 className="font-bold mb-2 text-[#1f7d53]">Reporting Guidelines</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Provide detailed reproduction steps</li>
                <li>Include screenshots or video when possible</li>
                <li>Avoid accessing other users' data during testing</li>
                <li>Allow reasonable time for remediation before public disclosure</li>
              </ul>
              <p className="mt-3">
                Email security reports to:{" "}
                <a 
                  href="mailto:security@paintersdiary.com" 
                  className="text-[#1f7d53] font-medium underline"
                >
                  security@paintersdiary.com
                </a>
              </p>
            </div>
            <p className="text-sm text-gray-600">
              We participate in the <a href="https://huntr.dev" className="underline" target="_blank" rel="noopener noreferrer">huntr.dev</a> 
              {" "}bug bounty platform and maintain a <strong>Hall of Fame</strong> for researchers 
              who help improve our security.
            </p>
          </div>
        </section>

        <section className="text-center text-gray-600 text-sm">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="mt-2">
            This document is reviewed quarterly. Significant changes will be announced via our newsletter.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Security;