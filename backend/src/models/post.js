/**
 * Definition of a Post object
 */
class Post {
  /**
   *
   * @param {string} author
   * @param {Array.<string>} tags
   * @param {string} publishDate
   * @param {string} thumbnailPath server file path to post's thumbnail
   * @param {string} contentPath server file path to post's content
   */
  constructor(id, author, title, tags, publishDate, thumbnail, content) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.tags = tags;
    this.publishDate = publishDate;
    this.thumbnail = thumbnail;
    this.content = content;
  }
}

module.exports = Post;
