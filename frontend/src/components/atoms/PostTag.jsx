import Proptypes from "prop-types";

export default function PostTag({ children }) {
  return <span className="tag font-card-tag">{children}</span>;
}

PostTag.propTypes = {
  children: Proptypes.any,
};
