import Proptypes from "prop-types";

export default function ErrorLoading({ isError, message }) {
  if (isError)
    return (
      <div className="error-loading">
        <i className="fa-regular fa-face-sad-cry"></i>
        <span>{message}</span>
      </div>
    );
  else return null;
}

ErrorLoading.propTypes = {
  isError: Proptypes.bool,
  message: Proptypes.string,
};
