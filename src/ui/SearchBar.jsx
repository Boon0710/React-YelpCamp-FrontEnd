import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchBar() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onSubmit = (data) => {
    const searchQuery = data.search.trim();
    const newSearchParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      newSearchParams.set("search", searchQuery);
    } else {
      newSearchParams.delete("search");
    }
    navigate(`/campgrounds?${newSearchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <div className="relative flex items-center w-full">
        <input
          {...register("search")}
          placeholder="Search campgrounds..."
          className="px-4 py-2 w-full border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 text-black font-semibold border border-l-0 border-gray-300 rounded-r-lg hover:bg-yellow-500 transition duration-300 focus:ring-2 focus:ring-yellow-500"
        >
          <FaSearch size={24} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
