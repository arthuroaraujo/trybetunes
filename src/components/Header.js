import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';

class Header extends React.Component {
  // state = {
  //   user: '',
  //   loading: false,
  // };

  componentDidMount() {

  }

  render() {
    return (
      <header data-testid="header-component">
        Header
        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        {/* {loading ? (<Loading />) : (<p data-testid="header-user-name">Alo</p>)} */}

      </header>
    );
  }
}

export default Header;
