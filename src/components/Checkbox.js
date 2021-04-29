import React from 'react'

const Checkbox = ({ name, id, checked, onChange }) => {
  return (
    <div className="custom-checkbox">
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        value={checked}
        onChange={onChange}
      />
      <div className="checkbox-body" />
    </div>
  )
}

export default Checkbox
