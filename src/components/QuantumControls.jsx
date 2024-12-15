import React from 'react';
import { Paper, Typography, Box, Slider } from '@mui/material';

export default function QuantumControls({ quantumNumber, setQuantumNumber }) {
  return (
    <Paper className="quantum-paper" sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom className="glow-text">
        Quantum State Controls
      </Typography>
      
      <Box sx={{ width: '100%' }}>
        <Typography gutterBottom color="text.secondary">
          Quantum Number (n): {quantumNumber}
        </Typography>
        <Slider
          className="quantum-slider"
          value={quantumNumber}
          onChange={(_, value) => setQuantumNumber(value)}
          min={1}
          max={5}
          step={1}
          marks
          valueLabelDisplay="auto"
        />
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Higher quantum numbers lead to:
        • More nodes
        • Higher energy states
        • Shorter wavelengths
        • More complex probability distributions
      </Typography>
    </Paper>
  );
}
