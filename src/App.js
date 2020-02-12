import React from 'react';
import {SearchBar} from './components';
import {FilterableProductTable} from './components';
import './App.css';

function App() {
  return (
    <div>
      <SearchBar />
      <FilterableProductTable />
    </div>
  );
}

export default App;
