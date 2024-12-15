import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Typography, Box, Paper } from '@mui/material';
import Introduction from './components/Introduction';
import Visualization from './components/Visualization';
import QuantumControls from './components/QuantumControls';
import WaveFunctionInfo from './components/WaveFunctionInfo';
import EnergyLevels from './components/EnergyLevels';
import PotentialSelector from './components/PotentialSelector';
import { theme } from './theme';
import { ErrorBoundary } from 'react-error-boundary';
import QuantumExplanation from './components/QuantumExplanation';

function ErrorFallback({error}) {
  return (
    <Paper sx={{ p: 3, color: 'error.main' }}>
      <Typography variant="h6">Something went wrong:</Typography>
      <pre>{error.message}</pre>
    </Paper>
  );
}

function App() {
  const [quantumNumber, setQuantumNumber] = useState(1);
  const [potentialType, setPotentialType] = useState('harmonic');
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [savedStates, setSavedStates] = useState(() => {
    const saved = localStorage.getItem('quantumStates');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    let animationFrame;
    if (isPlaying) {
      const animate = () => {
        setTime(t => t + 0.1);
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

  const saveCurrentState = () => {
    const newState = {
      id: Date.now(),
      quantumNumber,
      potentialType,
      timestamp: new Date().toISOString()
    };
    setSavedStates(prev => {
      const updated = [...prev, newState];
      localStorage.setItem('quantumStates', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }} className="glow-text">
          Quantum Wave Explorer
        </Typography>
        
        <Introduction />
        
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 3 }}>
            <Box>
              <Visualization 
                quantumNumber={quantumNumber}
                potentialType={potentialType}
              />
              <WaveFunctionInfo 
                quantumNumber={quantumNumber}
                potentialType={potentialType}
              />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 3, alignItems: 'start' }}>
                <QuantumExplanation
                  quantumNumber={quantumNumber}
                  potentialType={potentialType}
                />
                <Box sx={{ width: '300px' }}>
                  <EnergyLevels 
                    quantumNumber={quantumNumber}
                    potentialType={potentialType}
                  />
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ width: '300px' }}>
              <PotentialSelector
                selectedPotential={potentialType}
                onPotentialChange={setPotentialType}
              />
              <QuantumControls 
                quantumNumber={quantumNumber}
                setQuantumNumber={setQuantumNumber}
              />
            </Box>
          </Box>
        </ErrorBoundary>
      </Container>
    </ThemeProvider>
  );
}

export default App;
