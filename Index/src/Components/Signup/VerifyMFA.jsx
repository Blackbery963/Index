import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Client, Account } from 'appwrite';
import { FaMobile, FaQrcode, FaRedo, FaCheck, FaTimes } from 'react-icons/fa';
// import QRCode from 'qrcode.react';

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

const VerifyMFA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, userId, mfaSecret, mfaUri, phone } = location.state || {};
  
  const [activeTab, setActiveTab] = useState(phone ? 'phone' : 'authenticator');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isVerified, setIsVerified] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState([]);

  // Handle countdown timer
  useEffect(() => {
    if (activeTab === 'phone' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, activeTab]);

  const resendCode = async () => {
    try {
      setIsLoading(true);
      if (phone) {
        await account.createPhoneSession(userId, phone);
        setTimeLeft(30);
        toast.success('New verification code sent');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!code.trim()) {
      toast.error('Please enter verification code');
      return;
    }

    try {
      setIsLoading(true);
      
      // Verify the MFA challenge
      await account.updateMFACheck(userId, code);

      // If successful, complete the login
      const session = await account.createEmailPasswordSession(email, password);
      
      // Generate recovery codes (important for users)
      const codes = await account.createMfaRecoveryCodes();
      setRecoveryCodes(codes.recoveryCodes);
      
      setIsVerified(true);
      toast.success('Successfully verified!');
      
      // Store user data in database (move your database storage logic here)
      // await storeUserInDatabase();
      
    } catch (err) {
      console.error('Verification error:', err);
      toast.error(err.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const completeSetup = () => {
    // Store recovery codes securely
    localStorage.setItem('mfaRecoveryCodes', JSON.stringify(recoveryCodes));
    navigate('/account');
  };

  if (!email || !userId) {
    navigate('/signup');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f7d53] to-[#145c3e] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Secure Your Account
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex border-b border-white/20 mb-6">
            {phone && (
              <button
                className={`flex-1 py-2 font-medium text-center ${activeTab === 'phone' ? 'text-white border-b-2 border-white' : 'text-white/60'}`}
                onClick={() => setActiveTab('phone')}
              >
                <FaMobile className="inline mr-2" />
                Phone Verification
              </button>
            )}
            <button
              className={`flex-1 py-2 font-medium text-center ${activeTab === 'authenticator' ? 'text-white border-b-2 border-white' : 'text-white/60'}`}
              onClick={() => setActiveTab('authenticator')}
            >
              <FaQrcode className="inline mr-2" />
              Authenticator App
            </button>
          </div>
          
          {isVerified ? (
            <div className="text-center">
              <div className="text-green-400 text-5xl mb-4">
                <FaCheck />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Successfully Verified!</h3>
              <p className="text-white/80 mb-6">Your account is now secured with MFA</p>
              
              <div className="bg-black/20 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-white mb-2">Recovery Codes</h4>
                <p className="text-white/80 text-sm mb-3">
                  Save these codes in a secure place. Each code can be used only once.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {recoveryCodes.map((code, i) => (
                    <div key={i} className="bg-white/10 p-2 rounded text-center font-mono text-white">
                      {code}
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={completeSetup}
                className="w-full bg-white text-[#1f7d53] py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Continue to Your Account
              </button>
            </div>
          ) : (
            <>
              {activeTab === 'phone' ? (
                <div>
                  <p className="text-white/80 mb-4">
                    We've sent a verification code to {phone}
                  </p>
                  
                  <div className="mb-4">
                    <label className="block text-white/80 mb-2">Verification Code</label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-white/60 text-sm">
                      {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Ready to resend'}
                    </span>
                    <button
                      onClick={resendCode}
                      disabled={timeLeft > 0 || isLoading}
                      className="text-white/80 hover:text-white flex items-center text-sm disabled:opacity-50"
                    >
                      <FaRedo className="mr-1" /> Resend Code
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-white/80 mb-4">
                    Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                  </p>
                  
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-4 rounded-lg">
                      <QRCode value={mfaUri} size={200} />
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-sm mb-2">
                    Or enter this secret manually:
                  </p>
                  <div className="bg-black/20 p-3 rounded-lg mb-4 font-mono text-white text-center break-all">
                    {mfaSecret}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-white/80 mb-2">Verification Code</label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                </div>
              )}
              
              <button
                onClick={verifyCode}
                disabled={isLoading}
                className="w-full bg-white text-[#1f7d53] py-3 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1f7d53]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  'Verify and Continue'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyMFA;