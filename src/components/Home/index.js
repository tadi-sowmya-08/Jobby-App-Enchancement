import {Redirect, withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

const Home = props => {
  const {history} = props
  const token = Cookies.get('jwt_token')
  const sendJobsRoute = () => {
    history.replace('/jobs')
  }
  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="home-con">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button
              type="button"
              className="home-button"
              onClick={sendJobsRoute}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default withRouter(Home)
