rs = {}
rs.ji = {}
rs.ji.cgol = {}

# export cgol to window object
root = exports ? this
root.rs = rs


rs.ji.cgol.field_size = 20
rs.ji.cgol.current_generation = (0 for num in [1..Math.pow(rs.ji.cgol.field_size, 2)])
rs.ji.cgol.next_generation = rs.ji.cgol.current_generation.slice 0
