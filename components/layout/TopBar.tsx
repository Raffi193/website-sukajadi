import Link from 'next/link';
import { Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-blue-600 text-white py-2 text-sm hidden md:block">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>0812-3456-7890</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>admin@sukajadi.go.id</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-blue-200 transition"><Facebook size={16} /></Link>
          <Link href="#" className="hover:text-blue-200 transition"><Instagram size={16} /></Link>
          <Link href="#" className="hover:text-blue-200 transition"><Youtube size={16} /></Link>
        </div>
      </div>
    </div>
  );
}