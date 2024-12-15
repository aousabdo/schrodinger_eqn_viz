import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function EnergyLevels({ quantumNumber }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = 200;
    const height = 300;
    const margin = { top: 20, right: 40, bottom: 30, left: 40 };

    d3.select(svgRef.current).selectAll("*").remove();
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Calculate energy levels (E ∝ n²)
    const maxEnergy = 25;
    const yScale = d3.scaleLinear()
      .domain([0, maxEnergy])
      .range([height - margin.bottom, margin.top]);

    // Create energy levels data
    const energyLevels = Array.from({ length: 5 }, (_, i) => ({
      n: i + 1,
      energy: (i + 1) * (i + 1),
      label: `E${i + 1}`
    }));

    // Draw energy levels
    svg.selectAll('line.energy-level')
      .data(energyLevels)
      .enter()
      .append('line')
      .attr('class', 'energy-level')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', d => yScale(d.energy))
      .attr('y2', d => yScale(d.energy))
      .attr('stroke', d => d.n === quantumNumber ? '#00b0ff' : '#8892b0')
      .attr('stroke-width', d => d.n === quantumNumber ? 2 : 1)
      .style('filter', d => d.n === quantumNumber ? 'drop-shadow(0 0 3px rgba(0, 176, 255, 0.5))' : 'none');

    // Add energy labels
    svg.selectAll('text.energy-label')
      .data(energyLevels)
      .enter()
      .append('text')
      .attr('class', 'energy-label')
      .attr('x', width - margin.right + 5)
      .attr('y', d => yScale(d.energy))
      .attr('dy', '0.3em')
      .text(d => d.label)
      .attr('fill', d => d.n === quantumNumber ? '#00b0ff' : '#8892b0')
      .attr('font-size', '12px');

    // Add y-axis
    const yAxis = d3.axisLeft(yScale)
      .ticks(5);
    
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis)
      .style('color', '#8892b0');

    // Add y-axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height/2)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('fill', '#8892b0')
      .text('Energy (E/E₁)');

  }, [quantumNumber]);

  return <svg ref={svgRef}></svg>;
}
