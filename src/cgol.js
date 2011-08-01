(function() {
  var root, rs;
  rs = {};
  rs.ji = {};
  rs.ji.cgol = {};
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.rs = rs;
  rs.ji.cgol.init = function(field_size) {
    var num;
    rs.ji.cgol.field_size = field_size;
    return rs.ji.cgol.current_generation = (function() {
      var _ref, _results;
      _results = [];
      for (num = 1, _ref = Math.pow(field_size, 2); 1 <= _ref ? num <= _ref : num >= _ref; 1 <= _ref ? num++ : num--) {
        _results.push(0);
      }
      return _results;
    })();
  };
  rs.ji.cgol.getCell = function(x, y) {
    var cell;
    cell = void 0;
    if (x >= 0 && y >= 0 && x <= rs.ji.cgol.field_size - 1 && y <= rs.ji.cgol.field_size - 1) {
      cell = rs.ji.cgol.current_generation[rs.ji.cgol.get_from_coords(x, y)];
    }
    return cell;
  };
  rs.ji.cgol.setCell = function(x, y, value) {
    return rs.ji.cgol.current_generation[rs.ji.cgol.get_from_coords(x, y)] = value;
  };
  rs.ji.cgol.get_coords = function(index) {
    var x, y;
    if (index < 0) {
      throw new Error('Invalid index');
    }
    if (index > (Math.pow(rs.ji.cgol.field_size, 2) - 1)) {
      throw new Error('Invalid index');
    }
    x = index % rs.ji.cgol.field_size;
    y = (index - x) / rs.ji.cgol.field_size;
    return [x, y];
  };
  rs.ji.cgol.get_from_coords = function(x, y) {
    if (x < 0 || y < 0) {
      throw new Error('Invalid coordinates');
    }
    if (x > rs.ji.cgol.field_size - 1 || y > rs.ji.cgol.field_size - 1) {
      throw new Error('Invalid coordinates');
    }
    return rs.ji.cgol.field_size * y + x;
  };
  rs.ji.cgol.decide_destiny_for = function(x, y) {
    var cell, neighbours, reducer, sum;
    cell = rs.ji.cgol.getCell(x, y);
    neighbours = [rs.ji.cgol.getCell(x + 1, y), rs.ji.cgol.getCell(x + 1, y + 1), rs.ji.cgol.getCell(x, y + 1), rs.ji.cgol.getCell(x - 1, y + 1), rs.ji.cgol.getCell(x - 1, y), rs.ji.cgol.getCell(x - 1, y - 1), rs.ji.cgol.getCell(x, y - 1), rs.ji.cgol.getCell(x + 1, y - 1)];
    reducer = function(sum, val) {
      if (typeof val === 'undefined') {
        val = 0;
      }
      return sum += val;
    };
    sum = neighbours.reduce(reducer, 0);
    if (sum < 2) {
      return 0;
    } else if (sum === 2 && cell === 0) {
      return 0;
    } else if ((sum === 2 || sum === 3) && cell === 1) {
      return 1;
    } else if (sum > 3 && cell === 1) {
      return 0;
    } else if (sum === 3 && cell === 0) {
      return 1;
    } else if (sum > 3 && cell === 0) {
      return 0;
    }
  };
  rs.ji.cgol.generate = function() {
    var cell, i, map, _len, _ref, _results;
    map = function(i, cell) {
      var x, y, _ref;
      _ref = rs.ji.cgol.get_coords(i), x = _ref[0], y = _ref[1];
      return rs.ji.cgol.decide_destiny_for(x, y);
    };
    _ref = rs.ji.cgol.current_generation;
    _results = [];
    for (i = 0, _len = _ref.length; i < _len; i++) {
      cell = _ref[i];
      _results.push(map(i, cell));
    }
    return _results;
  };
}).call(this);
