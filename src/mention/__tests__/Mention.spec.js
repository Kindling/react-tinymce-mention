import React, { addons } from 'react/addons';
import Mention from '../Mention';
import jasmineHelpers from './helpers/jasmineHelpers';

const shallowRenderer = addons.TestUtils.createRenderer();

describe('<Mention />', () => {

  beforeEach(() => {
    jasmineHelpers();
  });

  it('should transform response if transformFn is provided', () => {
    const fn = Mention.prototype._transformResponse;
    const data = ['a', 'b', 'c'];
    const formatted = data.map(d => ({ displayLabel: d, searchKey: d }));
    const wrap = (data) => ({ dataSource: data });
    const toUpperCase = (data) => {
      return data.map(d => {
        return {
          displayLabel: d.displayLabel.toUpperCase(),
          searchKey: d.searchKey.toUpperCase()
        };
      });
    };

    expect(fn(formatted)).toDeepEqual(wrap(formatted));
    expect(fn(formatted, toUpperCase)).toDeepEqual(wrap(toUpperCase(formatted)));
  });
});
