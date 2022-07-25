import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favorites: [],
    };
  }

  componentDidMount = () => {
    this.recoverFavorites();
  }

  recoverFavorites = async () => {
    this.setState({ isLoading: true });
    this.setState({ favorites: await getFavoriteSongs() });
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading && <Loading />}
        {favorites.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
            favorites={ favorites }
            renderedInFavorites="renderedInFavorites"
          />
        ))}
        <p>Favorites Page</p>
      </div>
    );
  }
}

export default Favorites;
