import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

export default function WaveFunctionInfo({ quantumNumber }) {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Quantum State Properties (n = {quantumNumber})
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
        <Box>
          <Typography variant="subtitle2" color="primary">Energy</Typography>
          <Typography variant="body2">
            E = {quantumNumber}E₁
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" color="primary">Number of Nodes</Typography>
          <Typography variant="body2">
            {quantumNumber - 1} nodes
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" color="primary">Wavelength</Typography>
          <Typography variant="body2">
            λ = {(2/quantumNumber).toFixed(2)}L
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" color="primary">Normalization</Typography>
          <Typography variant="body2">
            ∫|ψ(x)|²dx = 1
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
