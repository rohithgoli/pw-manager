import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    addedPasswordsList: [],
    website: '',
    username: '',
    password: '',
    searchText: '',
    showPasswords: false,
  }

  onAddPassword = newPasswordData => {
    this.setState(prevState => ({
      addedPasswordsList: [...prevState.addedPasswordsList, newPasswordData],
    }))
  }

  onChangeWebsiteInput = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordValue = event => {
    this.setState({password: event.target.value})
  }

  onAddPasswordFormSubmit = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newData = {id: uuidv4(), website, username, password}
    this.onAddPassword(newData)
    this.setState({website: '', username: '', password: ''})
  }

  renderWebsiteInputField = () => {
    const {website} = this.state
    return (
      <div className="form-input-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
          alt="website"
          className="form-input-logo"
        />
        <input
          type="text"
          value={website}
          placeholder="Enter Website"
          className="form-input-field"
          onChange={this.onChangeWebsiteInput}
        />
      </div>
    )
  }

  renderUsernameInputField = () => {
    const {username} = this.state
    return (
      <div className="form-input-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
          alt="username"
          className="form-input-logo"
        />
        <input
          type="text"
          value={username}
          placeholder="Enter Username"
          className="form-input-field"
          onChange={this.onChangeUsernameInput}
        />
      </div>
    )
  }

  renderPasswordInputField = () => {
    const {password} = this.state
    return (
      <div className="form-input-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
          alt="password"
          className="form-input-logo"
        />
        <input
          type="password"
          value={password}
          placeholder="Enter Password"
          className="form-input-field"
          onChange={this.onChangePasswordValue}
        />
      </div>
    )
  }

  renderAddPasswordForm = () => (
    <form
      className="add-password-form-container"
      onSubmit={this.onAddPasswordFormSubmit}
    >
      <h1 className="form-title">Add New Password</h1>
      {this.renderWebsiteInputField()}
      {this.renderUsernameInputField()}
      {this.renderPasswordInputField()}
      <button type="submit" className="form-submit-btn">
        Add
      </button>
    </form>
  )

  renderAddPasswordSection = () => (
    <div className="add-password-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
        alt="password manager"
        className="pw-manager-sm-img"
      />
      {this.renderAddPasswordForm()}
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
        alt="password manager"
        className="pw-manager-lg-img"
      />
    </div>
  )

  onChangePasswordSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  onChangeShowPasswordsStatus = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  onDeletePwItem = itemId => {
    const {addedPasswordsList} = this.state
    const updatedPasswordsList = addedPasswordsList.filter(
      eachPwItem => eachPwItem.id !== itemId,
    )
    this.setState({addedPasswordsList: updatedPasswordsList})
  }

  renderNoPasswordsView = () => (
    <div className="no-pw-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-pw-image"
      />
      <p className="no-pw-msg">No Passwords</p>
    </div>
  )

  renderPasswordsView = () => {
    const {addedPasswordsList, showPasswords, searchText} = this.state

    if (searchText === '') {
      const filteredList = [...addedPasswordsList]
      if (filteredList.length !== 0) {
        return filteredList.map(eachItem => (
          <PasswordItem
            key={eachItem.id}
            itemDetails={eachItem}
            passwordDisplay={showPasswords}
            onDeletePwItem={this.onDeletePwItem}
          />
        ))
      }
      return this.renderNoPasswordsView()
    }
    const filteredList = addedPasswordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchText.toLowerCase()),
    )
    if (filteredList.length !== 0) {
      return filteredList.map(eachItem => (
        <PasswordItem
          key={eachItem.id}
          itemDetails={eachItem}
          passwordDisplay={showPasswords}
          onDeletePwItem={this.onDeletePwItem}
        />
      ))
    }
    return this.renderNoPasswordsView()
  }

  renderYourPasswordsSection = () => {
    const {searchText, showPasswords, addedPasswordsList} = this.state
    return (
      <div className="your-passwords-section-container">
        <div className="passwords-banner-section">
          <div className="pw-title-count-container">
            <h1 className="title">Your Passwords</h1>
            <p className="pw-count">{addedPasswordsList.length}</p>
          </div>
          <div className="pw-search-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="search-img"
            />
            <input
              type="search"
              className="pw-search-input"
              placeholder="Search"
              value={searchText}
              onChange={this.onChangePasswordSearchInput}
            />
          </div>
        </div>
        <div className="show-password-option-container">
          <input
            type="checkbox"
            name="show-pw-checkbox"
            className="pw-display-checkbox"
            value={showPasswords}
            onChange={this.onChangeShowPasswordsStatus}
          />
          <label htmlFor="show-pw-checkbox">Show Passwords</label>
        </div>
        <ul className="pw-display-container">{this.renderPasswordsView()}</ul>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        {this.renderAddPasswordSection()}
        {this.renderYourPasswordsSection()}
      </div>
    )
  }
}

export default PasswordManager
