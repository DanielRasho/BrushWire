/**
 * Representation of the metadata of a post without its actual content.
 */
class PostDetails {
  /**
   *
   * @param {string} author
   * @param {Array.<string>} tags
   * @param {string} publishDate
   * @param {string} thumbnail_path server file path to post's thumbnail
   */
  constructor(id, title, author, tags, publishdate, thumbnailpath) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.tags = tags;
    this.publishdate = publishdate;
    this.thumbnailpath = thumbnailpath;
  }
}

module.exports = PostDetails;
