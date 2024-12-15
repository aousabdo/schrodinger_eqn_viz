import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';
import Introduction from './components/Introduction';
import Visualization from './components/Visualization';
import QuantumControls from './components/QuantumControls';
import WaveFunctionInfo from './components/WaveFunctionInfo';
import EnergyLevels from './components/EnergyLevels';
import PotentialSelector from './components/PotentialSelector';
import { theme } from './theme';

function App() {
  const [quantumNumber, setQuantumNumber] = useState(1);
  const [potentialType, setPotentialType] = useState('infinite-well');

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }} className="glow-text">
          Quantum Wave Explorer
        </Typography>
        
        <Introduction />
        
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
            <EnergyLevels 
              quantumNumber={quantumNumber}
              potentialType={potentialType}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
