import FilterIcon from "../icons/FilterIcon";
import SearchIcon from "../icons/SearchIcon";

function Navbar() {
  return (
    <div className="join join-horizontal absolute top-4 left-1/2 z-10 w-96 -translate-x-1/2 shadow-lg">
      <details className="dropdown">
        <summary className="btn join-item btn-sm btn-soft">
          <FilterIcon />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </details>
      <label className="input join-item input-sm flex items-center gap-2 text-sm">
        <input type="search" required placeholder="Search" className="grow" />
      </label>
      {/* Search button */}
      <button className="btn join-item btn-sm btn-soft btn-primary">
        <SearchIcon />
      </button>
    </div>
  );
}

export default Navbar;
