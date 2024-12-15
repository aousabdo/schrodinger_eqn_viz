import React from 'react';
import { Paper, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const potentials = [
  {
    id: 'harmonic',
    name: 'Simple Harmonic Oscillator',
    description: 'V(x) = ½kx²'
  },
  {
    id: 'infinite-well',
    name: 'Infinite Square Well',
    description: 'V(x) = 0 inside, ∞ outside'
  },
  {
    id: 'finite-well',
    name: 'Finite Square Well',
    description: 'V(x) = -V₀ inside, 0 outside'
  },
  {
    id: 'double-well',
    name: 'Two Square Wells',
    description: 'Two coupled potential wells'
  },
  {
    id: 'stepped-well',
    name: 'Stepped Square Well',
    description: 'Multi-level potential well'
  }
];

export default function PotentialSelector({ selectedPotential, onPotentialChange }) {
  return (
    <Paper className="quantum-paper" sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom className="glow-text">
        Potential Function
      </Typography>
      
      <RadioGroup
        value={selectedPotential}
        onChange={(e) => onPotentialChange(e.target.value)}
      >
        {potentials.map((potential) => (
          <FormControlLabel
            key={potential.id}
            value={potential.id}
            control={
              <Radio 
                sx={{
                  color: 'primary.main',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  }
                }}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography 
                  sx={{ 
                    fontFamily: 'monospace', 
                    fontSize: '24px',
                    color: 'primary.main',
                    width: '40px'
                  }}
                >
                  {potential.symbol}
                </Typography>
                <Box>
                  <Typography color="text.primary">
                    {potential.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {potential.description}
                  </Typography>
                </Box>
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </Paper>
  );
}
