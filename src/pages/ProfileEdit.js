import React from "react";
import Header from "../components/Header";
import { getUser, updateUser } from "../services/userAPI";
import '../styles/profileEdit.css';

class ProfileEdit extends React.Component {
  state = {
    name: "",
    email: "",
    description: "",
    image: "",
    loading: true,
    formValid: false,
  };

  componentDidMount() {
    this.fetchUserProfile();
  }

  fetchUserProfile = async () => {
    const user = await getUser();
    this.setState({ ...user, loading: false });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.validateForm);
  };

  validateForm = () => {
    const { name, email, description } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isFormValid =
      name !== "" && email !== "" && description !== "" && isEmailValid;
    this.setState({ formValid: isFormValid });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, description, image } = this.state;
    const updatedUser = { name, email, description, image };
    await updateUser(updatedUser);
    this.props.history.push("/profile");
  };

  handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      this.setState({ image: reader.result });
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  

  render() {
    const { name, email, description, image, loading, formValid } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <h1>Carregando...</h1>
        ) : (
          <div>
            <h2>Editar Perfil</h2>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">
                Nome:
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  data-testid="edit-input-name"
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  data-testid="edit-input-email"
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="description">
                Descrição:
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  data-testid="edit-input-description"
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="image">
                Foto:
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  data-testid="edit-input-image"
                  onChange={this.handleImageUpload}
                />
              </label>

              <button
                type="submit"
                data-testid="edit-button-save"
                disabled={!formValid}
              >
                Salvar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
