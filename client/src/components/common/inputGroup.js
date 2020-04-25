import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const InputGroup = ({
    name,
    placeholder,
    value,
    onChange,
    icon,
    type,
    error
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon}/>
                </span>
            </div>
            <input
                type={type}
                className={classnames("form-control form-control-lg", {
                    "is-invalid": error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    )
}

InputGroup.prototypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    type:PropTypes.string.isRequired
}

InputGroup.defaultProps = {
    type: 'text'
}



export default InputGroup