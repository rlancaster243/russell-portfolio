import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SkillCategory {
  category: string;
  count: number;
}

interface SkillsDistributionChartProps {
  data: SkillCategory[];
}

export default function SkillsDistributionChart({ data }: SkillsDistributionChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 80, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, width])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) as number])
      .nice()
      .range([height, 0]);

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .attr('color', 'hsl(var(--muted-foreground))')
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end')
      .attr('font-size', '11px');

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(yScale))
      .attr('color', 'hsl(var(--muted-foreground))')
      .selectAll('text')
      .attr('font-size', '12px');

    // Add Y axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -45)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'hsl(var(--foreground))')
      .attr('font-size', '14px')
      .text('Number of Skills');

    // Create gradient
    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'bar-gradient')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'hsl(var(--primary))')
      .attr('stop-opacity', 0.6);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'hsl(var(--primary))')
      .attr('stop-opacity', 1);

    // Add bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.category) as number)
      .attr('y', height)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', 'url(#bar-gradient)')
      .attr('rx', 4)
      .transition()
      .duration(800)
      .attr('y', (d) => yScale(d.count))
      .attr('height', (d) => height - yScale(d.count));

    // Add value labels on top of bars
    g.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => (xScale(d.category) as number) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.count) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'hsl(var(--foreground))')
      .attr('font-size', '13px')
      .attr('font-weight', '600')
      .attr('opacity', 0)
      .text((d) => d.count)
      .transition()
      .duration(800)
      .attr('opacity', 1);
  }, [data]);

  return (
    <div className="flex justify-center items-center w-full overflow-x-auto">
      <svg ref={svgRef} className="max-w-full h-auto"></svg>
    </div>
  );
}
