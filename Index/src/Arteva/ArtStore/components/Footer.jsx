import React from 'react';

const Footer = () => (
  <footer className="py-4 text-center text-zinc-400 text-sm border-t border-zinc-100 mt-20">
    <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p>© {new Date().getFullYear()} Painters' Diary Gallery. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
        <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
        <a href="#" className="hover:text-zinc-900 transition-colors">Support</a>
      </div>
    </div>
  </footer>
);

export default Footer;