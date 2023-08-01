import React, { useEffect, createContext, ReactNode, useState } from "react";

//type for the context value
interface SearchContextValue {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = React.createContext<SearchContextValue>({
  search: "",
  setSearch: () => {},
  searchInput: "",
  setSearchInput: () => {},
});

//type for the children prop
interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
  }, [search]);

  // Create the context value object
  const contextValue: SearchContextValue = {
    search,
    setSearch,
    searchInput,
    setSearchInput,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}
