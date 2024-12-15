import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { calculatePotential, calculateWaveFunction } from '../utils/potentials';
import { CircularProgress } from '@mui/material';

export default function Visualization({ quantumNumber, potentialType }) {
  const svgRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 60, bottom: 40, left: 60 };
    const L = 1;
    
    d3.select(svgRef.current).selectAll("*").remove();
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Generate data points
    const numPoints = 200;
    const points = Array.from({ length: numPoints }, (_, i) => {
      const x = (i * L) / (numPoints - 1);
      const psi = calculateWaveFunction(x, quantumNumber, potentialType);
      const V = calculatePotential(x, potentialType);
      return {
        x,
        wavefunction: psi,
        probability: psi * psi,
        potential: V === Infinity ? 20 : V // Scale infinity for visualization
      };
    });

    // Calculate separate domains for wave/probability and potential
    const yMinWave = Math.min(
      d3.min(points, d => d.wavefunction),
      d3.min(points, d => d.probability)
    );
    const yMaxWave = Math.max(
      d3.max(points, d => d.wavefunction),
      d3.max(points, d => d.probability)
    );
    const yPaddingWave = (yMaxWave - yMinWave) * 0.1;

    const yMinPotential = d3.min(points, d => d.potential);
    const yMaxPotential = d3.max(points, d => d.potential);
    const yPaddingPotential = (yMaxPotential - yMinPotential) * 0.1;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, L])
      .range([margin.left, width - margin.right]);

    const yScaleWave = d3.scaleLinear()
      .domain([yMinWave - yPaddingWave, yMaxWave + yPaddingWave])
      .range([height - margin.bottom, margin.top]);

    const yScalePotential = d3.scaleLinear()
      .domain([yMinPotential - yPaddingPotential, yMaxPotential + yPaddingPotential])
      .range([height - margin.bottom, margin.top]);

    // Update grid to use wave scale
    const xGrid = d3.axisBottom(xScale)
      .tickSize(-(height - margin.top - margin.bottom))
      .tickFormat('')
      .ticks(10);

    const yGrid = d3.axisLeft(yScaleWave)
      .tickSize(-(width - margin.left - margin.right))
      .tickFormat('')
      .ticks(10);

    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xGrid);

    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yGrid);

    // Update line generators
    const potentialLine = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScalePotential(d.potential))
      .curve(d3.curveMonotoneX);

    const waveLine = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScaleWave(d.wavefunction))
      .curve(d3.curveMonotoneX);

    const probLine = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScaleWave(d.probability))
      .curve(d3.curveMonotoneX);

    // Draw the lines
    const plotGroup = svg.append('g').attr('class', 'plot-lines');
    
    // Draw potential
    plotGroup.append('path')
      .datum(points)
      .attr('fill', 'none')
      .attr('stroke', '#ff4081')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .transition()
      .duration(500)
      .attr('d', potentialLine);

    // Draw wave function
    plotGroup.append('path')
      .datum(points)
      .attr('fill', 'none')
      .attr('stroke', '#00b0ff')
      .attr('stroke-width', 2)
      .transition()
      .duration(500)
      .attr('d', waveLine);

    // Draw probability density
    plotGroup.append('path')
      .datum(points)
      .attr('fill', 'none')
      .attr('stroke', '#1de9b6')
      .attr('stroke-width', 2)
      .transition()
      .duration(500)
      .attr('d', probLine);

    // Update axes
    const xAxis = d3.axisBottom(xScale);
    const yAxisWave = d3.axisLeft(yScaleWave);
    const yAxisPotential = d3.axisRight(yScalePotential);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .style('color', '#8892b0');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxisWave)
      .style('color', '#8892b0');

    svg.append('g')
      .attr('transform', `translate(${width - margin.right},0)`)
      .call(yAxisPotential)
      .style('color', '#ff4081');  // Match potential color

    // Add axis labels
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', margin.left - 40)
      .attr('x', -(height / 2))
      .attr('fill', '#8892b0')
      .style('text-anchor', 'middle')
      .text('Wave Function & Probability');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', width - margin.right + 40)
      .attr('x', -(height / 2))
      .attr('fill', '#ff4081')
      .style('text-anchor', 'middle')
      .text('Potential V(x)');

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left + 10}, ${margin.top + 10})`);

    const legendItems = [
      { color: '#00b0ff', text: 'Wave function (ψ)' },
      { color: '#1de9b6', text: 'Probability density (|ψ|²)' },
      { color: '#ff4081', text: 'Potential V(x)' }
    ];

    legendItems.forEach((item, i) => {
      const g = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`);

      g.append('line')
        .attr('x1', 0)
        .attr('x2', 20)
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('stroke', item.color)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', item.color === '#ff4081' ? '5,5' : '0');

      g.append('text')
        .attr('x', 25)
        .attr('y', 4)
        .attr('fill', '#e6f1ff')
        .text(item.text)
        .style('font-size', '12px');
    });

    // Add mouseover tooltips showing exact values
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('opacity', 0)
      .on('mousemove', (event) => {
        const [x] = d3.pointer(event);
        const xValue = xScale.invert(x);
        const point = points.find(p => Math.abs(p.x - xValue) < 0.01);
        if (point) {
          const [mouseX, mouseY] = d3.pointer(event, document.body);
          tooltip
            .style('left', `${mouseX + 15}px`)
            .style('top', `${mouseY - 15}px`)
            .transition()
            .duration(200)
            .style('opacity', .9);
          tooltip.html(`
            <strong>Position:</strong> ${point.x.toFixed(3)}<br/>
            <strong>Wave Function (ψ):</strong> ${point.wavefunction.toFixed(3)}<br/>
            <strong>Probability (|ψ|²):</strong> ${point.probability.toFixed(3)}<br/>
            <strong>Potential V(x):</strong> ${point.potential.toFixed(3)}
          `);
        }
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    setIsLoading(false);
  }, [quantumNumber, potentialType]);

  const handleExport = () => {
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `quantum-state-n${quantumNumber}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="visualization-container">
      {isLoading && <CircularProgress />}
      <svg ref={svgRef}></svg>
    </div>
  );
}
