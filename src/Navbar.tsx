import FilterIcon from './components/icons/FilterIcon';
import SearchIcon from './components/icons/SearchIcon';

function Navbar() {
  return (
    <div className="join join-horizontal absolute top-4 left-1/2 -translate-x-1/2 z-10 w-96">
      <details className="dropdown">
        <summary className="btn join-item btn-lg shadow-lg hover:bg-primary hover:shadow-md transition-all duration-200 border-none">
          <FilterIcon />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </details>
      <label className="input join-item input-lg flex items-center gap-2 shadow-lg text-sm focus-within:outline-none focus-within:ring-0 border-none">
        <input type="search" required placeholder="Search" className="grow focus:outline-none focus:ring-0 outline-none shadow-lg" />
      </label>
      {/* Search button */}
      <button className="btn join-item btn-lg shadow-lg hover:bg-primary hover:shadow-md transition-all duration-200 border-none">
        <SearchIcon />
      </button>
    </div>
  )
}

export default Navbar
