import difference from 'lodash.difference';

export default function diffMentionState(mentions, nextMentions) {
  const diff = difference(mentions, nextMentions);

  return {
    mentions: nextMentions,
    changed: diff
  };
}
