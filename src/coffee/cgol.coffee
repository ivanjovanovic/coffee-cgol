# ### Model implementation for the Conway's Game of Life logic
#
# It contains logic of the game with sevral methods to influence current state of the game
# like setting new cells to life or death or produce new generation as well to 
# initialize game with ceratain grid size.
#
# Grid is represented with one-dimensional array of length Width x Height. There are methods
# to calculate from array index to grid coordinate and back.

# Put model in safely namespaced object
rs = {}
rs.ji = {}
rs.ji.cgol = {}

# Since CoffeeScript wrap everything in the closures
# we export cgol to window object
root = exports ? this
root.rs = rs

# Initializaton of the game with field size
rs.ji.cgol.init = (field_size) ->
  rs.ji.cgol.field_size = field_size
  rs.ji.cgol.current_generation = (0 for num in [1..Math.pow(field_size, 2)])

# gets current state of the cell on given coordinate pair (x, y)
rs.ji.cgol.getCell = (x, y) ->
  cell = undefined
  if x >= 0 && y >= 0 && x <= rs.ji.cgol.field_size - 1 && y <= rs.ji.cgol.field_size - 1
    cell = rs.ji.cgol.current_generation[rs.ji.cgol.get_from_coords x, y]
  cell

# sets value for the cell on given coordinate pair (x, y)
rs.ji.cgol.setCell = (x, y, value) ->
  rs.ji.cgol.current_generation[rs.ji.cgol.get_from_coords x, y] = value

# gets coordinate pair for given array index
rs.ji.cgol.get_coords = (index) ->
  throw new Error('Invalid index') if index < 0
  throw new Error('Invalid index') if index > (Math.pow(rs.ji.cgol.field_size, 2) - 1)
  x = index % rs.ji.cgol.field_size
  y = (index - x) / rs.ji.cgol.field_size
  [x, y]

# gets array index from given coordinate pair
rs.ji.cgol.get_from_coords = (x, y) ->
  throw new Error('Invalid coordinates') if x < 0 || y < 0
  throw new Error('Invalid coordinates') if x > rs.ji.cgol.field_size - 1 || y > rs.ji.cgol.field_size - 1
  rs.ji.cgol.field_size*y + x

# Decides destiny for the cell in the next generation according
# to state of its neighbours in current generation
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

  # the one and only true logic of this game (4 rules of the game)
  # see on Wikipedia
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

# generates new generation by mapping a function which decides 
# destiny of the cells to the array
rs.ji.cgol.generate = ->
  map = (i, cell) -> 
    [x, y] = rs.ji.cgol.get_coords i
    rs.ji.cgol.decide_destiny_for x, y

  (map i, cell for cell, i in rs.ji.cgol.current_generation)
