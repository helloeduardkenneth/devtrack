import { Bell, Search, Plus } from 'lucide-react'

interface HeaderProps {
  onAddJob: () => void
}

const Header = ({ onAddJob }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div className="relative w-96">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search applications, companies, or positions..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 text-sm transition-all placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-xl p-2.5 text-slate-500 transition-all hover:bg-slate-50">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
        </button>

        <button
          onClick={onAddJob}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          New Application
        </button>
      </div>
    </header>
  )
}

export default Header
