import containsConsistantType from '../containsConsistantType';
import getKeyCode from '../getKeyCode';
import last from '../last';
import uid from '../uid';
import normalizeDataSource from '../normalizeDataSource';

describe('Utils', () => {
  it('should ensure that each array item contains a specific type', () => {
    expect(containsConsistantType(['string1', 'string2'], 'string')).toEqual(true);
    expect(containsConsistantType(['string1', 2], 'string')).toEqual(false);
  });

  it('should return the correct keyCode', () => {
    expect(getKeyCode({keyCode: 70})).toEqual(70);
    expect(getKeyCode({which: 70})).toEqual(70);
  });

  it('should return the last item in the array', () => {
    expect(last([1,2,3])).toEqual(3);
    expect(last([1])).toEqual(1);
    expect(last([])).toEqual(undefined);
  });

  it('should return a unique id', () => {
    expect(uid()).not.toEqual(uid());
  });

  it('should validate the dataSource', () => {
    var dataSourceObjects = [{searchKey: 'key1', displayLabel: 'key1'},{searchKey: 'key2', displayLabel: 'key2'}];
    var dataSourceStrings = ['key1','key2'];

    expect(normalizeDataSource(dataSourceObjects)).toEqual({dataSource: dataSourceObjects});
    expect(normalizeDataSource(dataSourceStrings)).toEqual({dataSource: dataSourceObjects});
  });
});
