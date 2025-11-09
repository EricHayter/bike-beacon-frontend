
function Navbar() {
  return (
    <div className="join join-horizontal absolute top-4 left-1/2 -translate-x-1/2 z-10 w-96">
      <details className="dropdown">
        <summary className="btn join-item btn-lg hover:bg-primary hover:shadow-md transition-all duration-200">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="size-[1em]" stroke-width="1.5"><path d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </details>
      <label className="input join-item input-lg flex items-center gap-2 shadow-lg text-sm focus:outline-none focus:bg-base-200">
        <input type="search" required placeholder="Search" className="grow focus:outline-none focus:bg-base-200" />
      </label>
      {/* Search button */}
      <button className="btn join-item btn-lg hover:bg-primary hover:shadow-md transition-all duration-200">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="size-[1em]" stroke-width="1.5"><path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
    </div>
  )
}

export default Navbar
