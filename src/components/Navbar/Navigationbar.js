import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch , Link, } from 'react-router-dom'
import Home from '../Home/Home'
import Button from 'react-bootstrap/Button';
import Select from 'react-select'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AddMovie from '../AddMovie/AddMovie';
import { languageList } from '../../Constants';
function Navigationbar() {


  const [movieData, setMovieData] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [language, setLanguage] = useState("")
  useEffect(() => {
    const localStorageMovieData = localStorage.getItem('movieData') 
    if (localStorageMovieData){
      setMovieData(JSON.parse(localStorageMovieData))
    }
  }, [])

  const hadleClick=async()=>{
    const searchMovieData =await filterByName(movieData, searchValue)
    setMovieData(searchMovieData)
  }

  const filterByName =async (movieData, searchValue) =>{
    var movieSearch = []
    const localStorageMovieData = await JSON.parse(localStorage.getItem('movieData'))
    movieSearch = await localStorageMovieData.filter(movie => movie.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
    const movieSearchWithGeners = await localStorageMovieData.filter(movie => movie.geners.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
    if (movieSearchWithGeners.length > 0){
      movieSearch = movieSearchWithGeners
    }
    return movieSearch
  }
 
  const handleChange=(value)=>{
    setSearchValue(value)
    
  }

  const handleSelectChange=async(e)=>{
    setLanguage(e['value'])
    
    const searchValue = e['value'].toLowerCase()
    var movieSearch = []
    const localStorageMovieData = await JSON.parse(localStorage.getItem('movieData'))
    movieSearch = await localStorageMovieData.filter(movie => movie.language.toLowerCase().indexOf(searchValue) > -1);
    setMovieData(movieSearch)
  }

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
          <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <span className='mr-10' style={{marginRight:"20px"}}>
                <Link to="/">Home</Link>
              </span>
              <span className='ml-10'>
                <Link to="/add-movies">Add Movie</Link>
              </span>
            </Nav>

            
            <div style={{width:"500px"}}>
              <input
                type="text"
                placeholder='Search By Geners and name'
                onChange={(e)=>handleChange(e.currentTarget.value)}
              />
              <Button
              onClick={hadleClick}
              >
                Search
              </Button>
            </div>
            <div style={{width:"260px"}}>
            <Select 
              defaultValue={language}
              options={languageList}
              onChange={(e)=>handleSelectChange(e, "language")}
            />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Switch>
          <Route exact path="/">
            <Home movieData={movieData} setMovieData={setMovieData}/>
          </Route>
          <Route exact path="/add-movies">
            <AddMovie />
          </Route>
      </Switch>
    </Router>
  )
}

export default Navigationbar