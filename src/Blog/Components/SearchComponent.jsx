import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiSprout } from "react-icons/gi";
import { FiFileText } from "react-icons/fi";
import { blogSearchAPI } from "../../Service/Operation/BlogService";
import AuthContext from "../../Context/AuthContext";

function ResultCard({ item, onClose }) {
  const navigate = useNavigate();

  function handleClick() {
    onClose();
    navigate(`/blog/details/${item.id}`);
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer block bg-white rounded-xl shadow hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden group"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-40 w-full h-40 md:h-auto flex-shrink-0 bg-gray-100 flex items-center justify-center overflow-hidden">
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-emerald-600">
              <FiFileText size={48} />
            </div>
          )}
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2 line-clamp-3">
              {item.trimContent || item.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {item.tags &&
              item.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
            <span>{item.category}</span>
            <span>
              {item.createdAt && new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-40 w-full h-40 md:h-auto bg-gray-200" />
        <div className="flex-1 p-4">
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-100 rounded w-3/4 mb-1"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-1"></div>
          <div className="flex gap-2 mt-2">
            <div className="h-4 w-12 bg-gray-100 rounded-full"></div>
            <div className="h-4 w-10 bg-gray-100 rounded-full"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const NoResults = ({ query }) => (
  <div className="text-center p-10">
    <h3 className="text-xl font-bold text-gray-800">No Results Found</h3>
    <p className="text-gray-500 mt-1">
      We couldn't find anything matching "{query}".
    </p>
  </div>
);

export default function SearchComponent({
  searchQuery,
  resetQuery,
  loading,
  setLoading,
  onClose,
}) {
  const [results, setResults] = useState([]);

  const authContext = useContext(AuthContext);
  const { token } = authContext?.data || {};

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const debounceTimer = setTimeout(async () => {
      try {
        const response = await blogSearchAPI(token, searchQuery);
        if (response.status === 200) {
          const data = response?.data?.data || [];
          setResults(data);
        } else {
          setResults([]);
        }
      } catch (error) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  return (
    <div className="bg-white min-h-screen font-sans p-4 md:p-8 relative">
      {onClose && (
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10"
          onClick={() => {
            if (resetQuery) resetQuery();
            onClose();
          }}
          aria-label="Close search"
        >
          &times;
        </button>
      )}
      <div className="max-w-2xl mx-auto">
        {/* Results Area */}
        <div className="mt-6 space-y-4">
          {loading && <LoadingSkeleton />}
          {!loading &&
            results.length > 0 &&
            results.map((item) => (
              <ResultCard key={item.id} item={item} onClose={onClose} />
            ))}
          {!loading && results.length === 0 && searchQuery.trim() !== "" && (
            <NoResults query={searchQuery} />
          )}
          {!loading && searchQuery.trim() === "" && (
            <div className="text-center p-10 text-gray-400">
              <p>Start typing to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
