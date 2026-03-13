import { Link, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">CMS UNIQLA</h1>

      <div className="flex gap-6 items-center">
        <Link to="/categories" className="hover:text-gray-300">
          Categories
        </Link>
        <Link to="/adduser" className="hover:text-gray-300">
          AddUser
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
