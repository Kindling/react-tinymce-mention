import isEqual from 'lodash.isequal';

export default function jasmineHelpers() {
  jasmine.addMatchers({
    toDeepEqual: () => {
      return {
        compare: function(actual, expected) {
          return {
            pass: isEqual(actual, expected)
          };
        }
      };
    }
  });
}
