export const calculatePotential = (x, type, params = {}) => {
  switch (type) {
    case 'harmonic':
      return 0.5 * (x - 0.5) * (x - 0.5) * 100; // k = 100 for visualization

    case 'infinite-well':
      return (x <= 0 || x >= 1) ? Infinity : 0;

    case 'finite-well': {
      const V0 = params.V0 || 10;
      return (x <= 0.2 || x >= 0.8) ? V0 : 0;
    }

    case 'double-well': {
      const V0 = params.V0 || 10;
      return (x > 0.3 && x < 0.4) || (x > 0.6 && x < 0.7) ? 0 : V0;
    }

    case 'stepped-well': {
      const V1 = params.V1 || 5;
      const V2 = params.V2 || 10;
      if (x <= 0.2 || x >= 0.8) return V2;
      if (x <= 0.3 || x >= 0.7) return V1;
      return 0;
    }

    default:
      return 0;
  }
};

export const calculateWaveFunction = (x, n, potentialType, params = {}) => {
  // Note: This is a simplified calculation for visualization
  // Real solutions would require numerical methods
  switch (potentialType) {
    case 'harmonic':
      // Hermite polynomials approximation
      const hermite = getHermitePolynomial(n - 1);
      const alpha = 20; // frequency parameter
      return hermite((x - 0.5) * Math.sqrt(alpha)) * 
             Math.exp(-alpha * (x - 0.5) * (x - 0.5) / 2) / 
             Math.sqrt(Math.pow(2, n - 1) * factorial(n - 1));

    case 'infinite-well':
      return Math.sqrt(2) * Math.sin(n * Math.PI * x);

    default:
      // Default to infinite well solutions for other potentials
      // In reality, these would need numerical solutions
      return Math.sqrt(2) * Math.sin(n * Math.PI * x);
  }
};

// Helper functions for Hermite polynomials
function getHermitePolynomial(n) {
  return (x) => {
    if (n === 0) return 1;
    if (n === 1) return 2 * x;
    if (n === 2) return 4 * x * x - 2;
    if (n === 3) return 8 * x * x * x - 12 * x;
    if (n === 4) return 16 * x * x * x * x - 48 * x * x + 12;
    return Math.sin(n * Math.PI * x); // Fallback for higher n
  };
}

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
