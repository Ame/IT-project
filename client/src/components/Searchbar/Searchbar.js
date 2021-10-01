import React from "react";

function Searchbar() {
  return (
    <div id="container">
      <div id="search">
        <label for="searchInput">
          Find <i class="fa fa-search"></i>Contacts
        </label>
        <input id="searchInput" type="text" placeholder="Search" />
      </div>

      <ul id="results">
        <li class="name">Bob</li>
        <li class="name">Kate</li>
        <li class="name">Cindy</li>
        <li class="name">Kelly</li>
      </ul>
    </div>
  );
}

export default Searchbar;
