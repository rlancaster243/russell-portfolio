import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CertData {
  year: number;
  count: number;
}

interface CertificationsTimelineProps {
  data: CertData[];
}

export default function CertificationsTimeline({ data }: CertificationsTimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year) as [number, number])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) as number])
      .nice()
      .range([height, 0]);

    // Create line generator
    const line = d3
      .line<CertData>()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.count))
      .curve(d3.curveMonotoneX);

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format('d')))
      .attr('color', 'hsl(var(--muted-foreground))')
      .selectAll('text')
      .attr('font-size', '12px');

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(yScale))
      .attr('color', 'hsl(var(--muted-foreground))')
      .selectAll('text')
      .attr('font-size', '12px');

    // Add Y axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'hsl(var(--foreground))')
      .attr('font-size', '14px')
      .text('Certifications Earned');

    // Add the line path
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'hsl(var(--primary))')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Add area under the line
    const area = d3
      .area<CertData>()
      .x((d) => xScale(d.year))
      .y0(height)
      .y1((d) => yScale(d.count))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'hsl(var(--primary))')
      .attr('fill-opacity', 0.2)
      .attr('d', area);

    // Add data points
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.year))
      .attr('cy', (d) => yScale(d.count))
      .attr('r', 5)
      .attr('fill', 'hsl(var(--primary))')
      .attr('stroke', 'hsl(var(--background))')
      .attr('stroke-width', 2);

    // Add labels on points
    g.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => xScale(d.year))
      .attr('y', (d) => yScale(d.count) - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', 'hsl(var(--foreground))')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .text((d) => d.count);
  }, [data]);

  return (
    <div className="flex justify-center items-center w-full overflow-x-auto">
      <svg ref={svgRef} className="max-w-full h-auto"></svg>
    </div>
  );
}
