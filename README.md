# Global Temperature Heat Map

## Project Overview

This project is a data visualization application that displays a heat map of monthly global land-surface temperatures from 1753 to 2015. It's built using HTML, CSS, JavaScript, and the D3.js library. The heat map provides an intuitive way to visualize temperature variations over time and across months.

## Features

- Interactive heat map displaying temperature data
- Color-coded cells representing temperature variations
- X-axis showing years from 1753 to 2015
- Y-axis displaying months of the year
- Tooltip providing detailed information on hover
- Legend explaining the color scale
- Responsive design for various screen sizes

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- D3.js (Data-Driven Documents) library

## Data Source

The temperature data is fetched from the following URL:
[https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json)

## Project Structure

- `index.html`: The main HTML file that structures the web page
- `styles.css`: CSS file for styling the heat map and page layout
- `script.js`: JavaScript file containing the D3.js code to create the heat map

## How to Run

1. Clone this repository to your local machine
2. Open the `index.html` file in a modern web browser
3. The heat map should render automatically

## User Interaction

- Hover over cells to see detailed temperature information for specific months and years
- Use the legend at the bottom to understand the color coding of temperatures

## Accessibility

This project aims to be accessible, with clear labeling and semantic HTML structure. The heat map includes:

- A title with id="title"
- A description with id="description"
- Axes with ids "x-axis" and "y-axis"
- A legend with id="legend"
- A tooltip with id="tooltip" for detailed information

## Testing

This project includes the FreeCodeCamp test suite for verifying that all user stories are met. You can run these tests by selecting the appropriate option in the top-left corner of the page when viewed in a browser.

## Future Improvements

- Add ability to zoom in on specific time periods
- Implement year range selection for more focused analysis
- Add additional datasets for comparison (e.g., CO2 levels, major historical events)

## Contributing

Contributions to improve the project are welcome. Please feel free to fork the repository, make changes, and submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).
