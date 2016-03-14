import { moduleForModel, test } from 'ember-qunit';

import { testPlainAttributes } from '../../helpers/model-test-helper';

moduleForModel('author', 'Unit | Model | author', {
  needs: []
});

/** testing plain attributes */
test("should declare all expected (plain) attributes", function(assert){
  const expectedPlainAttributes = [
    {
      name: "nick",
      type: "string",
      shouldHaveDefaultValue: false
    }
  ];

  testPlainAttributes(assert, this.store(), "author", expectedPlainAttributes);
});
