rs = {}
rs.ji = {}
rs.ji.cgol = {}

# export cgol to window object
root = exports ? this
root.rs = rs

rs.ji.cgol.getCell = (x, y) ->
  rs.ji.cgol.current_generation[rs.ji.cgol.field_size*y + x]

rs.ji.cgol.setCell = (x, y, value) ->
  rs.ji.cgol.current_generation[rs.ji.cgol.field_size*y + x] = value

# initialization of basic data structures
rs.ji.cgol.field_size = 20
rs.ji.cgol.current_generation = (0 for num in [1..Math.pow(rs.ji.cgol.field_size, 2)])
rs.ji.cgol.next_generation = rs.ji.cgol.current_generation.slice 0

