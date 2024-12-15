import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';

export default function Introduction() {
  return (
    <Paper className="quantum-paper" sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom className="glow-text">
        The Quantum Particle in a Box
      </Typography>
      
      <Typography variant="body1" paragraph color="text.secondary">
        The Schrödinger equation is the quantum equivalent of Newton's laws of motion. For a particle confined in a one-dimensional box, it reveals the quantization of energy and the wave-like nature of matter.
      </Typography>
      
      <Box sx={{ 
        bgcolor: 'rgba(0, 176, 255, 0.1)', 
        p: 2, 
        borderRadius: 1,
        fontFamily: 'math',
        textAlign: 'center',
        mb: 2,
        color: '#00b0ff',
        border: '1px solid rgba(0, 176, 255, 0.2)',
        boxShadow: '0 0 10px rgba(0, 176, 255, 0.1)'
      }}>
        -ℏ²/2m ∂²ψ/∂x² + V(x)ψ = Eψ
      </Box>

      <Divider sx={{ my: 2, borderColor: 'rgba(136, 146, 176, 0.2)' }} />

      <Typography variant="h6" gutterBottom className="glow-text">
        Key Features:
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: 2,
        '& .MuiBox-root': {
          p: 2,
          borderRadius: 1,
          bgcolor: 'rgba(0, 176, 255, 0.05)',
          border: '1px solid rgba(0, 176, 255, 0.1)'
        }
      }}>
        <Box>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Wave Function (ψ)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'math' }}>
            ψₙ(x) = √(2/L) sin(nπx/L)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Describes the quantum state of the particle
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Energy Levels
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'math' }}>
            Eₙ = n²π²ℏ²/(2mL²)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Only certain discrete energies are allowed
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Probability Density
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'math' }}>
            |ψ(x)|² 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gives the probability of finding the particle at position x
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
