import {FaWhatsapp} from 'react-icons/fa';

export default function FloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 z-60">
      <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-semibold transition-all hover:scale-105">
         <FaWhatsapp size={20} />
         Butuh Bantuan?
      </button>
    </div>
  );
}