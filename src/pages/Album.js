import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    resultsGetMusics: [],
  };

  componentDidMount() {
    this.setState({
    }, async () => {
      const { match: { params: { id } } } = this.props;
      const resultsGetMusics = await getMusics(id);
      this.setState({ resultsGetMusics });
    });
  }

  render() {
    const { resultsGetMusics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { resultsGetMusics.length > 0 && (
          <div>

            <h3 data-testid="artist-name">{resultsGetMusics[0].artistName}</h3>
            <h3 data-testid="album-name">
              {
                `${resultsGetMusics[0].collectionName} 
            ${resultsGetMusics[0].artistName
          }`
              }

            </h3>

          </div>)}
        { resultsGetMusics.length > 0 && (
          resultsGetMusics.map((element, index) => (
            index > 0 && (
              <MusicCard
                song={ element }
                trackId={ element.trackId }
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }
              />
            )
          ))
        )}
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
