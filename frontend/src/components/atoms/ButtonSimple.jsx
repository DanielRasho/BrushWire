import Proptypes from "prop-types";

export default function ButtonSimple({ children, style, onClick }) {
  return (
    <button onClick={onClick} style={style} className="btn-simple font-btn">
      {children}
    </button>
  );
}

ButtonSimple.propTypes = {
  children: Proptypes.any,
  style: Proptypes.object,
  onClick: Proptypes.func,
};
