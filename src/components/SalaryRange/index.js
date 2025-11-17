import './index.css'

const SalaryRange = props => {
  const {handleChange} = props
  const salaryRangesList = [
    {
      salaryRangeId: '1000000',
      label: '10 LPA and above',
    },
    {
      salaryRangeId: '2000000',
      label: '20 LPA and above',
    },
    {
      salaryRangeId: '3000000',
      label: '30 LPA and above',
    },
    {
      salaryRangeId: '4000000',
      label: '40 LPA and above',
    },
  ]
  const onHandleChange = event => {
    handleChange(event.target.value)
  }
  return (
    <>
      <h1>Salary Range</h1>
      <ul className="employement-typeCon">
        {salaryRangesList.map(eachItem => (
          <li key={eachItem.salaryRangeId}>
            <input
              type="radio"
              value={eachItem.salaryRangeId}
              id={`salary-${eachItem.salaryRangeId}`}
              name="salaryRange"
              onChange={onHandleChange}
            />
            <label htmlFor={`salary-${eachItem.salaryRangeId}`}>
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SalaryRange
