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

    const margin = { top: 100, right: 30, bottom: 100, left: 70 };
    const width = 650 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add chart title
    svg.append('text')
      .attr('x', (width + margin.left + margin.right) / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', '700')
      .style('fill', 'hsl(var(--foreground))')
      .text('Skills Distribution by Category');

    // Add subtitle
    svg.append('text')
      .attr('x', (width + margin.left + margin.right) / 2)
      .attr('y', 45)
      .attr('text-anchor', 'middle')
      .style('font-size', '13px')
      .style('fill', 'hsl(var(--muted-foreground))')
      .text('Technical proficiency across data science domains');

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, width])
      .padding(0.25);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)! * 1.1])
      .nice()
      .range([height, 0]);

    // Vibrant color scale with domain grouping
    const colorScale = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.category))
      .range([
        'hsl(217, 91%, 60%)',  // Blue - Programming
        'hsl(262, 83%, 58%)',  // Purple - Machine Learning
        'hsl(173, 80%, 40%)',  // Cyan - Data Engineering
        'hsl(45, 93%, 47%)',   // Yellow - Data Analysis
        'hsl(142, 76%, 36%)',  // Green - BI & Visualization
        'hsl(346, 77%, 50%)'   // Red - Modeling & Analytics
      ]);

    // Domain grouping for legend
    const domainGroups = [
      { category: 'Programming', domain: 'Core Development', color: 'hsl(217, 91%, 60%)' },
      { category: 'Machine Learning', domain: 'AI & ML', color: 'hsl(262, 83%, 58%)' },
      { category: 'Data Engineering', domain: 'Infrastructure', color: 'hsl(173, 80%, 40%)' },
      { category: 'Data Analysis', domain: 'Analytics', color: 'hsl(45, 93%, 47%)' },
      { category: 'BI & Visualization', domain: 'Business Intelligence', color: 'hsl(142, 76%, 36%)' },
      { category: 'Modeling & Analytics', domain: 'Advanced Analytics', color: 'hsl(346, 77%, 50%)' }
    ];

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top - 55})`);

    const legendItemWidth = (width / 3);
    const legendItems = legend.selectAll('.legend-item')
      .data(domainGroups)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        return `translate(${col * legendItemWidth}, ${row * 20})`;
      });

    legendItems.append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('rx', 2)
      .attr('fill', d => d.color)
      .style('filter', d => `drop-shadow(0 0 4px ${d.color})`);

    legendItems.append('text')
      .attr('x', 18)
      .attr('y', 10)
      .style('font-size', '11px')
      .style('font-weight', '500')
      .style('fill', 'hsl(var(--foreground))')
      .text(d => d.category);

    // Add grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(yScale)
        .tickSize(-width)
        .tickFormat(() => '')
      );

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .attr('color', 'hsl(var(--muted-foreground))')
      .selectAll('text')
      .attr('transform', 'rotate(-35)')
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .attr('fill', (d) => colorScale(d as string))
      .attr('dy', '0.5em')
      .attr('dx', '-0.5em');

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5))
      .attr('color', 'hsl(var(--muted-foreground))')
      .selectAll('text')
      .attr('font-size', '13px')
      .attr('font-weight', '500');

    // Add axis labels
    g.append('text')
      .attr('x', width / 2)
      .attr('y', height + 75)
      .attr('text-anchor', 'middle')
      .attr('fill', 'hsl(var(--foreground))')
      .attr('font-size', '14px')
      .attr('font-weight', '600')
      .text('Skill Category');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -50)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'hsl(var(--foreground))')
      .attr('font-size', '14px')
      .attr('font-weight', '600')
      .text('Number of Skills (Proficiency Count)');

    // Create gradient for each bar
    data.forEach((d, i) => {
      const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', `bar-gradient-${i}`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', colorScale(d.category))
        .attr('stop-opacity', 1);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', colorScale(d.category))
        .attr('stop-opacity', 0.7);
    });

    // Draw bars with enhanced styling
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.category)!)
      .attr('y', height)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', (d, i) => `url(#bar-gradient-${i})`)
      .attr('rx', 6)
      .style('filter', (d) => `drop-shadow(0 4px 8px ${colorScale(d.category)}40)`)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('filter', `drop-shadow(0 6px 16px ${colorScale(d.category)}80)`)
          .attr('y', yScale(d.count) - 5)
          .attr('height', height - yScale(d.count) + 5);

        tooltip
          .style('opacity', '1')
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 15}px`)
          .html(`
            <div style="font-weight: 700; color: ${colorScale(d.category)}; margin-bottom: 8px; font-size: 15px;">
              ${d.category}
            </div>
            <div style="font-size: 14px; margin-bottom: 6px;">
              Skills: <strong>${d.count}</strong>
            </div>
            <div style="font-size: 12px; color: hsl(var(--muted-foreground)); margin-top: 8px; padding-top: 8px; border-top: 1px solid hsl(var(--border));">
              ${d.category === 'Programming' ? 'Languages & development tools' :
                d.category === 'Machine Learning' ? 'ML algorithms & frameworks' :
                d.category === 'Data Engineering' ? 'Infrastructure & data pipelines' :
                d.category === 'Data Analysis' ? 'Statistical analysis & exploration' :
                d.category === 'BI & Visualization' ? 'Dashboards & visual storytelling' :
                'Statistical modeling & forecasting'}
            </div>
          `);
      })
      .on('mousemove', function(event) {
        tooltip
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 15}px`);
      })
      .on('mouseleave', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('filter', `drop-shadow(0 4px 8px ${colorScale(d.category)}40)`)
          .attr('y', yScale(d.count))
          .attr('height', height - yScale(d.count));

        tooltip.style('opacity', '0');
      })
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .ease(d3.easeCubicOut)
      .attr('y', (d) => yScale(d.count))
      .attr('height', (d) => height - yScale(d.count));

    // Add value labels on bars
    g.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => xScale(d.category)! + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.count) - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', (d) => colorScale(d.category))
      .attr('font-size', '15px')
      .attr('font-weight', '700')
      .style('pointer-events', 'none')
      .text((d) => d.count)
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100 + 500)
      .style('opacity', 1);

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
          borderRadius: '10px',
          padding: '14px 16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          zIndex: 1000,
          transition: 'opacity 0.2s',
          color: 'hsl(var(--popover-foreground))',
          fontSize: '13px',
          minWidth: '240px',
          backdropFilter: 'blur(8px)'
        }}
      />
    </div>
  );
}
