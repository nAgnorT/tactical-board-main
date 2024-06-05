import * as d3 from "d3"
import axios from "axios"


const server ='http://127.0.0.1:3056'


async function getLineData() {
    try {
      const response = await axios.get(`${server}/api/line_data`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
async function getHomePlayerData() {
    try {
      const response = await axios.get(`${server}/api/home_player_data`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
}
async function getAwayPlayerData() {
  try {
    const response = await axios.get(`${server}/api/away_player_data`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
async function getPolygonData() {
  try {
    const response = await axios.get(`${server}/api/polygon_data`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
function saveLineData(lineData) {
    
    return d3.json(`${server}/api/line_data`)
      .then(jsonData => {
          jsonData.length = 0
          jsonData.push(...lineData)
          axios.post(`${server}/update_line_data`, jsonData)
      })
      .then(response => { })
      .catch(error => console.error('Error sending to server:', error))
  }
function saveHomePlayerData(playerData) {

    return d3.json(`${server}/api/home_player_data`)
      .then(jsonData => {
          jsonData.length = 0
          jsonData.push(...playerData)
          axios.post(`${server}/update_home_player_data`, jsonData)
      })
      .then(response => { })
      .catch(error => console.error('Error sending to server:', error))
  }
function saveAwayPlayerData(playerData) {

    return d3.json(`${server}/api/away_player_data`)
      .then(jsonData => {
          jsonData.length = 0
          jsonData.push(...playerData)
          axios.post(`${server}/update_away_player_data`, jsonData)
      })
      .then(response => { })
      .catch(error => console.error('Error sending to server:', error))
  }
  function savePolygonData(polygonData) {
    return d3.json(`${server}/api/polygon_data`)
    .then(jsonData => {
        jsonData.length = 0
        jsonData.push(...polygonData)
    
        axios.post(`${server}/update_polygon_data`, jsonData)
        .then(response => { })
        .catch(error => console.error('Error sending to server:', error));
    });
  }
  export {
    getLineData,
    getHomePlayerData,
    getAwayPlayerData,
    getPolygonData,
    saveHomePlayerData,
    saveAwayPlayerData,
    saveLineData,
    savePolygonData
  }