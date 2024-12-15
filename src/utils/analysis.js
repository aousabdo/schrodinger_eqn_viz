export const calculateExpectationValue = (points, operator) => {
  const dx = points[1].x - points[0].x;
  return points.reduce((sum, point) => {
    return sum + point.probability * operator(point.x) * dx;
  }, 0);
};

export const calculateUncertainty = (points, operator) => {
  const expectation = calculateExpectationValue(points, operator);
  const expectationSquared = calculateExpectationValue(points, 
    x => Math.pow(operator(x) - expectation, 2));
  return Math.sqrt(expectationSquared);
}; 