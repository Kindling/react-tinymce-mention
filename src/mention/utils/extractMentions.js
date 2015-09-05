import twitter from 'twitter-text';

export default function extractMentions(content, delimiter) {
  var mentions;
  var prop;

  if (delimiter === '@') {
    mentions = twitter.extractMentionsWithIndices(content);
    prop = 'screenName';
  } else if (delimiter === '#') {
    mentions = twitter.extractHashtagsWithIndices(content);
    prop = 'hashtag';
  } else {
    throw new Error(`Error extracting mentions: ${delimiter} must be either '@' or '#'`);
  }

  return { mentions, prop };
}
