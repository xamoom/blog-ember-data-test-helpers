import DS from 'ember-data';

export default DS.Model.extend({
  /**
   * {String} comment message - text of the comment.
   */
  message: DS.attr("string"),

  /**
   * {String} flag indicating the comment contains a vulgar content.
   * False by default.
   */
  isVulgar: DS.attr("boolean", {defaultValue: false}),

  /**
   * Relationship to the model: author.
   * A comment is written by an author.
   * comment -> 1 author
   */
  author: DS.belongsTo("author", { async: true }),

  /**
   * Relationship to the model: post.
   * A comment is written to react on a blog post.
   * comment -> 1 post
   */
  post: DS.belongsTo("blogPost", { async: true })
});
