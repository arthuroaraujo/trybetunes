import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    inputName: '',
    isDisabled: true,
    loading: false,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputName: value,
    }, () => {
      const nameLength = value.length;
      const minNumber = 3;
      const validation = nameLength >= minNumber;
      this.setState({ isDisabled: !validation });
    });
  };

  handleClick = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { inputName } = this.state;
      await createUser({ name: inputName });
      const { history } = this.props;
      history.push('/search');
    });
  };

  render() {
    const { inputName, isDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Nome:
            <input
              value={ inputName }
              type="text"
              data-testid="login-name-input"
              name="inputName"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </form>
        {loading && (
          <Loading />
        )}
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
