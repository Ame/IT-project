//Searchbar display element. 
//Referenced from: https://www.emgoto.com/react-search-bar/

const Search = ({ searchQuery, setSearchQuery }) => (
    
    <form action="/contacts" method="get">
        <div id="search">
              <label for="searchInput">Find <i class="fa fa-search"></i>Contacts</label>
              <input 
                id="searchInput" type="text" placeholder="Search" name="s" 
                value={searchQuery} onInput={e => setSearchQuery(e.target.value)}/>
              <button type="submit">Search</button>
        </div>
    </form>
);

export default Search;