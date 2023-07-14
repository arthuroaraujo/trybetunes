import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../styles/search.css';

class Search extends React.Component {
  state = {
    inputSearch: '',
    inputArtist: '',
    isDisabled: true,
    loading: false,
    searchResults: [],
    noAlbumsFound: false,
  };

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState(
      {
        inputSearch: value,
        inputArtist: value,
        noAlbumsFound: false,
      },
      () => {
        const searchLength = value.length;
        const minNumber = 2;
        const validation = searchLength >= minNumber;
        this.setState({ isDisabled: !validation });
      },
    );
  };

  handleClick = () => {
    const { inputSearch } = this.state;
    this.setState(
      {
        loading: true,
      },
      async () => {
        const searchResults = await searchAlbumsAPI(inputSearch);
        const noAlbumsFound = searchResults.length === 0;
        this.setState({
          loading: false,
          searchResults,
          inputSearch: '',
          noAlbumsFound,
        });
      },
    );
  };

  render() {
    const {
      inputSearch,
      isDisabled,
      loading,
      searchResults,
      inputArtist,
      noAlbumsFound,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-form-container">
          {loading ? (
            <Loading />
          ) : (
            <form className="search-form">
              <label htmlFor="name">
                Artista:
                <input
                  value={ inputSearch }
                  type="text"
                  data-testid="search-artist-input"
                  name="inputSearch"
                  onChange={ this.handleSearch }
                  className="search-input"
                />
              </label>
              <button
                className="search-button"
                type="button"
                data-testid="search-artist-button"
                disabled={ isDisabled }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
          )}
          {noAlbumsFound && searchResults.length === 0 && (
            <h3 className="no-albums-message">Nenhum álbum foi encontrado</h3>
          )}
        </div>
        {searchResults.length > 0 && (
          <div className="album-results-container">
            <h3 className="results-heading">
              {
                `Resultado de álbuns de: ${inputArtist}`
              }

            </h3>
            <div className="album-results-list">
              {searchResults.map((album) => (
                <div key={ album.collectionId } className="album-result-item">
                  <Link
                    to={ `/album/${album.collectionId}` }
                    className="album-link"
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <div className="album-box">
                      <img
                        src={ album.artworkUrl100 }
                        alt={ album.collectionName }
                        className="album-image"
                      />
                      <h5 className="artist-name">{album.artistName}</h5>
                      <h5 className="collection-name">{album.collectionName}</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
