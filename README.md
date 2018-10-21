# Neighborhood Map Project


# Table of Contents

* [Overview](#overview)
* [Specification](#specification)
* [How to run the project](#how-to-run-the-project)
* [Important](#important)
* [APIs Used](#apis-used)
* [Credits & Helpful Links](#credits-&-helpful-links)


## Overview


This is a single-page application built using React featuring a map of some of the Universities near central Hamburg.This project is the last project of the Udacity Front End Nanodegree. 
some of the functionality of the application includes: map markers to identify nearby University, a search function to easily filter these Universities, and a list view to support simple browsing of all the listed Universities.Foursquare's API was used to provide the names of the streets.


## Specification

The goal of this project was to build a single page map application using React & Google Maps API, plus to integrate a third-party data API and make the app accessible and usable offline.


## How to run the project

To run the project in the **development mode**, follow the instructions below: 

Download or clone the repository in your computer:

$ git clone https://github.com/dagbanbia/hamburgneibor.git


cd into the repository folder: 
* install project dependencies with 
```
npm install
npm install axios --save
npm install react-burger-menu --save
npm install escape-string-regexp --save
```
* start the development server with 
```
npm start
```
* open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<img src="images/hamburgUni.png" alt="">
 
```
npm run build
```
This command builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.


## Important

Please note that the **Service Worker** providing offline capabilities works only in the **production build**.

* The application works on all modern day browsers 


## APIs used

* Google Maps API for the map.
* Places API by FourSquare, for the info fetched upon clicking a marker.<br>
(https://developer.foursquare.com/docs/api/venues/explore).


## Credits & Helpful Links

* Udacity Lectures
*Stack over flow.
* The project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). For more information on how to perform common tasks, visit [this page](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
* [Udacity | Neighborhood Map - Project Explained](https://www.youtube.com/playlist?list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1) by Yahya Elharony.                                    
* For handling errors, [Error Boundaries](https://reactjs.org/docs/error-boundaries.html) and `catch(error)`. 

* [React Beginner Series](https://www.youtube.com/playlist?list=PLHrxuCR-0CcT7hgVVlh0lBWTqYkEEF55m) by simonswiss &
<br> - [React For Everyone](https://www.youtube.com/playlist?list=PLLnpHn493BHFfs3Uj5tvx17mXk4B4ws4p) by Level Up Tutorials.




