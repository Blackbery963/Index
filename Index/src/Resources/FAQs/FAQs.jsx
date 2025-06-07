import React from 'react';
import { Link } from 'react-router-dom';
import FAQsBackground from './FAQs-images/FAQS.jpeg'
import { FaHome, FaInfoCircle, FaUser, FaBook } from 'react-icons/fa'

const faqSections = [
  {
    title: "Getting to Know Painters' Diary",
    questions: [
      {
        q: "What is Painters' Diary?",
        a: "Painters' Diary is an art-focused platform for artists to share their work, maintain a visual diary, and collaborate with other creatives."
      },
      {
        q: "Who can join Painters' Diary?",
        a: "Any artist from anywhere in the world can join, whether you’re a painter, illustrator, digital artist, or creator of any kind."
      },
      {
        q: "Is Painters' Diary free to use?",
        a: "Yes, all core features of Painters' Diary are free. We aim to make the platform accessible to every artist."
      },
      {
        q: "Can I follow other artists?",
        a: "Yes, following artists is a great way to stay inspired and engaged. Follow your favorite creators and receive updates on their latest works."
      }
    ]
  },
  {
    title: "Share Your Art with the World",
    questions: [
      {
        q: "How do I upload my artwork?",
        a: "Once registered, you can upload art by navigating to the upload page. Fill in details like title, tags, description, and medium."
      },
      {
        q: "What types of files are supported?",
        a: "We currently support JPEG, PNG, and GIF formats. Larger files are optimized for web display."
      },
      {
        q: "Can I edit or delete my uploads?",
        a: "Absolutely. You can manage your uploaded artworks from your profile dashboard."
      },
      {
        q: "Can I sell my artwork?",
        a: "This feature is coming soon! Stay tuned for future updates that will allow artists to list their works for sale."
      }
    ]
  },
  {
    title: "Your Artistic Diary",
    questions: [
      {
        q: "What is a Diary entry?",
        a: "A Diary entry is a visual journal where artists can share ideas, progress, thoughts, or behind-the-scenes work."
      },
      {
        q: "How often can I post diary entries?",
        a: "As often as you like! Many artists use it daily to reflect on their process or share WIPs (Works in Progress)."
      },
      {
        q: "Are diary entries public?",
        a: "By default, yes. But you can mark entries private if you prefer to keep them personal or draft-only."
      },
      {
        q: "Can I add sketches or photos to my diary?",
        a: "Yes! Diary entries can include images, text, and tags to keep things organized and expressive."
      }
    ]
  },
  {
    title: "Collaborate and Connect",
    questions: [
      {
        q: "How can I find collaborators?",
        a: "Use the 'Collaborate' tab to browse artist profiles and post collaboration requests or ideas."
      },
      {
        q: "Can we work on shared projects?",
        a: "Yes! Collaborative projects allow multiple artists to contribute to one project space with shared updates."
      },
      {
        q: "Is there a messaging feature?",
        a: "Direct messaging is in development. For now, use the contact links provided on artist profiles."
      },
      {
        q: "Can I collaborate across countries?",
        a: "Definitely! Painters' Diary is built for a global community of artists."
      }
    ]
  }
];

const FAQs = () => {
  return (
    <div className='min-h-screen max-w-screen bg-slate-300 flex flex-col overflow-x-hidden overflow-y-auto pb-6 pt-[100px]'>
                <header className=' h-[100px] w-full bg-gradient-to-l from-[#10002bad] to-[#dec9e9a9] backdrop-blur-md flex items-center justify-between px-4 md:px-6 shadow-lg text-white fixed top-0 z-50'>
            {/* Logo */}
            <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] font-bold font-Eagle'>Painters' Diary</h1>
            {/* Navigation */}
            <div className='flex items-center justify-center gap-x-2'>
                    <Link to={"/"}>
                        <button className='lg:px-4 px-2 py-1 bg-violet-900/50 hover:bg-violet-800/80 rounded-md font-Playfair text-white border border-gray-400 text-[18px]'>
                            <FaHome className="text-xl sm:hidden" />
                            <span className="hidden sm:inline">Home</span>
                        </button>
                    </Link>
                    <Link to={"/About"}>
                        <button className='lg:px-4 px-2 py-1 bg-violet-900/50 hover:bg-violet-800/80 rounded-md font-Playfair text-white border border-gray-400 text-[18px]'>
                            <FaInfoCircle className="text-xl sm:hidden" />
                            <span className="hidden sm:inline">About</span>
                        </button>
                    </Link>
                    <Link to={"/Account"}>
                        <button className='lg:px-4 px-2 py-1 bg-violet-900/50 hover:bg-violet-800/80 rounded-md font-Playfair text-white border border-gray-400 text-[18px]'>
                            <FaUser className="text-xl sm:hidden"/>
                            <span className="hidden sm:inline">Account</span>
                        </button>
                    </Link>
                    <Link to={"/Journal"}>
                        <button className='lg:px-4 px-2 py-1 bg-violet-900/50 hover:bg-violet-800/80 rounded-md font-Playfair text-white border border-gray-400 text-[18px]'>
                            <FaBook className="text-xl sm:hidden" />
                            <span className="hidden sm:inline">Diary</span>
                        </button>
                    </Link>
                </div>
            </header>
      {/* Hero Section */}
      <section
        className='relative h-[70vh] w-[90%] flex flex-col justify-center items-center text-white font-semibold text-center px-4 mx-auto mt-[10px]'
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${FAQsBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1 className='text-4xl md:text-5xl font-bold font-Playfair mb-4'>Frequently Asked Questions</h1>
        <p className='text-md md:text-lg font-Montserrat max-w-2xl'>
          Get answers to common questions about Painters' Diary, including how to upload art, keep your diary, and collaborate with artists.
        </p>
      </section>

      {/* FAQ Sections */}
      {faqSections.map((section, idx) => (
        <section key={idx} className='my-12 px-6 md:px-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-center text-violet-800 font-Playfair mb-10'>
            {section.title}
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 text-black font-Montserrat'>
            {section.questions.map((item, i) => (
              <div key={i} className='bg-gradient-to-br from-white via-white to-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                <h3 className='text-xl font-semibold mb-2'>{i + 1}. {item.q}</h3>
                <p className='text-sm leading-relaxed'>{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Footer / CTA */}
      <section className="text-center text-black font-Playfair mt-8 px-4">
        <p className='text-lg'>
          Still have questions?{' '}
          <Link to="/Contact" className='text-violet-800 underline hover:text-violet-600'>
            Reach out to us!
          </Link>
        </p>
      </section>
    </div>
  );
};

export default FAQs;
