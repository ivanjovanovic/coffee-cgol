(function() {
  describe('cgol', function() {
    it('should be defined on window object', function() {
      return expect(rs.ji.cgol).toBeDefined();
    });
    it('should have initial field size', function() {
      return expect(rs.ji.cgol.field_size).toBeDefined();
    });
    return it('should have current and next generation initialized to array of zeros', function() {
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
  });
}).call(this);
