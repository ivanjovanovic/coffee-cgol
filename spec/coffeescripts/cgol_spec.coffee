describe 'cgol', ->

  it 'should be defined on window object', ->
    expect(rs.ji.cgol).toBeDefined()

  it 'should have initial field size', ->
    expect(rs.ji.cgol.field_size).toBeDefined()

  it 'should provide a way to set new cell value by providing coordinates and is it on or off', ->
    expect(rs.ji.cgol.getCell(0,0)).toEqual(0)
    rs.ji.cgol.setCell(0, 0, 1)
    expect(rs.ji.cgol.getCell(0,0)).toEqual(1)

  it 'should be able to initialize game with new size', ->
    rs.ji.cgol.setCell(0, 0, 1)
    rs.ji.cgol.init(3)
    expect(rs.ji.cgol.current_generation.length).toBe(9)
    expect(rs.ji.cgol.next_generation.length).toBe(9)
    sum = rs.ji.cgol.current_generation.reduce( (a, b) -> a + b )
    expect(sum).toEqual(0)
    sum = rs.ji.cgol.next_generation.reduce( (a, b) -> a + b )
    expect(sum).toEqual(0)

  it 'should have current and next generation initialized to array of zeros', ->
    expect(rs.ji.cgol.current_generation.length).toBe(Math.pow(rs.ji.cgol.field_size, 2))
    expect(rs.ji.cgol.next_generation.length).toBe(Math.pow(rs.ji.cgol.field_size, 2))
    sum = rs.ji.cgol.current_generation.reduce( (a, b) -> a + b )
    expect(sum).toEqual(0)
    sum = rs.ji.cgol.next_generation.reduce( (a, b) -> a + b )
    expect(sum).toEqual(0)

  describe 'coordinates calculation', ->

    it 'should calculate coordinates based on array index', ->
      [x, y] = rs.ji.cgol.get_coords(5)
      expect(x).toEqual(2)
      expect(y).toEqual(1)

      [x, y] = rs.ji.cgol.get_coords(0)
      expect(x).toEqual(0)
      expect(y).toEqual(0)

    it 'should throw error for invalid indexes', ->
      thrower1 = ->
        rs.ji.cgol.get_coords(-1)
      thrower2 = ->
        rs.ji.cgol.get_coords(9)

      expect(thrower1).toThrow(new Error('Invalid index'))
      expect(thrower2).toThrow(new Error('Invalid index'))

    it 'should get array index based on coordinates', ->
      index = rs.ji.cgol.get_from_coords 0, 0
      expect(index).toEqual(0)

      index = rs.ji.cgol.get_from_coords 2, 1
      expect(index).toEqual(5)

    it 'should throw error for invalid coordinates', ->
      thrower1 = ->
        rs.ji.cgol.get_from_coords(5, 2)
      thrower2 = ->
        rs.ji.cgol.get_from_coords(1, 5)
      thrower3 = ->
        rs.ji.cgol.get_from_coords(1, -2)
      thrower4 = ->
        rs.ji.cgol.get_from_coords(-1, 2)


      expect(thrower1).toThrow(new Error('Invalid coordinates'))
      expect(thrower2).toThrow(new Error('Invalid coordinates'))
      expect(thrower3).toThrow(new Error('Invalid coordinates'))
      expect(thrower4).toThrow(new Error('Invalid coordinates'))



  describe 'next generation production', ->

    describe 'cell destiny decisions', ->

      beforeEach ->
          rs.ji.cgol.init(3)


      describe 'cell under population', ->

        # Tests are bsaed on the 3x3 matrix
        it 'should die in case that it is surrounded by less than two live neighbours', ->
          # set up the test for this situation
          # 0 0 0
          # 0 1 0
          # 1 0 0
          rs.ji.cgol.setCell(0, 0, 1)
          rs.ji.cgol.setCell(1, 1, 1)
          destiny = rs.ji.cgol.decide_destiny_for(1,1)
          expect(destiny).toEqual(0)
          destiny = rs.ji.cgol.decide_destiny_for(0,0)
          expect(destiny).toEqual(0)

      describe 'cell survival', ->
        it 'should survive if there are two live neighbours around', ->
          # set up the test for this situation for two
          # 0 0 0
          # 0 1 0
          # 1 1 0
          rs.ji.cgol.setCell(0, 0, 1)
          rs.ji.cgol.setCell(0, 1, 1)
          rs.ji.cgol.setCell(1, 1, 1)
          destiny = rs.ji.cgol.decide_destiny_for(1,1)
          expect(destiny).toEqual(1)
          destiny = rs.ji.cgol.decide_destiny_for(0,0)
          expect(destiny).toEqual(1)

        it 'should survive if there are three live neighbours around', ->
          # set up the test for this situation for two
          # 0 0 0
          # 0 1 0
          # 1 1 1
          rs.ji.cgol.setCell(0, 0, 1)
          rs.ji.cgol.setCell(0, 1, 1)
          rs.ji.cgol.setCell(0, 2, 1)
          rs.ji.cgol.setCell(1, 1, 1)
          destiny = rs.ji.cgol.decide_destiny_for(1,1)
          expect(destiny).toEqual(1)
          destiny = rs.ji.cgol.decide_destiny_for(0,0)
          expect(destiny).toEqual(1)

      describe 'cell overcrowding', ->
        it 'should die if there are more than 3 neighbours', ->
          # set up the test for this situation for two
          # 0 0 0
          # 0 1 1
          # 1 1 1
          rs.ji.cgol.setCell(0, 0, 1)
          rs.ji.cgol.setCell(0, 1, 1)
          rs.ji.cgol.setCell(0, 2, 1)
          rs.ji.cgol.setCell(1, 1, 1)
          rs.ji.cgol.setCell(1, 2, 1)
          destiny = rs.ji.cgol.decide_destiny_for(1,1)
          expect(destiny).toEqual(0)

      describe 'cell reproduction', ->
        it 'should be born if dead and has exactly three live neighbours', ->
          # set up the test for this situation for two
          # 0 0 0
          # 0 1 1
          # 1 1 1
          rs.ji.cgol.setCell(0, 0, 1)
          rs.ji.cgol.setCell(0, 1, 1)
          rs.ji.cgol.setCell(0, 2, 1)
          rs.ji.cgol.setCell(1, 1, 1)
          rs.ji.cgol.setCell(1, 2, 1)
          destiny = rs.ji.cgol.decide_destiny_for(1,0)
          expect(destiny).toEqual(1)

    it 'should generate proper next generation', ->
      rs.ji.cgol.init(6)
      # set glider as example
      glider = [
        0, 0, 0, 0, 0, 0
        0, 0, 0, 1, 0, 0
        0, 1, 0, 1, 0, 0
        0, 0, 1, 1, 0, 0
        0, 0, 0, 0, 0, 0
        0, 0, 0, 0, 0, 0
      ]

      rs.ji.cgol.current_generation = glider
      next_generation = rs.ji.cgol.generate()

      next_glider = [
        0, 0, 0, 0, 0, 0
        0, 0, 1, 0, 0, 0
        0, 0, 0, 1, 1, 0
        0, 0, 1, 1, 0, 0
        0, 0, 0, 0, 0, 0
        0, 0, 0, 0, 0, 0
      ]
      expect(next_generation).toEqual(next_glider)


