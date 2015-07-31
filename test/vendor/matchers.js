
beforeEach(function() {
  jasmine.addMatchers({
    toBeInstanceOf: function () {
      return {
        compare: function (actual, Expected) {
          return {
            pass: actual instanceof Expected
          };
        }
      };
    },

    toHaveLength: function (util) {
      return {
        compare: function (actual, expected) {
          return {
            pass: util.equals(Object.prototype.toString.call(actual), '[object Array]')
              && util.equals(actual.length, expected)
          }
        }
      };
    }
  });
});
