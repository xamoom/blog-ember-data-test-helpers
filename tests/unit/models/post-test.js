import { moduleForModel, test } from 'ember-qunit';

import { testPlainAttributes } from '../../helpers/model-test-helper';

moduleForModel('post', 'Unit | Model | post', {
  needs: []
});

/** testing plain attributes */
test("should declare all expected (plain) attributes", function(assert){
  const expectedPlainAttributes = [
    {
      name: "title",
      type: "string",
      shouldHaveDefaultValue: false
    },
    {
      name: "body",
      type: "string",
      shouldHaveDefaultValue: false
    }
  ];

  testPlainAttributes(assert, this.store(), "post", expectedPlainAttributes);
});
