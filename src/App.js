import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import escapeRegExp from 'escape-string-regexp';
import Header from './Header';
import SearchBar from './SearchBar';
import MenuComponent from './MenuComponent';
import ErrorHandle from './ErrorHandle';


class App extends Component {


constructor(props) {
    super(props)
    this.state = {
      venues: [],
      markers: [],
      showVenues: [],
      query: '',
      notVisibleMarkers: []
  }}

    componentDidMount(){
      this.getVenues()
      
    
    
  }

   /* 
  * renderMap function: 
  * - loads the script to
  * - initializes the map
  */
  renderMap = () => {
    loadscript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAnwItrr4BvsGLFToE_YpoCZ1lCP-yZR6o&callback=initMap")
      window.initMap = this.initMap

  }

  /*
  * endPoint & parameters are the two requirement of the foursquare library:
  * https://developer.foursquare.com/docs/api/venues/explore
  */
  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: 'SL5WOOJN2SSF5QUNBOG1UEMISJU10P3R51UDFNVNR5X01H5F',
      client_secret:'UAA34MVBQZPPIOFDJ2OJDCQCQYSBT4PQ301G5DLSWXKEKNTL',
      query:'University',
      near:'Hamburg',
      v : "20180923",
      limit:15
    }

    /* 
    * axios does the same thing as the FETCH API
    * Reference: https://github.com/axios/axios 
    */

     axios.get(endPoint + new URLSearchParams(parameters))
      .then(response =>{
        this.setState({
          venues:response.data.response.groups[0].items,
          showVenues: response.data.response.groups[0].items
        }, this.renderMap())
    })
      
      .catch(error => {
        console.log('ERROR!! ' + error)
      })
  }

/* 
    * Create the map.
    * Center coordinates point to near central station, Hamburg - Germany.
    * Zoom level set to 13.
    */
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'),{
      center:{lat: 53.5511877, lng: 10.0055596},
      zoom: 13

    })

    //Create An Infowindow

      var infowindow = new window.google.maps.InfoWindow()

     //Content of Dynamic Markers
    this.state.venues.map(myVenue => {

      var contentString = `<b>${myVenue.venue.name}</b> <br><i>${myVenue.venue.location.address}</i>`

     /* 
      * Create a marker
      * Reference: https://developers.google.com/maps/documentation/javascript/markers
      */

    var marker = new window.google.maps.Marker({
      position: {lat: myVenue.venue.location.lat,lng:myVenue.venue.location.lng},
      map: map,
      animation: window.google.maps.Animation.DROP,
      title:myVenue.venue.name
    
  });

  this.state.markers.push(marker)

  /* 
      * Make a marker bounce. The function is called when the marker is clicked.
      * The function is called when the marker is clicked
      */

  function animationEffect() {
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(function(){ marker.setAnimation(null) }, 500)
      }

      function openMarker() {
        // Setting the content of the InfoWindow
        infowindow.setContent(contentString)
        animationEffect()
        
      // Opens an InfoWindow when a marker is clicked
        infowindow.open(map, marker)
      }


      // Click on a marker
      marker.addListener('click', function() {
        openMarker()

    })

    }
  )

  }

  /*
   * toggling the university list.
  */
   
  updateQuery = query => {
    this.setState({ query })
    this.state.markers.map(marker => marker.setVisible(true))
    let filterVenues
    let notVisibleMarkers

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      filterVenues = this.state.venues.filter(myVenue =>
        match.test(myVenue.venue.name)
      )
      this.setState({ venues: filterVenues })
      notVisibleMarkers = this.state.markers.filter(marker =>
        filterVenues.every(myVenue => myVenue.venue.name !== marker.title)
      )

      /* 
       * setting markers invisible for venues not included in the filtered venues
      */
      notVisibleMarkers.forEach(marker => marker.setVisible(false))

      this.setState({ notVisibleMarkers })
    } else {
      this.setState({ venues: this.state.showVenues })
      this.state.markers.forEach(marker => marker.setVisible(true))
    }
  }
 /* render will display all the components
 */
  render() {
    if (this.state.hasError) {
      return <div id="Error-message" aria-label="Error message">Sorry, something went wrong!</div>
    } else {
      return (
      <main>
        <ErrorHandle>
        
         
        <div id="header" aria-label="Header">
          <Header />
        </div>

        <div id="SearchBar" aria-label="Search Bar">
          <SearchBar
            venues={ this.state.showVenues } 
            markers={ this.state.markers } 
            filteredVenues={ this.filteredVenues }
            query={this.state.query}
            clearQuery={this.clearQuery}          
            updateQuery={b => this.updateQuery(b)}
            clickLocation={this.clickLocation}
          />
        </div>
        
        <div id="container" aria-label="Menu Container">
          <MenuComponent 
            venues={ this.state.venues }
            markers={ this.state.markers }
          />
        </div>

        <div id="map" aria-label="Map" role="application">
        </div>

        </ErrorHandle>
      </main>
    );
  }
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
