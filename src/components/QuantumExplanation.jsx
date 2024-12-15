import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(13, 28, 51, 0.5)',
  color: '#e6f1ff',
  marginBottom: theme.spacing(3),
}));

const EquationBox = styled(Box)({
  fontFamily: 'math',
  fontSize: '1.2em',
  padding: '16px',
  textAlign: 'center',
  background: 'rgba(0, 176, 255, 0.1)',
  borderRadius: '4px',
  margin: '16px 0',
});

export default function QuantumExplanation({ quantumNumber, potentialType }) {
  const getPotentialDescription = () => {
    switch (potentialType) {
      case 'harmonic':
        return {
          name: 'Simple Harmonic Oscillator',
          equation: 'V(x) = ½kx²',
          description: 'A particle experiencing a restoring force proportional to its displacement. This models systems like a mass on a spring at the quantum level.'
        };
      case 'infinite-well':
        return {
          name: 'Infinite Square Well',
          equation: 'V(x) = 0 inside, ∞ outside',
          description: 'A particle confined to a region with infinitely high potential walls. This is the simplest model of a confined quantum system.'
        };
      case 'finite-well':
        return {
          name: 'Finite Square Well',
          equation: 'V(x) = -V₀ inside, 0 outside',
          description: 'Similar to the infinite well, but with finite potential barriers. This allows for quantum tunneling effects.'
        };
      case 'double-well':
        return {
          name: 'Double Square Well',
          equation: 'V(x) = -V₀ in wells, V₁ between, 0 outside',
          description: 'Two coupled potential wells, demonstrating quantum tunneling and energy level splitting.'
        };
      case 'stepped-well':
        return {
          name: 'Stepped Square Well',
          equation: 'V(x) = V₁, V₂, ... (stepped potential)',
          description: 'A multi-level potential well showing how energy states adapt to complex potential landscapes.'
        };
      default:
        return {
          name: 'Unknown Potential',
          equation: '',
          description: ''
        };
    }
  };

  const potential = getPotentialDescription();

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h6" gutterBottom sx={{ color: '#00b0ff' }}>
        Quantum State Analysis
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#1de9b6' }}>
        {potential.name}
      </Typography>

      <EquationBox>
        {potential.equation}
      </EquationBox>

      <Typography paragraph>
        {potential.description}
      </Typography>

      <Typography paragraph>
        The wave function (ψ) shown in blue represents the quantum state with quantum number n = {quantumNumber}. 
        The probability density (|ψ|²) in green shows where the particle is most likely to be found.
      </Typography>

      <Typography paragraph>
        The time-independent Schrödinger equation governing this system is:
      </Typography>

      <EquationBox>
        {'-ℏ²/2m ∂²ψ/∂x² + V(x)ψ = Eψ'}
      </EquationBox>

      <Typography paragraph>
        Key observations for n = {quantumNumber}:
        <ul>
          <li>The wave function has {quantumNumber - 1} nodes (points where ψ = 0)</li>
          <li>Higher quantum numbers lead to higher energy states</li>
          <li>The probability density shows {quantumNumber} main peaks</li>
        </ul>
      </Typography>
    </StyledPaper>
  );
}