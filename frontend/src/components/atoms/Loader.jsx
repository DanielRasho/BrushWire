import Proptypes from 'prop-types'

export default function Loader ({ isLoading }) {
  if (isLoading) return <div className="loader"></div>
  else return null
}

Loader.propTypes = {
  isLoading: Proptypes.bool
}
