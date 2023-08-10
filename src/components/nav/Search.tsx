import {TbSearch} from 'react-icons/tb';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

const Search = () => {

  const {search, setSearch,searchInput, setSearchInput, searchEnabled, setSearchEnabled} = useContext(SearchContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //prevent page reload
    e.preventDefault();
    if(searchInput !== ""){
      setSearch(searchInput);
      setSearchEnabled(false);
      setSearchInput("");
    }
  }

    return (
    <form className='search-form' onSubmit={(e) => handleSubmit(e)}>
        <TbSearch className='search-icon' size={22}/>
        <input disabled={!searchEnabled} className='search-input' maxLength={25} type="text" value={searchInput} placeholder={searchEnabled?'Search':'Loading...'} onChange={(e) => setSearchInput(e.target.value)}/>
    </form>
  )
}

export default Search