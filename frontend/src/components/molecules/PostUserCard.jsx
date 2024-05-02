import Proptypes from 'prop-types'
import PostTag from '../atoms/PostTag'

export default function PostUserCard ({
  date,
  title,
  tags,
  thumbnail,
  onDelete,
  onEdit,
  onClick
}) {
  const displayTags = tags.map((tag, index) => {
    return <PostTag key={index}>{tag}</PostTag>
  })

  return (
    <article className="post-user-card">
      <div className="image-container">
        <img src={thumbnail} />
      </div>
      <div className="post-user-card-info" onClick={onClick}>
        <div className="info">
          <span>{date}</span>
          <h3>{title}</h3>
          {displayTags}
        </div>
        <div className="buttons">
          <button onClick={onEdit} className="font-btn-confirmation">
            Edit
          </button>
          <button onClick={onDelete} className="font-btn-confirmation">
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

PostUserCard.propTypes = {
  postId: Proptypes.string,
  date: Proptypes.string,
  title: Proptypes.string,
  tags: Proptypes.arrayOf(Proptypes.string),
  thumbnail: Proptypes.string,
  onDelete: Proptypes.func,
  onEdit: Proptypes.func,
  onClick: Proptypes.func
}
