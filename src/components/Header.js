import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    user: '',
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();
      this.setState({ user, loading: false });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? (<Loading />) : (<p data-testid="header-user-name">{user.name}</p>)}
        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>

      </header>
    );
  }
}

export default Header;
