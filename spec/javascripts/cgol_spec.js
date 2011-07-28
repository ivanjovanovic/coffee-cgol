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
    describe('next generation production', function() {});
    describe('under population', function() {});
    describe('survival', function() {});
    describe('overcrowding', function() {});
    return describe('reproduction', function() {});
  });
}).call(this);
