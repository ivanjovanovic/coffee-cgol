(function() {
  var cgol, num, root;
  cgol = {};
  cgol.field_size = 20;
  cgol.current_generation = (function() {
    var _ref, _results;
    _results = [];
    for (num = 1, _ref = cgol.field_size; 1 <= _ref ? num <= _ref : num >= _ref; 1 <= _ref ? num++ : num--) {
      _results.push(0);
    }
    return _results;
  })();
  cgol.next_generation = cgol.current_generation.slice(0);
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.cgol = cgol;
}).call(this);
