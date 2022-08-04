import React from 'react'
import Button from 'react-bootstrap/Button';
// import input from 'react-bootstrap/Inpu';
import {genersList, languageList, ratingList} from '../../Constants'
import Select from 'react-select'
import { validation } from './validation';

function AddMovie() {
    const defaultState = {
        name:"",
        description:"",
        cast:"",
        similarMovie:"",
        geners:"",
        language:"",
        rating:"",
        url:""
    }
    const [formData, setFormData] = React.useState(defaultState)

    const [movieData, setMovieData] = React.useState([])
    const [save, setSave] = React.useState(false)

    const [error, seterror] = React.useState({}); 

    const handleChange = async(value, inputName)=>{
        const data = {...formData}
        if(inputName === "geners"){
            
            data[inputName] = value['value']

        }else if(inputName === "language"){
            
            data[inputName] = value["value"]

        }else if(inputName === "rating"){

            data[inputName] = value["value"]

        }else{
            data[inputName] = value
        }
        
        const { error, isValid } =await validation(data)
        if (!isValid) {
            await seterror(error);
        } else if (isValid) {
            await seterror({});
        }
        setFormData(data)
    }


    
    const handleClick =async()=>{

        const { error, isValid } =await validation(formData)
        console.log(`error ${JSON.stringify(error)}`)
        if (!isValid) {
            await seterror(error);
        } else if (isValid) {
            await seterror({});
        }
        movieData.push(formData)
        const localstoregeMovieData = localStorage.getItem("movieData")
        if (localstoregeMovieData){
            const ParseData = JSON.parse(localstoregeMovieData)
            ParseData.push(formData)
            localStorage.setItem("movieData", JSON.stringify(ParseData))
        }else{
          localStorage.setItem("movieData", JSON.stringify(movieData))
        }
        
        setSave(true)
        const formStaticData = {
          name:"",
          description:"",
          cast:"",
          similarMovie:"",
          geners:"",
          language:"",
          rating:"",
          url:""
        }
        setFormData(formStaticData)
        setTimeout(() => {
            setSave(false)            
        }, 2000);
    }   
    
  return (

    <div className='container' style={{marginTop:"10px"}}>
        <h4>{save?<span style={{color:"green"}}>movie data save successfully</span>:""}</h4>
        <h3>Enter movie details</h3>
        <div className="mb-3">
          <label>Movie Name</label>
          <input
            value={formData?formData.name?formData.name:"":""}
            type="text"
            className="form-control"
            placeholder="Enter movie name"
            onChange={(e)=>handleChange(e.currentTarget.value, "name")}
          />
          <span style={{color:"red"}}>{error?.name}</span>
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            value={formData?formData.description?formData.description:"":""}
            type="textarea"
            className="form-control"
            placeholder="Enter movie Description"
            onChange={(e)=>handleChange(e.currentTarget.value, "description")}
          />
          <span style={{color:"red"}}>{error?.description}</span>
        </div>
        <div className="mb-3">
          <label>cast</label>
          <input
            type="text"
            value={formData?formData.cast?formData.cast:"":""}
            className="form-control"
            placeholder="Enter cast details"
            onChange={(e)=>handleChange(e.currentTarget.value, "cast")}
          />
          <span style={{color:"red"}}>{error?.cast}</span>
        </div>

        <div className="mb-3">
          <label>movie image url</label>
          <input
            type="text"
            value={formData?formData.url?formData.url:"":""}
            className="form-control"
            placeholder="Enter cast details"
            onChange={(e)=>handleChange(e.currentTarget.value, "url")}
          />
          <span style={{color:"red"}}>{error?.url}</span>
        </div>

        <div className="mb-3">
          <label>Similar Movie</label>
          <input
            type="text"
            className="form-control"
            value={formData?formData.similarMovie?formData.similarMovie:"":""}
            placeholder="Enter similar movie"
            onChange={(e)=>handleChange(e.currentTarget.value, "similarMovie")}
          />
          <span style={{color:"red"}}>{error?.similarMovie}</span>
        </div>

        <div className="mb-3">
          <label>Geners</label>
          <Select 
          defaultValue={formData?formData.geners?formData.geners:"":""}
          options={genersList}
          onChange={(e)=>handleChange(e, "geners")}
          />
          <span style={{color:"red"}}>{error?.geners}</span>
        </div>
        <div className="mb-3">
          <label>Language</label>
          <Select 
            defaultValue={formData?formData.language:null}
            options={languageList}
            onChange={(e)=>handleChange(e, "language")}
          />
          <span style={{color:"red"}}>{error?.language}</span>
        </div>

        <div className="mb-3">
          <label>Rating</label>
          <Select 
          options={ratingList}
          onChange={(e)=>handleChange(e, "rating")}
          />
          <span style={{color:"red"}}>{error?.rating}</span>
        </div>

        <div className="d-grid">
          <Button 
          type="submit" 
          className="btn btn-primary"
          onClick={handleClick}
          >
            Submit
          </Button>
        </div>
        
    
    </div>
  )
}

export default AddMovie
