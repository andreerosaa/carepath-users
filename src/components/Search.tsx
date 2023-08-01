import {TbSearch} from 'react-icons/tb';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';

type Props = {}

const Search = (props: Props) => {

  const {search, setSearch} = useContext(SearchContext);
  const {searchInput, setSearchInput} = useContext(SearchContext);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const stringSearch = searchInput;
    setSearch(stringSearch);
    setSearchInput("");
  }

    return (
    <form className='search-form' onSubmit={handleSubmit}>
        <TbSearch className='search-icon' size={22}/>
        <input className='search-input' type="text" value={searchInput} placeholder='Search' onChange={(e) => setSearchInput(e.target.value)}/>
    </form>
  )
}

export default Search