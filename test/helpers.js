import React from 'react';
import {describe, it} from 'mocha';
import {assert} from 'chai';

/**
 * Asserts that two React Elements are almost the same. Checks only the display name and display names of
 * children. Does NOT assert propTypes, styles, etc. Does NOT assert the deepest child, if it is not
 * a React Element, e.g normal text
 * @param actual Actual
 * @param expected Expected
 */
export function assertReactElements(actual, expected) {
  if (!actual && !expected) {
    return;
  }
  assert.equal(actual.type.displayName, expected.type.displayName, 'display name');

  const actualProps = Object.keys(actual.props).filter(d => d !== 'children' && d !== 'style' && d !== 'className');
  const expectedProps = Object.keys(expected.props).filter(d => d !== 'children' && d !== 'style' && d !== 'className');

  assert.deepEqual(actualProps, expectedProps);

  for (let i = 0; i < actualProps.length; i++) {
    assert.deepEqual(
      actual.props[actualProps[i]],
      expected.props[expectedProps[i]],
      `Prop ${actualProps[i]}`
    );
  }

  /* eslint-disable */
  const actualChildren = Array.isArray(actual.props.children)
    ? actual.props.children
    : typeof actual.props.children === 'object'
    ? [actual.props.children]
    : [];

  const expectedChildren = Array.isArray(expected.props.children)
    ? expected.props.children
    : typeof expected.props.children === 'object'
    ? [expected.props.children]
    : [];
  /* eslint-enable */

  assert.equal(actualChildren.length, expectedChildren.length,
    `Children length:
    actual: ${JSON.stringify(actualChildren, null, 4)}
    
    expected: ${JSON.stringify(expectedChildren, null, 4)}`);

  for (let i = 0; i < actualChildren.length; i++) {
    assertReactElements(actualChildren[i], expectedChildren[i]);
  }
}

describe('Test helpers', () => {
  it('assertReactElements', () => {
    /* eslint-disable */
    let el0 = (
      <div>
        <div someProp={true}>{null}</div>
        <div anotherProp={2}>{}</div>
        <div test={'test'}>{undefined}</div>
      </div>
    );
    /* eslint-enable */

    assert.doesNotThrow(() => {
      assertReactElements(el0, el0);
    });

    el0 = (
      <div>
        <div>
          <div loading={true}>
            Text
          </div>
        </div>
        <div>
          Text
        </div>
      </div>
    );

    assert.doesNotThrow(() => {
      assertReactElements(el0, el0);
    });

    let el1 = (
      <div>
        <div>
          <div loading={true}>
            Text
          </div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    );

    assert.throws(() => {
      assertReactElements(el0, el1);
    });

    el0 = (
      <div>
        <span loading={false}>oig3rngorng</span>
      </div>
    );
    el1 = (
      <div>
        <span loading={true}>ergernenfdfpwef</span>
      </div>
    );

    assert.throws(() => {
      assertReactElements(el0, el1);
    });

    el1 = (
      <div>
        <span loading={false}>ergernenfdfpwef</span>
      </div>
    );

    assert.doesNotThrow(() => {
      assertReactElements(el0, el1);
    });

    el0 = (
      <div className="some-class">
        <div style={{overflow: 'hidden'}}></div>
      </div>
    );

    el1 = (
      <div className="other-class">
        <div style={{overflow: 'initial'}}></div>
      </div>
    );

    assert.doesNotThrow(() => {
      assertReactElements(el0, el1);
    });
  });
});
