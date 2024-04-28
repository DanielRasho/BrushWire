/**
 * Representation of the metadata of a post without its actual content.
 */
class PostDetails {
  /**
   *
   * @param {string} author
   * @param {Array.<string>} tags
   * @param {string} publish_date
   * @param {string} thumbnail_path server file path to post's thumbnail
   */
  constructor(id, title, author, tags, publishDate, thumbnailPath) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.tags = tags;
    this.publishDate = publishDate;
    this.thumbnailPath = thumbnailPath;
  }
}

module.exports = PostDetails;
