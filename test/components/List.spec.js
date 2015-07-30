import React from 'react/addons';
import expect from 'expect';
import jsdomReact from './jsdomReact';
const { TestUtils } = React.addons;

describe('React', () => {
  jsdomReact();

  it('should work', () => {
    class Testing {
      render() {
        return (
          <div>hi</div>
        );
      }
    }

    const div = TestUtils.findRenderedDOMComponentWithTag(Testing, 'div');
    expect(div.props.string).toBe('');
  });
});
