cgol = {}

cgol.field_size = 20
cgol.current_generation = (0 for num in [1..cgol.field_size])
cgol.next_generation = cgol.current_generation.slice 0

# export cgol to window object
root = exports ? this
root.cgol = cgol
