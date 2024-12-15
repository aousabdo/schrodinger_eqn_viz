import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { calculatePotential, calculateWaveFunction } from '../utils/potentials';

export default function Visualization({ quantumNumber, potentialType }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
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

    // Calculate domains
    const yMin = Math.min(
      d3.min(points, d => d.wavefunction),
      d3.min(points, d => d.probability),
      d3.min(points, d => d.potential)
    );
    const yMax = Math.max(
      d3.max(points, d => d.wavefunction),
      d3.max(points, d => d.probability),
      d3.max(points, d => d.potential)
    );
    const yPadding = (yMax - yMin) * 0.1;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, L])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([yMin - yPadding, yMax + yPadding])
      .range([height - margin.bottom, margin.top]);

    // Add grid
    const xGrid = d3.axisBottom(xScale)
      .tickSize(-(height - margin.top - margin.bottom))
      .tickFormat('')
      .ticks(10);

    const yGrid = d3.axisLeft(yScale)
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

    // Draw potential
    const potentialLine = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.potential))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(points)
      .attr('fill', 'none')
      .attr('stroke', '#ff4081')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('d', potentialLine);

    // Draw wavefunction and probability density
    const waveLine = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.wavefunction))
      .curve(d3.curveMonotoneX);

    const probLine = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.probability))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(points)
      .attr('fill', 'none')
      .attr('stroke', '#00b0ff')
      .attr('stroke-width', 2)
      .attr('d', waveLine);

    svg.append('path')
      .datum(points)
      .attr('fill', 'none')
      .attr('stroke', '#1de9b6')
      .attr('stroke-width', 2)
      .attr('d', probLine);

    // Add axes and labels
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .style('color', '#8892b0');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis)
      .style('color', '#8892b0');

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

  }, [quantumNumber, potentialType]);

  return (
    <div className="visualization-container">
      <svg ref={svgRef}></svg>
    </div>
  );
}
