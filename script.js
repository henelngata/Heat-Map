// Fetch the data
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
    .then(response => response.json())
    .then(data => {
        const dataset = data.monthlyVariance;
        const baseTemperature = data.baseTemperature;

        // Set up dimensions
        const margin = { top: 80, right: 60, bottom: 100, left: 100 };
        const width = 1200 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Create SVG
        const svg = d3.select('#chart-container')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Create scales
        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(dataset.map(d => d.year));

        const yScale = d3.scaleBand()
            .range([0, height])
            .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

        const colorScale = d3.scaleQuantile()
            .domain(d3.extent(dataset, d => baseTemperature + d.variance))
            .range(['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']);

        // Create axes
        const xAxis = d3.axisBottom(xScale)
            .tickValues(xScale.domain().filter(year => year % 10 === 0))
            .tickFormat(d3.format('d'));

        const yAxis = d3.axisLeft(yScale)
            .tickFormat(month => {
                const date = new Date(0);
                date.setUTCMonth(month);
                return d3.utcFormat('%B')(date);
            });

        svg.append('g')
            .attr('id', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);

        svg.append('g')
            .attr('id', 'y-axis')
            .call(yAxis);

        // Create cells
        svg.selectAll('.cell')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('class', 'cell')
            .attr('x', d => xScale(d.year))
            .attr('y', d => yScale(d.month - 1))
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .attr('fill', d => colorScale(baseTemperature + d.variance))
            .attr('data-month', d => d.month - 1)
            .attr('data-year', d => d.year)
            .attr('data-temp', d => baseTemperature + d.variance);

        // Create tooltip
        const tooltip = d3.select('body')
            .append('div')
            .attr('id', 'tooltip');

        // Add tooltip functionality
        svg.selectAll('.cell')
            .on('mouseover', (event, d) => {
                const date = new Date(d.year, d.month - 1);
                const temperature = (baseTemperature + d.variance).toFixed(1);
                
                tooltip.style('opacity', 0.9)
                    .html(`${d3.utcFormat('%Y - %B')(date)}<br>Temperature: ${temperature}℃<br>Variance: ${d.variance.toFixed(1)}℃`)
                    .attr('data-year', d.year)
                    .style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY - 28}px`);
            })
            .on('mouseout', () => {
                tooltip.style('opacity', 0);
            });

        // Create legend
        const legendWidth = 400;
        const legendHeight = 20;
        const legendColors = colorScale.range();

        const legendScale = d3.scaleLinear()
            .domain(d3.extent(dataset, d => baseTemperature + d.variance))
            .range([0, legendWidth]);

        const legend = svg.append('g')
            .attr('id', 'legend')
            .attr('transform', `translate(${(width - legendWidth) / 2}, ${height + 50})`);

        legend.selectAll('rect')
            .data(legendColors)
            .enter()
            .append('rect')
            .attr('x', (d, i) => i * (legendWidth / legendColors.length))
            .attr('y', 0)
            .attr('width', legendWidth / legendColors.length)
            .attr('height', legendHeight)
            .attr('fill', d => d);

        const legendAxis = d3.axisBottom(legendScale)
            .tickFormat(d3.format('.1f'))
            .tickValues(colorScale.quantiles());

        legend.append('g')
            .attr('transform', `translate(0, ${legendHeight})`)
            .call(legendAxis);
    });
