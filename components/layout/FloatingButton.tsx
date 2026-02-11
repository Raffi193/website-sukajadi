import {FaWhatsapp} from 'react-icons/fa';

export default function FloatingButton() {
  return (
    <div className="fixed bottom-3 right-5 z-60">
      <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center gap-2 font-semibold transition-all hover:scale-105">
         <FaWhatsapp size={20} />
      </button>
    </div>
  );
}