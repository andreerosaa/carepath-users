import {TbSearch} from 'react-icons/tb'

type Props = {}

const Search = (props: Props) => {

    return (
    <form className='search-form'>
        <TbSearch className='search-icon' size={25}/>
        <input className='search-input' type="text" placeholder='Search'/>
    </form>
  )
}

export default Search