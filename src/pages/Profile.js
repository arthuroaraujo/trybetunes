import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/profile.css';

class Profile extends React.Component {
  state = {
    user: null,
    loading: true,
  };

  componentDidMount() {
    this.fetchUserProfile();
  }

  fetchUserProfile = async () => {
    const user = await getUser();
    this.setState({ user, loading: false });
  };

  render() {
    const { user, loading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile-card">
          {' '}
          {loading ? (
            <Loading />
          ) : (
            <div className="profile-div">
              <h2>Perfil</h2>
              <p>
                <strong>Nome:</strong>
                {' '}
                {user.name}
              </p>
              <p>
                <strong>Email:</strong>
                {' '}
                {user.email}
              </p>
              <p>
                <strong>Descrição:</strong>
                {' '}
                {user.description}
              </p>
              <img src={ user.image } alt="Profile" data-testid="profile-image" />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
