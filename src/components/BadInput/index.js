// @flow
import React from 'react';
import PropTypes from 'prop-types';

// type Props = {
//   input: Object,
//   label?: string,
//   type?: string,
//   placeholder?: string,
//   style?: Object,
//   meta: Object,
// }

const BadInput = ({ input, label, type, placeholder, style, meta }) => (
  <div style={{ marginBottom: '1rem' }}>
    {label && <label htmlFor={input.name}>{label}</label>}
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="form-control"
      style={style && style}
    />
    {meta.touched && meta.error &&
      <div style={{ fontSize: '85%', color: 'rgb(255,59,48)' }}>{meta.error}</div>
    }
  </div>
);

BadInput.propTypes = {
  input: PropTypes.shape({
    text: PropTypes.string,
  }),
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default BadInput;
