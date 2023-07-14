import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/musicCard.css';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checked: false,
  };

  componentDidMount() {
    this.recoverFavorite();
  }

  handleFavorite = () => {
    const { song } = this.props;
    const { checked } = this.state;

    this.setState({
      loading: true,
    }, async () => {
      if (checked) {
        await removeSong(song);
      } else {
        await addSong(song);
      }

      this.setState((prevState) => ({
        loading: false,
        checked: !prevState.checked,
      }));
    });
  };

  recoverFavorite = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { trackId } = this.props;
      const resultsGetFavorite = await getFavoriteSongs();
      const favoriteTrackId = resultsGetFavorite.some((element) => element.trackId === trackId);
      this.setState({
        loading: false,
        checked: favoriteTrackId,
      });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;

    return (
      <div data-testid="page-not-found">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h4>{trackName}</h4>
            <audio data-testid="audio-component" src={previewUrl} controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento <code>audio</code>.
            </audio>
            <label htmlFor="favorite">
              Favorita
              <input
                type="checkbox"
                id="favorite"
                data-testid={`checkbox-music-${trackId}`}
                checked={checked}
                onChange={this.handleFavorite}
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;
