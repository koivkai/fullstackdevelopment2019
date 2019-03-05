import React from 'react';

const Notification = (props) => {
  const store = props.store
  const message = store.getState().notification === '' ? null : store.getState().notification
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

export default Notification
