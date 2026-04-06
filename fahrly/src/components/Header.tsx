import { Search, User, Car, ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 h-20 flex items-center px-4 md:px-8 justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2 text-rose-500 shrink-0">
        <Car size={28} className="fill-current" />
        <span className="font-black text-2xl tracking-tighter text-rose-500">fahrly</span>
      </div>

      <div className="hidden md:flex flex-1 max-w-2xl mx-8 gap-3 items-center">
        <div className="relative shrink-0">
          <select 
             style={{ backgroundColor: '#f7f7f7', color: '#1a1a1a' }}
             className="appearance-none border border-gray-200 hover:bg-white font-semibold py-3.5 pl-5 pr-10 rounded-full outline-none cursor-pointer transition-all text-sm focus:ring-2 focus:ring-rose-500/30 ring-1 ring-gray-200"
             defaultValue="Berlin"
          >
            <option value="Berlin">Berlin</option>
            <option value="Munich">Munich</option>
            <option value="Hamburg">Hamburg</option>
            <option value="Frankfurt">Frankfurt</option>
            <option value="Cologne">Cologne</option>
            <option value="Stuttgart">Stuttgart</option>
          </select>
          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" strokeWidth={3} />
        </div>
        <div className="relative w-full group">
          <input 
            type="text" 
            placeholder="Search driving schools..." 
            style={{ 
              backgroundColor: '#f7f7f7', 
              color: '#1a1a1a', 
              WebkitAppearance: 'none' 
            }}
            className="w-full border-none rounded-full py-3.5 pl-12 pr-6 text-sm font-semibold outline-none focus:ring-2 focus:ring-rose-500/30 ring-1 ring-gray-200 transition-all placeholder:text-gray-400"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button className="text-sm font-bold text-gray-700 hover:text-black hidden sm:block">List your school</button>
        <button className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-bold py-2.5 px-4 rounded-full border border-gray-200 shadow-sm transition-all hover:shadow-md">
          <div className="p-1 rounded-full bg-gray-100">
            <User size={16} />
          </div>
          <span className="text-sm">Sign In</span>
        </button>
      </div>
    </header>
  );
}
