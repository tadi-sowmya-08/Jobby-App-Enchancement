import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {
  FaRegStar,
  FaBriefcase,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from 'react-icons/fa'

import Header from '../Header'
import './index.css'

const status = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  noJob: 'NOJOB',
}
class JobItemsDetails extends Component {
  state = {jobDetailsData: {}, apiStatus: status.initial}

  componentDidMount() {
    this.getJobIdDetails()
  }

  getJobIdDetails = async () => {
    this.setState({apiStatus: status.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(skill => ({
          imageUrl: skill.image_url,
          name: skill.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
      }

      const updatedSimilarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      const updatedData = {
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
      }

      this.setState({jobDetailsData: updatedData, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-con">
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
        onClick={this.getJobIdDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetailsData} = this.state
    const {jobDetails, similarJobs} = jobDetailsData
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        <div className="bg-data">
          <div className="first-part">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="second-part">
              <h1>{title}</h1>
              <div className="rating">
                <FaRegStar className="star" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="icons">
            <div className="data">
              <div className="icons-data">
                <FaMapMarkerAlt className="location" />
                <p>{location}</p>
              </div>
              <div className="icons-data">
                <FaBriefcase className="location" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="card-hr2" />
          <div className="description-part">
            <h1>Description</h1>
            <button
              className="visit-button"
              type="button"
              onClick={() =>
                window.open(companyWebsiteUrl, '_blank', 'noopener,noreferrer')
              }
            >
              <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                Visit
              </a>{' '}
              <FaExternalLinkAlt />
            </button>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skillConatiner">
            {skills.map(eachItem => (
              <li className="skill-list" key={eachItem.name}>
                <div className="listItem2">
                  <img
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                    className="skill-image"
                  />
                  <p>{eachItem.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="life-at-comapany">
            <p>{description}</p>
            <img src={imageUrl} alt="life at company" className="life-logo" />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="similar-jobs">
          {similarJobs.map(eachItem => (
            <li className="jobs-container2" key={eachItem.id}>
              <div className="first-part">
                <img
                  src={eachItem.companyLogoUrl}
                  alt="similar job company logo"
                  className="company-logo2"
                />
                <div className="second-part">
                  <h3>{eachItem.title}</h3>
                  <div className="rating">
                    <FaRegStar className="star" />
                    <p>{eachItem.rating}</p>
                  </div>
                </div>
              </div>
              <h2>Description</h2>
              <p>{eachItem.jobDescription}</p>
              <div className="icons">
                <div className="data">
                  <div className="icons-data">
                    <FaMapMarkerAlt className="location" />
                    <p>{eachItem.location}</p>
                  </div>
                  <div className="icons-data">
                    <FaBriefcase className="location" />
                    <p>{eachItem.employmentType}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.progress:
        return this.renderLoadingView()
      case status.success:
        return this.renderSuccessView()
      case status.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="job-container3">{this.renderDetails()}</div>
      </div>
    )
  }
}

export default JobItemsDetails
