import Mention from '../../Mention';
import jasmineHelpers from '../helpers/jasmineHelpers';
import formatDataSource from '../helpers/formatDataSource';

describe('<Mention />', () => {

  beforeEach(() => {
    jasmineHelpers();
  });

  it('should transform response if transformFn is provided', () => {
    const transform = Mention.prototype._transformResponse;
    const { formatted, wrap } = formatDataSource(['a', 'b', 'c']);
    const toUpperCase = (data) => {
      return data.map(d => {
        return {
          displayLabel: d.displayLabel.toUpperCase(),
          searchKey: d.searchKey.toUpperCase()
        };
      });
    };

    expect(transform(formatted)).toDeepEqual(wrap(formatted));
    expect(transform(formatted, toUpperCase)).toDeepEqual(wrap(toUpperCase(formatted)));
  });
});
