(function() {
  $(function() {
    var canvas, looping;
    canvas = document.getElementById('canvas');
    looping = false;
    rs.ji.cgol.init(50);
    rs.ji.renderer.canvas.render(canvas, rs.ji.cgol);
    $('#game-control').click(function() {
      if (looping) {
        looping = false;
        return $(this).html('Play');
      } else {
        looping = true;
        return $(this).html('Stop');
      }
    });
    $(canvas).click(function(e) {
      var box_size, x, y;
      box_size = canvas.width / rs.ji.cgol.field_size;
      x = Math.round(e.pageX / box_size) - 1;
      y = Math.round(e.pageY / box_size) - 1;
      rs.ji.cgol.setCell(x, y, 1);
      canvas.width = canvas.width;
      return rs.ji.renderer.canvas.render(canvas, rs.ji.cgol);
    });
    return setInterval(function() {
      if (looping) {
        canvas.width = canvas.width;
        rs.ji.cgol.current_generation = rs.ji.cgol.generate();
        return rs.ji.renderer.canvas.render(canvas, rs.ji.cgol);
      }
    }, 100);
  });
}).call(this);
