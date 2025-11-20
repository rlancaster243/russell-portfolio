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
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
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

    // Vibrant color scale
    const colorScale = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.category))
      .range([
        'hsl(217, 91%, 60%)',  // Blue - Data Science
        'hsl(262, 83%, 58%)',  // Purple - ML/AI
        'hsl(173, 80%, 40%)',  // Cyan - Data Engineering
        'hsl(45, 93%, 47%)',   // Yellow - Programming
        'hsl(142, 76%, 36%)',  // Green - Visualization
        'hsl(346, 77%, 50%)'   // Red - Finance
      ]);

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .attr('color', 'hsl(var(--muted-foreground))')
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end')
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .attr('fill', (d) => colorScale(d as string));

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(yScale))
      .attr('color', 'hsl(var(--muted-foreground))')
      .selectAll('text')
      .attr('font-size', '12px')
      .attr('font-weight', '500');

    // Add Y axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -45)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'hsl(var(--foreground))')
      .attr('font-size', '14px')
      .attr('font-weight', '600')
      .text('Number of Skills');

    // Create individual gradients for each bar
    data.forEach((d, i) => {
      const gradient = svg
        .append('defs')
        .append('linearGradient')
        .attr('id', `bar-gradient-${i}`)
        .attr('x1', '0%')
        .attr('y1', '100%')
        .attr('x2', '0%')
        .attr('y2', '0%');

      gradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', colorScale(d.category))
        .attr('stop-opacity', 0.6);

      gradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', colorScale(d.category))
        .attr('stop-opacity', 1);
    });

    // Add interactive bars with tooltips
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.category) as number)
      .attr('y', height)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', (d, i) => `url(#bar-gradient-${i})`)
      .attr('rx', 6)
      .style('cursor', 'pointer')
      .style('filter', (d) => `drop-shadow(0 4px 8px ${colorScale(d.category)}40)`)
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('filter', `drop-shadow(0 8px 16px ${colorScale(d.category)}80)`)
          .attr('opacity', 0.9);

        tooltip
          .style('opacity', '1')
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`)
          .html(`
            <div style="font-weight: 600; color: ${colorScale(d.category)}; margin-bottom: 4px;">
              ${d.category}
            </div>
            <div style="font-size: 14px;">
              Skills: <strong>${d.count}</strong>
            </div>
            <div style="font-size: 12px; color: hsl(var(--muted-foreground)); margin-top: 4px;">
              ${d.category === 'Data Science' ? 'Core analytical skills' :
                d.category === 'ML/AI' ? 'Machine learning & AI tools' :
                d.category === 'Data Engineering' ? 'Infrastructure & pipelines' :
                d.category === 'Programming' ? 'Languages & frameworks' :
                d.category === 'Visualization' ? 'Data presentation tools' :
                'NLP, computer vision & advanced techniques'}
            </div>
          `);
      })
      .on('mousemove', function(event) {
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`);
      })
      .on('mouseleave', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('filter', `drop-shadow(0 4px 8px ${colorScale(d.category)}40)`)
          .attr('opacity', 1);

        tooltip.style('opacity', '0');
      })
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr('y', (d) => yScale(d.count))
      .attr('height', (d) => height - yScale(d.count));

    // Add value labels on top of bars
    g.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => (xScale(d.category) as number) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.count) - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', (d) => colorScale(d.category))
      .attr('font-size', '15px')
      .attr('font-weight', '700')
      .attr('opacity', 0)
      .text((d) => d.count)
      .style('pointer-events', 'none')
      .transition()
      .duration(800)
      .delay((d, i) => i * 100)
      .attr('opacity', 1);
  }, [data]);

  return (
    <div className="flex justify-center items-center w-full overflow-x-auto relative">
      <svg ref={svgRef} className="max-w-full h-auto"></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'fixed',
          opacity: 0,
          pointerEvents: 'none',
          background: 'hsl(var(--popover))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          transition: 'opacity 0.2s',
          color: 'hsl(var(--popover-foreground))',
          fontSize: '13px',
          minWidth: '200px'
        }}
      />
    </div>
  );
}
