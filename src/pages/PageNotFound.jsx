import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-white text-center p-6">
      <h1 className="text-5xl font-bold mb-6">404</h1>
      <p className="text-xl mb-6">
        The page you are looking for could not be found.
      </p>
      <button
        onClick={moveBack}
        className="bg-white text-green-500 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default PageNotFound;
