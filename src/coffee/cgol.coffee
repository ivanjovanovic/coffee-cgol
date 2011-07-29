rs = {}
rs.ji = {}
rs.ji.cgol = {}

# export cgol to window object
root = exports ? this
root.rs = rs

rs.ji.cgol.getCell = (x, y) ->
  cell = undefined
  if x >= 0 && y >= 0 && x <= rs.ji.cgol.field_size - 1 && y <= rs.ji.cgol.field_size - 1
    cell = rs.ji.cgol.current_generation[rs.ji.cgol.get_from_coords x, y]
  cell

rs.ji.cgol.setCell = (x, y, value) ->
  rs.ji.cgol.current_generation[rs.ji.cgol.get_from_coords x, y] = value

rs.ji.cgol.get_coords = (index) ->
  throw new Error('Invalid index') if index < 0
  throw new Error('Invalid index') if index > (Math.pow(rs.ji.cgol.field_size, 2) - 1)
  x = index % rs.ji.cgol.field_size
  y = (index - x) / rs.ji.cgol.field_size
  [x, y]

rs.ji.cgol.get_from_coords = (x, y) ->
  throw new Error('Invalid coordinates') if x < 0 || y < 0
  throw new Error('Invalid coordinates') if x > rs.ji.cgol.field_size - 1 || y > rs.ji.cgol.field_size - 1
  rs.ji.cgol.field_size*y + x

rs.ji.cgol.decide_destiny_for = (x, y) ->
  cell = rs.ji.cgol.getCell(x, y)
  neighbours = [
    rs.ji.cgol.getCell(x+1, y), rs.ji.cgol.getCell(x+1, y+1),
    rs.ji.cgol.getCell(x, y+1), rs.ji.cgol.getCell(x-1, y+1),
    rs.ji.cgol.getCell(x-1, y), rs.ji.cgol.getCell(x-1, y-1),
    rs.ji.cgol.getCell(x, y-1), rs.ji.cgol.getCell(x+1, y-1)
  ]

  reducer = (sum, val) ->
    val = 0 if typeof val == 'undefined'
    sum += val

  sum = neighbours.reduce(reducer, 0)

  if sum < 2
    0
  else if sum == 2 && cell == 0
    0
  else if (sum == 2 || sum == 3) && cell == 1
    1
  else if sum > 3 && cell == 1
    0
  else if sum == 3 && cell == 0
    1
  else if sum > 3 && cell == 0
    0

rs.ji.cgol.generate = ->
  map = (i, cell) -> 
    [x, y] = rs.ji.cgol.get_coords i
    rs.ji.cgol.decide_destiny_for x, y

  (map i, cell for cell, i in rs.ji.cgol.current_generation)

rs.ji.cgol.init = (field_size) ->
  rs.ji.cgol.field_size = field_size
  rs.ji.cgol.current_generation = (0 for num in [1..Math.pow(field_size, 2)])
  rs.ji.cgol.next_generation = rs.ji.cgol.current_generation.slice 0

rs.ji.cgol.init(20)
