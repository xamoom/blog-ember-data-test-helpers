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
      key: "author",        // key
      kind: "belongsTo",    // kind
      type: "author",       // type
      options: { async: true }
    },
    {
      key: "post",        // name of the property (comment model class member)
      kind: "belongsTo",      // kind
      type: "blogPost",           // model the relationship refers to (has to stay "post")
      options: { async: true }
    }
  ];

  testRelationships(assert, this.store(), "comment", expectedRelationshipsList);
});
