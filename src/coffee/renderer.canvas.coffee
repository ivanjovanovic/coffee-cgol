rs.ji.renderer = {}
rs.ji.renderer.canvas = {}

rs.ji.renderer.canvas.render = (canvas, cgol) ->
  ctx = canvas.getContext "2d";
  ctx.fillStyle = "rgb(200,0,0)";
  # will scale to full width
  box_size = canvas.width / cgol.field_size
  map = (i, cell) -> 
    [x, y] = rs.ji.cgol.get_coords i
    if cell == 0
      ctx.strokeRect( x*box_size, y*box_size, box_size, box_size )
    else if cell == 1
      ctx.fillRect( x*box_size, y*box_size, box_size, box_size )

  (map i, cell for cell, i in rs.ji.cgol.current_generation)



