import './index.css'

const TypeofEmployment = props => {
  const employmentTypesList = [
    {
      label: 'Full Time',
      employmentTypeId: 'FULLTIME',
    },
    {
      label: 'Part Time',
      employmentTypeId: 'PARTTIME',
    },
    {
      label: 'Freelance',
      employmentTypeId: 'FREELANCE',
    },
    {
      label: 'Internship',
      employmentTypeId: 'INTERNSHIP',
    },
  ]
  const {selectedTypes, handleChange} = props
  const handleCheckBoxChange = event => {
    const {value, checked} = event.target
    handleChange(value, checked)
  }
  return (
    <>
      <h1>Type of Employment</h1>

      <ul className="employement-typeCon">
        {employmentTypesList.map(eachItem => (
          <li key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              value={eachItem.employmentTypeId}
              id={eachItem.employmentTypeId}
              checked={selectedTypes.includes(eachItem.employmentTypeId)}
              onChange={handleCheckBoxChange}
            />
            <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TypeofEmployment
