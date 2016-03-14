import DS from 'ember-data';

export default DS.Model.extend({

  /**
   * {String} nick of the author.
   */
  nick: DS.attr("string")
});
