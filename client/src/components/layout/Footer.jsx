import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Site Links */}
          <div className="col-span-1">
            <h4 className="text-[14px] font-bold text-[#0F1724] mb-4 uppercase tracking-wider">Site Links</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#0B67FF]">Destinations</a></li>
              <li><a href="#" className="hover:text-[#0B67FF]">Offers</a></li>
              <li><a href="#" className="hover:text-[#0B67FF]">About</a></li>
              <li><a href="#" className="hover:text-[#0B67FF]">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2 md:ml-auto w-full max-w-md">
            <h4 className="text-[14px] font-bold text-[#0F1724] mb-4 uppercase tracking-wider">Newsletter Signup up</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email email" 
                className="flex-1 bg-[#F8FAFC] border border-gray-200 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-[#0B67FF]"
              />
              <button className="bg-[#0B67FF] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#0956d6] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-50 pt-8 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">© 2024 TravelSimple. All rights reserved.</p>
          <div className="flex gap-6 text-gray-400">
            <Facebook size={18} className="cursor-pointer hover:text-[#0B67FF]" />
            <Twitter size={18} className="cursor-pointer hover:text-[#0B67FF]" />
            <Instagram size={18} className="cursor-pointer hover:text-[#0B67FF]" />
            <Youtube size={18} className="cursor-pointer hover:text-[#0B67FF]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;