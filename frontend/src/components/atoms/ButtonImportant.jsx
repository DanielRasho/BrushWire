import Proptypes from 'prop-types'

export default function ButtonImportant ({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn-important font-btn">
      {children}
    </button>
  )
}

ButtonImportant.propTypes = {
  children: Proptypes.any,
  onClick: Proptypes.func
}
