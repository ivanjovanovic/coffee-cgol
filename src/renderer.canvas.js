(function() {
  rs.ji.renderer = {};
  rs.ji.renderer.canvas = {};
  rs.ji.renderer.canvas.render = function(canvas, cgol) {
    var box_size, cell, ctx, i, map, _len, _ref, _results;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(200,0,0)";
    box_size = canvas.width / cgol.field_size;
    console.log(cgol);
    map = function(i, cell) {
      var x, y, _ref;
      _ref = rs.ji.cgol.get_coords(i), x = _ref[0], y = _ref[1];
      if (cell === 0) {
        return ctx.strokeRect(x * box_size, y * box_size, box_size, box_size);
      } else if (cell === 1) {
        return ctx.fillRect(x * box_size, y * box_size, box_size, box_size);
      }
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
