/**
 * Definition of a Post object
 */
class Post {
  /**
   *
   * @param {string} author
   * @param {Array.<string>} tags
   * @param {string} publishdate
   * @param {string} thumbnailpath server file path to post's thumbnail
   * @param {string} contentpath server file path to post's content
   */
  constructor(id, author, title, tags, publishdate, thumbnail, content) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.tags = tags;
    this.publishdate = publishdate;
    this.thumbnail = thumbnail;
    this.content = content;
  }
}

module.exports = Post;
