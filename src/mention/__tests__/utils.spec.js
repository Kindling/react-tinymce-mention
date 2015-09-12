import containsConsistantType from '../utils/containsConsistantType';
import getKeyCode from '../utils/getKeyCode';
import last from '../utils/last';
import uid from '../utils/uid';
import normalizeDataSource from '../utils/normalizeDataSource';
import diffMentionState from '../utils/diffMentionState';

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

  it('should diff two lists', () => {
    var mentions = ['1', '2'];
    var moreMentions = ['1', '2', '3'];

    expect(diffMentionState([], []))
      .toEqual({mentions: [], changed: []});
    expect(diffMentionState(mentions, moreMentions))
      .toEqual({mentions: moreMentions, changed: []});
    expect(diffMentionState(moreMentions, mentions))
      .toEqual({mentions: mentions, changed: ['3']});
  });
});
