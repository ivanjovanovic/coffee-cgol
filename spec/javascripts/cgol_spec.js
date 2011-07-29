(function() {
  describe('cgol', function() {
    it('should be defined on window object', function() {
      return expect(rs.ji.cgol).toBeDefined();
    });
    it('should have initial field size', function() {
      return expect(rs.ji.cgol.field_size).toBeDefined();
    });
    it('should provide a way to set new cell value by providing coordinates and is it on or off', function() {
      expect(rs.ji.cgol.getCell(0, 0)).toEqual(0);
      rs.ji.cgol.setCell(0, 0, 1);
      return expect(rs.ji.cgol.getCell(0, 0)).toEqual(1);
    });
    it('should be able to initialize game with new size', function() {
      var sum;
      rs.ji.cgol.setCell(0, 0, 1);
      rs.ji.cgol.init(3);
      expect(rs.ji.cgol.current_generation.length).toBe(9);
      expect(rs.ji.cgol.next_generation.length).toBe(9);
      sum = rs.ji.cgol.current_generation.reduce(function(a, b) {
        return a + b;
      });
      expect(sum).toEqual(0);
      sum = rs.ji.cgol.next_generation.reduce(function(a, b) {
        return a + b;
      });
      return expect(sum).toEqual(0);
    });
    it('should have current and next generation initialized to array of zeros', function() {
      var sum;
      expect(rs.ji.cgol.current_generation.length).toBe(Math.pow(rs.ji.cgol.field_size, 2));
      expect(rs.ji.cgol.next_generation.length).toBe(Math.pow(rs.ji.cgol.field_size, 2));
      sum = rs.ji.cgol.current_generation.reduce(function(a, b) {
        return a + b;
      });
      expect(sum).toEqual(0);
      sum = rs.ji.cgol.next_generation.reduce(function(a, b) {
        return a + b;
      });
      return expect(sum).toEqual(0);
    });
    describe('coordinates calculation', function() {
      it('should calculate coordinates based on array index', function() {
        var x, y, _ref, _ref2;
        _ref = rs.ji.cgol.get_coords(5), x = _ref[0], y = _ref[1];
        expect(x).toEqual(2);
        expect(y).toEqual(1);
        _ref2 = rs.ji.cgol.get_coords(0), x = _ref2[0], y = _ref2[1];
        expect(x).toEqual(0);
        return expect(y).toEqual(0);
      });
      it('should throw error for invalid indexes', function() {
        var thrower1, thrower2;
        thrower1 = function() {
          return rs.ji.cgol.get_coords(-1);
        };
        thrower2 = function() {
          return rs.ji.cgol.get_coords(9);
        };
        expect(thrower1).toThrow(new Error('Invalid index'));
        return expect(thrower2).toThrow(new Error('Invalid index'));
      });
      it('should get array index based on coordinates', function() {
        var index;
        index = rs.ji.cgol.get_from_coords(0, 0);
        expect(index).toEqual(0);
        index = rs.ji.cgol.get_from_coords(2, 1);
        return expect(index).toEqual(5);
      });
      return it('should throw error for invalid coordinates', function() {
        var thrower1, thrower2, thrower3, thrower4;
        thrower1 = function() {
          return rs.ji.cgol.get_from_coords(5, 2);
        };
        thrower2 = function() {
          return rs.ji.cgol.get_from_coords(1, 5);
        };
        thrower3 = function() {
          return rs.ji.cgol.get_from_coords(1, -2);
        };
        thrower4 = function() {
          return rs.ji.cgol.get_from_coords(-1, 2);
        };
        expect(thrower1).toThrow(new Error('Invalid coordinates'));
        expect(thrower2).toThrow(new Error('Invalid coordinates'));
        expect(thrower3).toThrow(new Error('Invalid coordinates'));
        return expect(thrower4).toThrow(new Error('Invalid coordinates'));
      });
    });
    return describe('next generation production', function() {
      describe('cell destiny decisions', function() {
        beforeEach(function() {
          return rs.ji.cgol.init(3);
        });
        describe('cell under population', function() {
          return it('should die in case that it is surrounded by less than two live neighbours', function() {
            var destiny;
            rs.ji.cgol.setCell(0, 0, 1);
            rs.ji.cgol.setCell(1, 1, 1);
            destiny = rs.ji.cgol.decide_destiny_for(1, 1);
            expect(destiny).toEqual(0);
            destiny = rs.ji.cgol.decide_destiny_for(0, 0);
            return expect(destiny).toEqual(0);
          });
        });
        describe('cell survival', function() {
          it('should survive if there are two live neighbours around', function() {
            var destiny;
            rs.ji.cgol.setCell(0, 0, 1);
            rs.ji.cgol.setCell(0, 1, 1);
            rs.ji.cgol.setCell(1, 1, 1);
            destiny = rs.ji.cgol.decide_destiny_for(1, 1);
            expect(destiny).toEqual(1);
            destiny = rs.ji.cgol.decide_destiny_for(0, 0);
            return expect(destiny).toEqual(1);
          });
          return it('should survive if there are three live neighbours around', function() {
            var destiny;
            rs.ji.cgol.setCell(0, 0, 1);
            rs.ji.cgol.setCell(0, 1, 1);
            rs.ji.cgol.setCell(0, 2, 1);
            rs.ji.cgol.setCell(1, 1, 1);
            destiny = rs.ji.cgol.decide_destiny_for(1, 1);
            expect(destiny).toEqual(1);
            destiny = rs.ji.cgol.decide_destiny_for(0, 0);
            return expect(destiny).toEqual(1);
          });
        });
        describe('cell overcrowding', function() {
          return it('should die if there are more than 3 neighbours', function() {
            var destiny;
            rs.ji.cgol.setCell(0, 0, 1);
            rs.ji.cgol.setCell(0, 1, 1);
            rs.ji.cgol.setCell(0, 2, 1);
            rs.ji.cgol.setCell(1, 1, 1);
            rs.ji.cgol.setCell(1, 2, 1);
            destiny = rs.ji.cgol.decide_destiny_for(1, 1);
            return expect(destiny).toEqual(0);
          });
        });
        return describe('cell reproduction', function() {
          return it('should be born if dead and has exactly three live neighbours', function() {
            var destiny;
            rs.ji.cgol.setCell(0, 0, 1);
            rs.ji.cgol.setCell(0, 1, 1);
            rs.ji.cgol.setCell(0, 2, 1);
            rs.ji.cgol.setCell(1, 1, 1);
            rs.ji.cgol.setCell(1, 2, 1);
            destiny = rs.ji.cgol.decide_destiny_for(1, 0);
            return expect(destiny).toEqual(1);
          });
        });
      });
      return it('should generate proper next generation', function() {
        var glider, next_generation, next_glider;
        rs.ji.cgol.init(6);
        glider = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        rs.ji.cgol.current_generation = glider;
        next_generation = rs.ji.cgol.generate();
        next_glider = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        return expect(next_generation).toEqual(next_glider);
      });
    });
  });
}).call(this);
