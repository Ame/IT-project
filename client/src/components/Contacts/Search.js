//Searchbar display element. 
//Referenced from: https://www.emgoto.com/react-search-bar/

const Search = ({ searchQuery, setSearchQuery }) => (
    
    <form action="/contacts" method="get">
        <div id="search">
              <input 
                id="searchInput" type="text" placeholder="Search by Name" name="s" 
                value={searchQuery} onInput={e => setSearchQuery(e.target.value)}/>
              <button type="submit">Search</button>
        </div>
        <div className="container" id="tags">
            <strong>Filter by tags:&nbsp; </strong> list tags here
        </div>
    </form>
);

export default Search;