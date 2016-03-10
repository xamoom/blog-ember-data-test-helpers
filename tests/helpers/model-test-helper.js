import Ember from 'ember';

/**
 * Test helper.
 * Retrieves a model definition from the store, its attributes' definitions,
 * and compares them to the definitions expected (expectedAttributesList).
 * @param {Object} assert object to call actual test asserts on.
 * @param {Object} store object to retrieve the model definition from.
 * @param {String} modelName name of the model to test.
 * @param {[{name, type, shouldHaveDefaultValue}]} expectedAttributesList list of definitions to test against.
 */
export function testPlainAttributes(assert, store, modelName, expectedAttributesList) {
  assert.expect(expectedAttributesList.length * 2 + Ember.A(expectedAttributesList).filterBy("shouldHaveDefaultValue", true).length);

  let attribute;
  const modelAttributes = Ember.get(store.modelFor(modelName), 'attributes');

  if(modelAttributes.size < 1){
    assert.ok(false, "Model '" + modelName + "' has no (plain) attributes!");
    return;
  }

  expectedAttributesList.forEach(function (expectedAttribute) {
    const expectedAttributeName = expectedAttribute.name;
    const expectedAttributeType = expectedAttribute.type;
    const shouldHaveDefaultValue = expectedAttribute.shouldHaveDefaultValue;

    attribute = modelAttributes.get(expectedAttributeName);

    if(Ember.isNone(attribute)){
      assert.ok(false, "Model " + modelName + " has no attribute called: " + expectedAttributeName);
      return ;
    }

    assert.equal(attribute.name, expectedAttributeName, "declares attribute: " + expectedAttributeName);
    assert.equal(attribute.type, expectedAttributeType, "type of the attribute " + expectedAttributeName + " is: " + expectedAttributeType);

    if(shouldHaveDefaultValue){
      assert.ok(Ember.isPresent(Ember.get(attribute, "options.defaultValue")),"default value of the attribute '" + expectedAttributeName + "' is defined");
    }
  });
}

/**
 * Test helper.
 * Retrieves a model definition from the store, its relationships' definitions,
 * and compares them to the definitions expected (expectedRelationshipsList).
 * @param {Object} assert object to call actual test asserts on.
 * @param {Object} store object to retrieve the model definition from.
 * @param {String} modelName name of the model to test.
 * @param {[{key, kind, type}]} expectedRelationshipsList list of definitions to test against.
 */
export function testRelationships(assert, store, modelName, expectedRelationshipsList) {
  assert.expect(expectedRelationshipsList.length * 3 + Ember.A(expectedRelationshipsList).filter(function(rel){ return Ember.isPresent(rel.options);}).length); // 2 asserts per a relationship definition + 1 per each def. where we expect 'options' object

  let relationship;

  const modelRelationships = Ember.get(store.modelFor(modelName), 'relationshipsByName');

  if(modelRelationships.size < 1){
    assert.ok(false, "Model '" + modelName + "' has no relationships!");
    return;
  }

  expectedRelationshipsList.forEach(function (expectedRelationshipDefinition) {
    const expectedRelationshipModel         = expectedRelationshipDefinition.key;
    const expectedRelationshipKind          = expectedRelationshipDefinition.kind;
    const expectedRelationshipType          = Ember.String.dasherize(expectedRelationshipDefinition.type);
    const expectedOptionsObject             = expectedRelationshipDefinition.options;


    relationship = modelRelationships.get(expectedRelationshipModel);

    if(Ember.isNone(relationship)){
      assert.ok(false, "Model " + modelName + " has no relationship called: " + expectedRelationshipModel);
      return ;
    }

    assert.equal(relationship.key, expectedRelationshipModel, 'declares relationship via property: ' + expectedRelationshipModel);
    assert.equal(relationship.kind, expectedRelationshipKind, 'kind of relationship is: ' + expectedRelationshipKind);
    assert.equal(relationship.type, expectedRelationshipType, 'model being related to is: ' + expectedRelationshipDefinition.type + " (as " + expectedRelationshipType + ")");

    if(Ember.isPresent(expectedOptionsObject)){
      assert.deepEqual(relationship.options, expectedOptionsObject, 'options attribute is correct');
    }
  });
}
