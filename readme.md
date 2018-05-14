# Slalom Qlik Hack Challenge 2018

The goal of this project was to create a solution that gave the C40 Cities and Greenovate City of Boston organizations a way to view performance of key emissions and energy consumption metrics.  The solution intended to create varying levels of aggregation, and give the user a way to drill down to the individual building level to view performance against peers.  This solution was created on nights and weekends in a little less than three weeks so there are certainly opportunities for refactoring and optimization. 

## To Run

- After downloading the source files, `npm install` to install required dependencies
- In src/ folder, locate the file qConfig.js
- Change Qlik Sense Server properties and mapbox token properties as required
- To run locally, execute the `npm run dev`
- For production build run `npm run build`
- Please note, you must be authenticated with Qlik Sense Server before you will be able to see the working application
- Contact Kevin McGovern if you would like credentials for the demo server connection included in the app

## Libraries Used
Beyond building a solid foundation from the data in Qlik Sense, we utilized [React.js](https://reactjs.org/) for the project organization, and [Material UI](https://material-ui-next.com/) as a design framework.  [Enigma.js](https://github.com/qlik-oss/enigma.js/) provides a connection to the Qlik Sense Engine API.  [Mapbox GL JS library](https://www.mapbox.com/mapbox-gl-js/api/) is used to create the maps and [Turf.js](http://turfjs.org/) is used for some of the geospatial calculations.  [C3.js](http://c3js.org/) is used to create the supporting charts.