import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    inputSearch: '',
    inputArtist: '',
    isDisabled: true,
    loading: false,
    searchResults: [],
  };

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({
      inputSearch: value,
      inputArtist: value,
    }, () => {
      const searchLength = value.length;
      const minNumber = 2;
      const validation = searchLength >= minNumber;
      this.setState({ isDisabled: !validation });
    });
  };

  handleClick = () => {
    const { inputSearch } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      const searchResults = await searchAlbumsAPI(inputSearch);
      this.setState({
        loading: false,
        searchResults,
        inputSearch: '',
      });
    });
  };

  render() {
    const { inputSearch, isDisabled, loading, searchResults, inputArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (<Loading />)
          : (
            <form>
              <label htmlFor="name">
                Artista:
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
                onClick={ this.handleClick }
              >
                Pesquisar

              </button>
            </form>
          )}
        {searchResults.length > 0
          ? (
            <div>
              <h3>
                {`Resultado de álbuns de: ${inputArtist}`}
              </h3>
              <ul>
                {searchResults
                  .map((album) => (
                    <li key={ album.collectionId }>
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                        <h5>{ album.artistName }</h5>
                        <h5>{ album.collectionName }</h5>
                      </Link>
                    </li>
                  ))}

              </ul>
            </div>
          )
          : <h3>Nenhum álbum foi encontrado</h3>}
      </div>
    );
  }
}

export default Search;
