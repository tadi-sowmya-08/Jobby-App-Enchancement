import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaRegStar, FaBriefcase, FaMapMarkerAlt} from 'react-icons/fa'

import Header from '../Header'
import Profile from '../Profile'
import TypeofEmployment from '../TypeofEmployment'
import SalaryRange from '../SalaryRange'

import './index.css'

const status = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  noJob: 'NOJOB',
}

class Jobs extends Component {
  state = {
    selectedEmployeeList: [],
    selectedSalaryRange: '',
    jobList: [],
    searchInput: '',
    apiStatus: status.initial,
  }

  componentDidMount() {
    this.fetchDetails()
  }

  handleSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  handleSearchClick = () => {
    this.fetchDetails()
  }

  handleEmploymentChange = (id, checked) => {
    this.setState(prevState => {
      let updatedList = [...prevState.selectedEmployeeList]
      if (checked) {
        updatedList.push(id)
      } else {
        updatedList = updatedList.filter(eachItem => eachItem !== id)
      }
      return {selectedEmployeeList: updatedList}
    }, this.fetchDetails)
  }

  handleSalaryChange = id => {
    this.setState({selectedSalaryRange: id}, this.fetchDetails)
  }

  getJobsApiCall = () => {
    const {searchInput, selectedSalaryRange, selectedEmployeeList} = this.state
    const employeryQuery = selectedEmployeeList.join(',')
    const salaryQuery = selectedSalaryRange
    const searchQuery = searchInput
    return `https://apis.ccbp.in/jobs?employment_type=${employeryQuery}&minimum_package=${salaryQuery}&search=${searchQuery}`
  }

  fetchDetails = async () => {
    this.setState({apiStatus: status.progress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = this.getJobsApiCall()
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updateList = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      if (data.jobs.length === 0) {
        this.setState({jobList: [], apiStatus: status.noJob})
      } else {
        this.setState({jobList: updateList, apiStatus: status.success})
      }
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  getFailureDetails = () => {
    this.fetchDetails()
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        className="retry-button"
        type="button"
        onClick={this.getFailureDetails}
      >
        Retry
      </button>
    </>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-image"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>{' '}
    </>
  )

  renderSuccessView = () => {
    const {jobList} = this.state

    return (
      <ul className="ulConatiner">
        {jobList.map(eachitem => (
          <Link
            to={`/jobs/${eachitem.id}`}
            key={eachitem.id}
            className="id-link"
          >
            <>
              <li className="jobItem">
                <div className="first-part">
                  <img
                    src={eachitem.companyLogoUrl}
                    alt="company logo"
                    className="company-logo"
                  />
                  <div className="second-part">
                    <h3>{eachitem.title}</h3>
                    <div className="rating">
                      <FaRegStar className="star" />
                      <p>{eachitem.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="icons">
                  <div className="data">
                    <div className="icons-data">
                      <FaMapMarkerAlt className="location" />
                      <p>{eachitem.location}</p>
                    </div>
                    <div className="icons-data">
                      <FaBriefcase className="location" />
                      <p>{eachitem.employmentType}</p>
                    </div>
                  </div>
                  <h2>{eachitem.packagePerAnnum}</h2>
                </div>
                <hr className="card-hr" />
                <h2>Description</h2>
                <p>{eachitem.jobDescription}</p>
              </li>
            </>
          </Link>
        ))}
      </ul>
    )
  }

  renderFetchDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.progress:
        return this.renderLoadingView()
      case status.failure:
        return this.renderFailureView()
      case status.success:
        return this.renderSuccessView()
      case status.noJob:
        return this.renderNoJobView()
      default:
        return null
    }
  }

  render() {
    const {selectedEmployeeList, searchInput} = this.state
    return (
      <div className="Jobs-Container">
        <Header className="header" />
        <div className="jobs-inner-container">
          <div className="profile-Container">
            <Profile />
            <hr className="hr-element" />

            <TypeofEmployment
              selectedTypes={selectedEmployeeList}
              handleChange={this.handleEmploymentChange}
            />
            <hr className="hr-element" />

            <SalaryRange handleChange={this.handleSalaryChange} />
          </div>
          <div className="seach-container">
            <div className="search-data">
              <input
                type="search"
                placeholder="Search"
                className="input-search"
                value={searchInput}
                onChange={this.handleSearchChange}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.handleSearchClick}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderFetchDetails()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
