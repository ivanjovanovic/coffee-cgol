(function() {
  var current_generation, field_size, next_generation, num;
  field_size = 20;
  current_generation = (function() {
    var _results;
    _results = [];
    for (num = 1; 1 <= field_size ? num <= field_size : num >= field_size; 1 <= field_size ? num++ : num--) {
      _results.push(0);
    }
    return _results;
  })();
  next_generation = current_generation.slice(0);
}).call(this);
