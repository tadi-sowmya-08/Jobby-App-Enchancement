import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', submitErrorForm: false}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureData = errorMsg => {
    this.setState({errorMsg, submitErrorForm: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiSUrl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiSUrl, option)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureData(data.error_msg)
    }
  }

  render() {
    const {submitErrorForm, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <form className="form-conatiner" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label htmlFor="username" className="labelData">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="userInput"
            placeholder="username"
            onChange={this.changeUsername}
          />
          <label htmlFor="password" className="labelData">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="userInput"
            placeholder="password"
            onChange={this.changePassword}
          />

          <button className="btn" type="submit">
            Login
          </button>
          {submitErrorForm && <p className="error">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
