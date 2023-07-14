import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import '../styles/favorites.css';

class Favorites extends React.Component {
  state = {
    favoriteSongs: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, loading: false });
  };

  handleRemoveSong = async (song) => {
    this.setState({ loading: true });
    await removeSong(song);
    this.fetchFavoriteSongs();
  };

  render() {
    const { favoriteSongs, loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            {favoriteSongs.length === 0 ? (
              <h3>Não há músicas favoritas</h3>
            ) : (
              favoriteSongs.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  song={ song }
                  trackId={ song.trackId }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  onRemoveSong={ this.handleRemoveSong }
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
