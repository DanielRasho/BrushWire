import Proptypes from "prop-types";
import PostTag from "../atoms/PostTag";

export default function PostCard({
  postId,
  date,
  title,
  tags = [],
  thumbnail,
  onClick,
}) {
  let displayTags = tags.map((tag) => {
    return <PostTag key={postId}>{tag}</PostTag>;
  });
  return (
    <article className="post-card" onClick={onClick}>
      <div className="post-card-info">
        <span className="date font-card-tag">{date}</span>
        <h3 className="font-card-title">{title}</h3>
        {displayTags}
      </div>
      <div className="image-container">
        <img src={thumbnail} />
      </div>
    </article>
  );
}

PostCard.propTypes = {
  postId: Proptypes.number,
  date: Proptypes.string,
  title: Proptypes.string,
  tags: Proptypes.arrayOf(Proptypes.string),
  thumbnail: Proptypes.string,
  onClick: Proptypes.func,
};
