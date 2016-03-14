# Ember-data test-helpers showcase

Problably the simplest library that helps ember-data beginners test their models.  

## Prerequisites

This repo is an ember-cli -generated boilerplate app enriched by ember-data test-helpers.

No further dependencies are necessary, all you need to have comes along your the ember-cli.

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

### Running Tests

* `ember test`
* `ember test --server`

## Importing test-helpers
Make sure test-helpers are present in `your-app/tests/helpers`. Import them into the tests you use to test your (ember-data) models, for example:

    // tests/unit/models/your-test.js
    import Ember from 'ember'; // this is used by test-helpers, do not forget to include it, too ;)
    // import a test-helper you need
    import { testPlainAttributes, testRelationships } from '../../helpers/model-test-helper';
    //...

## Applying helpers

An example of how to apply the testPlainAttributes and testRelationships helper to the model that looks like

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
    });

would be as follows:

    import { moduleForModel, test } from 'ember-qunit';
    
    import { testPlainAttributes, testRelationships } from '../../helpers/model-test-helper';
    
    moduleForModel('comment', 'Unit | Model | comment', {
      needs: []
    });
    
    /** testing plain attributes */
    test("should declare all expected (plain) attributes", function(assert){
      const expectedPlainAttributes = [
        {
          name: "message",
          type: "string",
          shouldHaveDefaultValue: false
        },
        {
          name: "isVulgar",
          type: "boolean",
          shouldHaveDefaultValue: true
        }
      ];
    
      testPlainAttributes(assert, this.store(), "comment", expectedPlainAttributes);
    });
    
    /** testing attributes that represent relationships */
    test("should declare all expected relationships", function(assert){
      const expectedRelationshipsList = [
        {
          key: "author",            // key
          kind: "belongsTo",        // kind
          type: "author",           // type
          options: { async: true }
        },
        {
          key: "post",              // name of the property (comment model class member)
          kind: "belongsTo",        // kind
          type: "blogPost",         // model the relationship refers to (has to stay "post")
          options: { async: true }
        }
      ];
    
      testRelationships(assert, this.store(), "comment", expectedRelationshipsList);
    });

Navigate to the blog post for a detailed, step-by-step tutorial on how to apply test-helpers: [How to apply xamoom ember-data test-helpers using TDD](https://xamoom.com/en/2016/03/2-simple-test-helpers-every-Ember-Data-developer-should-know/)(published on 15th March, 2016)
