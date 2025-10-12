// import React from 'react';
// import { Link } from 'react-router-dom';
// import FAQsBackground from './FAQs-images/FAQS.jpeg'
// import { FaHome, FaInfoCircle, FaUser, FaBook } from 'react-icons/fa'

// const faqSections = [
//   {
//     title: "Getting to Know Painters' Diary",
//     questions: [
//       {
//         q: "What is Painters' Diary?",
//         a: "Painters' Diary is an art-focused platform for artists to share their work, maintain a visual diary, and collaborate with other creatives."
//       },
//       {
//         q: "Who can join Painters' Diary?",
//         a: "Any artist from anywhere in the world can join, whether you’re a painter, illustrator, digital artist, or creator of any kind."
//       },
//       {
//         q: "Is Painters' Diary free to use?",
//         a: "Yes, all core features of Painters' Diary are free. We aim to make the platform accessible to every artist."
//       },
//       {
//         q: "Can I follow other artists?",
//         a: "Yes, following artists is a great way to stay inspired and engaged. Follow your favorite creators and receive updates on their latest works."
//       }
//     ]
//   },
//   {
//     title: "Share Your Art with the World",
//     questions: [
//       {
//         q: "How do I upload my artwork?",
//         a: "Once registered, you can upload art by navigating to the upload page. Fill in details like title, tags, description, and medium."
//       },
//       {
//         q: "What types of files are supported?",
//         a: "We currently support JPEG, PNG, and GIF formats. Larger files are optimized for web display."
//       },
//       {
//         q: "Can I edit or delete my uploads?",
//         a: "Absolutely. You can manage your uploaded artworks from your profile dashboard."
//       },
//       {
//         q: "Can I sell my artwork?",
//         a: "This feature is coming soon! Stay tuned for future updates that will allow artists to list their works for sale."
//       }
//     ]
//   },
//   {
//     title: "Your Artistic Diary",
//     questions: [
//       {
//         q: "What is a Diary entry?",
//         a: "A Diary entry is a visual journal where artists can share ideas, progress, thoughts, or behind-the-scenes work."
//       },
//       {
//         q: "How often can I post diary entries?",
//         a: "As often as you like! Many artists use it daily to reflect on their process or share WIPs (Works in Progress)."
//       },
//       {
//         q: "Are diary entries public?",
//         a: "By default, yes. But you can mark entries private if you prefer to keep them personal or draft-only."
//       },
//       {
//         q: "Can I add sketches or photos to my diary?",
//         a: "Yes! Diary entries can include images, text, and tags to keep things organized and expressive."
//       }
//     ]
//   },
//   {
//     title: "Collaborate and Connect",
//     questions: [
//       {
//         q: "How can I find collaborators?",
//         a: "Use the 'Collaborate' tab to browse artist profiles and post collaboration requests or ideas."
//       },
//       {
//         q: "Can we work on shared projects?",
//         a: "Yes! Collaborative projects allow multiple artists to contribute to one project space with shared updates."
//       },
//       {
//         q: "Is there a messaging feature?",
//         a: "Direct messaging is in development. For now, use the contact links provided on artist profiles."
//       },
//       {
//         q: "Can I collaborate across countries?",
//         a: "Definitely! Painters' Diary is built for a global community of artists."
//       }
//     ]
//   }
// ];

// const FAQs = () => {
//   return (
//     <div className='min-h-screen max-w-screen bg-slate-300 flex flex-col overflow-x-hidden overflow-y-auto pb-6 pt-[100px]'>
//                 <header className=' h-[100px] w-full bg-gradient-to-l from-[#10002bad] to-[#dec9e9a9] backdrop-blur-md flex items-center justify-between px-4 md:px-6 shadow-lg text-white fixed top-0 z-50'>
//             {/* Logo */}
//             <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] font-bold font-Eagle'>Painters' Diary</h1>
//             {/* Navigation */}
//             <div className='flex items-center justify-center gap-x-2'>
//                     <Link to={"/"}>
//                         <button className='lg:px-4 px-2 py-1 bg-violet-900/50 hover:bg-violet-800/80 rounded-md font-Playfair text-white border border-gray-400 text-[18px]'>
//                             <FaHome className="text-xl sm:hidden" />
//                             <span className="hidden sm:inline">Home</span>
//                         </button>
//                     </Link>
//                     <Link to={"/About"}>
//                         <button className='lg:px-4 px-2 py-1 bg-violet-900/50 hover:bg-violet-800/80 rounded-md font-Playfair text-white border border-gray-400 text-[18px]'>
//                             <FaInfoCircle className="text-xl sm:hidden" />
//                             <span className="hidden sm:inline">About</span>
//                         </button>
//                     </Link>
//                     <Link to={"/Account"}>
//                         <button className='lg:px-4 px-2 py-1 bg-violet-900/50 hover:bg-violet-800/80 rounded-md font-Playfair text-white border border-gray-400 text-[18px]'>
//                             <FaUser className="text-xl sm:hidden"/>
//                             <span className="hidden sm:inline">Account</span>
//                         </button>
//                     </Link>
//                     <Link to={"/Journal"}>
//                         <button className='lg:px-4 px-2 py-1 bg-violet-900/50 hover:bg-violet-800/80 rounded-md font-Playfair text-white border border-gray-400 text-[18px]'>
//                             <FaBook className="text-xl sm:hidden" />
//                             <span className="hidden sm:inline">Diary</span>
//                         </button>
//                     </Link>
//                 </div>
//             </header>
//       {/* Hero Section */}
//       <section
//         className='relative h-[70vh] w-[90%] flex flex-col justify-center items-center text-white font-semibold text-center px-4 mx-auto mt-[10px]'
//         style={{
//           backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${FAQsBackground})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//         }}
//       >
//         <h1 className='text-4xl md:text-5xl font-bold font-Playfair mb-4'>Frequently Asked Questions</h1>
//         <p className='text-md md:text-lg font-Montserrat max-w-2xl'>
//           Get answers to common questions about Painters' Diary, including how to upload art, keep your diary, and collaborate with artists.
//         </p>
//       </section>

//       {/* FAQ Sections */}
//       {faqSections.map((section, idx) => (
//         <section key={idx} className='my-12 px-6 md:px-16'>
//           <h2 className='text-3xl md:text-4xl font-bold text-center text-violet-800 font-Playfair mb-10'>
//             {section.title}
//           </h2>
//           <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 text-black font-Montserrat'>
//             {section.questions.map((item, i) => (
//               <div key={i} className='bg-gradient-to-br from-white via-white to-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
//                 <h3 className='text-xl font-semibold mb-2'>{i + 1}. {item.q}</h3>
//                 <p className='text-sm leading-relaxed'>{item.a}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       ))}

//       {/* Footer / CTA */}
//       <section className="text-center text-black font-Playfair mt-8 px-4">
//         <p className='text-lg'>
//           Still have questions?{' '}
//           <Link to="/Contact" className='text-violet-800 underline hover:text-violet-600'>
//             Reach out to us!
//           </Link>
//         </p>
//       </section>
//     </div>
//   );
// };

// export default FAQs;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FAQsBackground from './FAQs-images/FAQS.jpeg';
import { FaHome, FaInfoCircle, FaUser, FaBook, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

const faqSections = [
  {
    title: "Getting to Know Painters' Diary",
    questions: [
      {
        q: "What is Painters' Diary?",
        a: "Painters' Diary is an art-focused platform for artists to share their work, maintain a visual diary, and collaborate with other creatives. It's designed to foster a supportive community where artists can showcase their portfolios, document their creative process, and connect with like-minded individuals."
      },
      {
        q: "Who can join Painters' Diary?",
        a: "Any artist from anywhere in the world can join, whether you’re a painter, illustrator, digital artist, sculptor, photographer, or creator of any kind. We welcome beginners, hobbyists, and professionals alike."
      },
      {
        q: "Do I need to be a professional artist to join?",
        a: "No, absolutely not! Painters' Diary is open to artists at all levels, from beginners exploring their creativity to seasoned professionals. Our goal is to create an inclusive space for everyone passionate about art."
      },
      {
        q: "How do I sign up for Painters' Diary?",
        a: "Signing up is easy! Click on the 'Sign Up' button on our homepage, provide your email address, create a username and password, and verify your email. You can also sign up using Google or Apple accounts for quicker access."
      },
      {
        q: "Is Painters' Diary free to use?",
        a: "Yes, all core features of Painters' Diary are free, including uploading artwork, maintaining a diary, and basic collaborations. We may introduce premium features in the future for enhanced tools, but the essentials will always remain free."
      },
      {
        q: "Can I follow other artists?",
        a: "Yes, following artists is a great way to stay inspired and engaged. Follow your favorite creators and receive updates on their latest works, diary entries, and collaborations directly in your feed."
      }
    ]
  },
  {
    title: "Share Your Art with the World",
    questions: [
      {
        q: "How do I upload my artwork?",
        a: "Once registered, navigate to the 'Upload' page from your dashboard. Select your file, add details like title, description, tags, medium, and dimensions, then click 'Publish'. Your artwork will appear in your profile and the community feed."
      },
      {
        q: "What types of files are supported?",
        a: "We support JPEG, PNG, GIF, and limited video formats like MP4 for short clips (up to 30 seconds). Files are automatically optimized for web display while preserving quality."
      },
      {
        q: "Is there a size limit for uploads?",
        a: "Yes, individual files should be under 50MB. For larger works, we recommend compressing your images or splitting into multiple uploads. Premium users (coming soon) may have higher limits."
      },
      {
        q: "How do I tag mature or sensitive content?",
        a: "When uploading, you can select a 'Mature Content' flag. This ensures the artwork is only visible to users who have opted in to view such content, helping maintain a safe community environment."
      },
      {
        q: "Can I edit or delete my uploads?",
        a: "Yes, you have full control. From your profile dashboard, select the artwork and choose to edit details or delete it permanently. Note that deletions are irreversible."
      },
      {
        q: "Can I sell my artwork?",
        a: "This feature is in development and expected to launch in early 2026! In the meantime, you can link to external shops like Etsy in your artwork descriptions."
      }
    ]
  },
  {
    title: "Your Artistic Diary",
    questions: [
      {
        q: "What is a Diary entry?",
        a: "A Diary entry is a personal visual journal where you can share ideas, progress sketches, thoughts, inspirations, or behind-the-scenes stories. It's like a digital sketchbook combined with a blog."
      },
      {
        q: "How often can I post diary entries?",
        a: "There's no limit—post as often as you like! Many artists use it daily for reflections, weekly for progress updates, or sporadically for major milestones."
      },
      {
        q: "Are diary entries public?",
        a: "By default, they are public to inspire others, but you can set entries to private (visible only to you) or share with specific followers for more controlled visibility."
      },
      {
        q: "Can I add sketches, photos, or multiple images to my diary?",
        a: "Yes! Each entry supports multiple images, text, embeds (like videos), and tags for organization. You can even create series of entries for ongoing projects."
      },
      {
        q: "How can I organize my diary entries?",
        a: "Use tags, categories, or create collections. Search functionality in your profile allows quick access to past entries by date, tag, or keyword."
      }
    ]
  },
  {
    title: "Collaborate and Connect",
    questions: [
      {
        q: "How can I find collaborators?",
        a: "Browse the 'Collaborate' section to view artist profiles, post requests in the collaboration forum, or search by skills, location, or medium. Join community events for networking opportunities."
      },
      {
        q: "Can we work on shared projects?",
        a: "Yes! Start or join collaborative projects where multiple artists can contribute artwork, diary entries, and comments in a shared space. Version history tracks changes."
      },
      {
        q: "Is there a limit to the number of collaborators on a project?",
        a: "Currently, up to 10 collaborators per project to keep things manageable, but this can be expanded for larger initiatives upon request."
      },
      {
        q: "Is there a messaging feature?",
        a: "Direct messaging is coming soon in our next update. For now, use profile contact links or comment on posts to connect."
      },
      {
        q: "Can I collaborate across countries?",
        a: "Absolutely! Our platform supports global collaboration with features like time zone awareness and multilingual tags."
      }
    ]
  },
  {
    title: "Account and Profile Management",
    questions: [
      {
        q: "How do I customize my profile?",
        a: "From your account settings, upload a profile picture, banner, bio, and links to social media or websites. You can also set themes and privacy preferences."
      },
      {
        q: "Can I change my username?",
        a: "Yes, once every 6 months. Go to account settings and request a change—availability is checked automatically."
      },
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login page, enter your email, and follow the reset link sent to you."
      },
      {
        q: "Can I make my profile private?",
        a: "Profiles are public by default, but you can set certain sections (like diary or uploads) to private or followers-only."
      },
      {
        q: "How do I delete my account?",
        a: "From account settings, select 'Delete Account'. This permanently removes all data after a 30-day grace period for recovery."
      }
    ]
  },
  {
    title: "Policies and Guidelines",
    questions: [
      {
        q: "What content is allowed on Painters' Diary?",
        a: "We allow original artwork, sketches, and creative content. Prohibited: Hate speech, explicit violence, or non-artistic spam. All uploads must comply with copyright laws."
      },
      {
        q: "How does Painters' Diary handle copyright issues?",
        a: "Users must upload only their own work or with permission. We use automated tools to detect infringements and respond to DMCA notices promptly."
      },
      {
        q: "What happens if my content is reported?",
        a: "Reports are reviewed by moderators. If violated, content may be removed, and repeated offenses could lead to account suspension."
      }
    ]
  },
  {
    title: "Technical Support",
    questions: [
      {
        q: "What browsers are supported?",
        a: "We recommend the latest versions of Chrome, Firefox, Safari, or Edge for the best experience."
      },
      {
        q: "Is there a mobile app?",
        a: "Our mobile app is in beta for iOS and Android. Download from the App Store or Google Play, or use our responsive web version."
      },
      {
        q: "What if I encounter a bug?",
        a: "Report it via the 'Help' section or email support@paintersdiary.com. Include screenshots and details for faster resolution."
      },
      {
        q: "How secure is my data?",
        a: "We use industry-standard encryption, regular backups, and comply with GDPR for data protection."
      }
    ]
  }
];

const FAQs = () => {
  const [openQuestions, setOpenQuestions] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleQuestion = (sectionIdx, qIdx) => {
    const key = `${sectionIdx}-${qIdx}`;
    setOpenQuestions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col overflow-x-hidden overflow-y-auto pb-6'>
      {/* Header */}
      <header className='h-16 w-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-between px-4 md:px-8 fixed top-0 z-50'>
        <h1 className='text-2xl font-semibold text-violet-700 dark:text-violet-400 font-Playfair'>Painters' Diary</h1>
        <nav className='hidden md:flex items-center gap-4'>
          <Link to="/" className='text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 font-Montserrat text-sm'>
            Home
          </Link>
          <Link to="/About" className='text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 font-Montserrat text-sm'>
            About
          </Link>
          <Link to="/Account" className='text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 font-Montserrat text-sm'>
            Account
          </Link>
          <Link to="/Journal" className='text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 font-Montserrat text-sm'>
            Diary
          </Link>
        </nav>
        <button className='md:hidden text-gray-600 dark:text-gray-300' onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className='w-6 h-6' /> : <FaBars className='w-6 h-6' />}
        </button>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-md flex flex-col items-center gap-4 py-4'
          >
            <Link to="/" className='text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 font-Montserrat text-sm' onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/About" className='text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 font-Montserrat text-sm' onClick={toggleMenu}>
              About
            </Link>
            <Link to="/Account" className='text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 font-Montserrat text-sm' onClick={toggleMenu}>
              Account
            </Link>
            <Link to="/Journal" className='text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 font-Montserrat text-sm' onClick={toggleMenu}>
              Diary
            </Link>
          </motion.nav>
        )}
      </header>

      {/* Hero Section */}
      <section
        className='relative h-[50vh] w-full flex flex-col justify-center items-center text-center px-4 mt-16'
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${FAQsBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-3xl md:text-5xl font-semibold text-white font-Playfair mb-2'
        >
          FAQs
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-base md:text-lg text-gray-200 font-Montserrat max-w-xl'
        >
          Answers to help you navigate Painters' Diary with ease
        </motion.p>
      </section>

      {/* FAQ Sections */}
      {faqSections.map((section, sectionIdx) => (
        <motion.section 
          key={sectionIdx} 
          className='my-12 px-6 md:px-16 max-w-4xl mx-auto'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className='text-2xl md:text-3xl font-semibold text-violet-800 dark:text-violet-400 font-Playfair mb-8 text-center'>
            {section.title}
          </h2>
          <div className='space-y-4 text-gray-800 dark:text-gray-200 font-Montserrat'>
            {section.questions.map((item, qIdx) => {
              const key = `${sectionIdx}-${qIdx}`;
              const isOpen = openQuestions[key];
              return (
                <div key={qIdx} className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden'>
                  <button 
                    onClick={() => toggleQuestion(sectionIdx, qIdx)}
                    className='w-full p-5 flex justify-between items-center text-left text-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
                  >
                    <span>{item.q}</span>
                    <FaChevronDown className={`text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className='overflow-hidden'
                  >
                    <p className='px-5 pb-5 text-sm leading-relaxed'>{item.a}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.section>
      ))}

      {/* Footer / CTA */}
      <section className="text-center text-gray-800 dark:text-gray-200 font-Montserrat mt-8 px-4 pb-8">
        <p className='text-base'>
          Still have questions?{' '}
          <Link to="/Contact" className='text-violet-600 dark:text-violet-400 underline hover:text-violet-800 dark:hover:text-violet-300'>
            Contact us
          </Link>
        </p>
      </section>
    </div>
  );
};

export default FAQs;