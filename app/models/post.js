import DS from 'ember-data';

export default DS.Model.extend({

  /**
   * {String} title of the post.
   */
  title: DS.attr("string"),

  /**
   * {String} body of the post.
   */
  body: DS.attr("string")
});
