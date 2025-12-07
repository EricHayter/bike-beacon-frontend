import { useRef, useEffect } from "react";
import FilterIcon from "../icons/FilterIcon";
import SearchIcon from "../icons/SearchIcon";

function Navbar() {
  const filterDropdownRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        filterDropdownRef.current.open = false;
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="join join-horizontal absolute top-4 left-1/2 z-10 w-96 -translate-x-1/2 shadow-lg">
      <details ref={filterDropdownRef} className="dropdown">
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
      <label className="input join-item input-sm focus-within:ring-primary/20 flex items-center gap-2 text-sm focus-within:ring-2 focus-within:outline-none">
        <input
          type="search"
          required
          placeholder="Search"
          className="grow outline-none focus:outline-none"
        />
      </label>
      {/* Search button */}
      <button className="btn join-item btn-sm btn-soft btn-primary">
        <SearchIcon />
      </button>
    </div>
  );
}

export default Navbar;
