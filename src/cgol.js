(function() {
  var root, rs;
  rs = {};
  rs.ji = {};
  rs.ji.cgol = {};
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.rs = rs;
  rs.ji.cgol.getCell = function(x, y) {
    return rs.ji.cgol.current_generation[rs.ji.cgol.field_size * y + x];
  };
  rs.ji.cgol.setCell = function(x, y, value) {
    return rs.ji.cgol.current_generation[rs.ji.cgol.field_size * y + x] = value;
  };
  rs.ji.cgol.init = function(field_size) {
    var num;
    rs.ji.cgol.field_size = field_size;
    rs.ji.cgol.current_generation = (function() {
      var _ref, _results;
      _results = [];
      for (num = 1, _ref = Math.pow(field_size, 2); 1 <= _ref ? num <= _ref : num >= _ref; 1 <= _ref ? num++ : num--) {
        _results.push(0);
      }
      return _results;
    })();
    return rs.ji.cgol.next_generation = rs.ji.cgol.current_generation.slice(0);
  };
  rs.ji.cgol.init(20);
}).call(this);
