define(
  ["rsvp/promise","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Promise = __dependency1__.Promise;

    function all(promises) {
      return new Promise(function(resolve, reject) {
        var results = [], remaining = promises.length;

        if (remaining === 0) {
          resolve([]);
        }

        function resolver(index) {
          return function(value) {
            resolveAll(index, value);
          };
        }

        function resolveAll(index, value) {
          results[index] = value;
          if (--remaining === 0) {
            resolve(results);
          }
        }

        for (var i = 0; i < promises.length; i++) {
          if (promises[i] && typeof promises[i].then === 'function') {
            promises[i].then(resolver(i), reject);
          } else {
            resolveAll(i, promises[i]);
          }
        }
      });
    }


    __exports__.all = all;
  });
