import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    inputSearch: '',
    isDisabled: true,
  };

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({
      inputSearch: value,
    }, () => {
      const searchLength = value.length;
      const minNumber = 2;
      const validation = searchLength >= minNumber;
      this.setState({ isDisabled: !validation });
    });
  };

  render() {
    const { inputSearch, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="name">
            Nome:
            <input
              value={ inputSearch }
              type="text"
              data-testid="search-artist-input"
              name="inputSearch"
              onChange={ this.handleSearch }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
