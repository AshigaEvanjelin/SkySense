function Toast({ message, type = 'success', onClose }) {
  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <p>{message}</p>
      <button type="button" onClick={onClose} aria-label="Dismiss notification" className="toast-close-button">
        ×
      </button>
    </div>
  )
}

export default Toast
