import React, { useEffect, createContext, ReactNode, useState } from "react";

//type for the context value
interface SearchContextValue {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  searchEnabled: boolean;
  setSearchEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchContext = React.createContext<SearchContextValue>({
  search: "",
  setSearch: () => {},
  searchInput: "",
  setSearchInput: () => {},
  searchEnabled: true,
  setSearchEnabled: () => {},
});

//type for the children prop
interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(true);

  // Create the context value object
  const contextValue: SearchContextValue = {
    search,
    setSearch,
    searchInput,
    setSearchInput,
    searchEnabled,
    setSearchEnabled
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}
