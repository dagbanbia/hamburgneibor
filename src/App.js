import React, { Component } from 'react';

import './App.css';

import axios from 'axios'

import Header from './Header';

class App extends Component {


   state = {
    venues : []
   }

    componentDidMount(){
      this.getVenues()
      
    
    
  }
  renderMap = () => {
    loadscript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAnwItrr4BvsGLFToE_YpoCZ1lCP-yZR6o&callback=initMap")
      window.initMap = this.initMap

  }
  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: 'SL5WOOJN2SSF5QUNBOG1UEMISJU10P3R51UDFNVNR5X01H5F',
      client_secret:'UAA34MVBQZPPIOFDJ2OJDCQCQYSBT4PQ301G5DLSWXKEKNTL',
      query:'University',
      near:'Hamburg',
      v : "20180923",
      limit:10
    }

     axios.get(endPoint + new URLSearchParams(parameters))
      .then(response =>{
        this.setState({
          venues:response.data.response.groups[0].items
        }, this.renderMap())
    })
      
      .catch(error => {
        console.log('ERROR!! ' + error)
      })
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'),{
      center:{lat: 53.5511877, lng: 10.0055596},
      zoom: 13

    })

    //Create An Infowindow

      var infowindow = new window.google.maps.InfoWindow()

     //Display Dynamic Markers
    this.state.venues.map(myVenue => {

      var contentString = `${myVenue.venue.name}`

     //Create A Marker

    var marker = new window.google.maps.Marker({
      position: {lat: myVenue.venue.location.lat,lng:myVenue.venue.location.lng},
      map: map,
      title:myVenue.venue.name
    
  });

    //Click on A Marker
    marker.addListener('click', function(){

      //Change the content
      infowindow.setContent(contentString)

      //open An Infowindow
      infowindow.open(map,marker)
    })

    })

  }
  render() {
    return (

      <main>

      <div id="header" aria-label="Header">
          <Header />
      </div>
       <div id="map"></div>

      </main>
      
         
    );
  }
}





function loadscript(url){
  var index = window.document.getElementsByTagName('script')[0]
  var script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script,index)
}

export default App;
