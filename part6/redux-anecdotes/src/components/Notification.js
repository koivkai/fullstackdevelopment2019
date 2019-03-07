import React from 'react';
import { connect } from 'react-redux'

const Notification = (props) => {
  const message = props.notification === '' ? null : props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (message) {
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {notification: state.notification}
}

export default connect(mapStateToProps)(Notification)
