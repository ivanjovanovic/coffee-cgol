$(
  ->
    canvas = document.getElementById('canvas')
    looping = false
    rs.ji.cgol.init(50)
    rs.ji.renderer.canvas.render(canvas, rs.ji.cgol)

    # set up game control toggler
    $('#game-control').click(
      ->
        if looping
          looping = false
          $(this).html('Play')
        else
          looping = true
          $(this).html('Stop')
    )

    # set up canvas clicker
    $(canvas).click(
      (e) ->
        box_size = canvas.width / rs.ji.cgol.field_size
        x = Math.round(e.pageX / box_size) - 1
        y = Math.round(e.pageY / box_size) - 1
        rs.ji.cgol.setCell(x, y, 1)
        canvas.width = canvas.width
        rs.ji.renderer.canvas.render(canvas, rs.ji.cgol)
    )

    # rendering loop
    setInterval(
      -> 
        if looping
          canvas.width = canvas.width
          rs.ji.cgol.current_generation = rs.ji.cgol.generate()
          rs.ji.renderer.canvas.render(canvas, rs.ji.cgol)
      , 100
    )
)
