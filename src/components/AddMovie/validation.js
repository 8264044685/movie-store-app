import validator from "validator";
export const validation = (form)=>{
    
    const error = {}
    console.log(JSON.stringify(form))
    console.log(form.name)

    if (validator.isEmpty(form.name)){
      error.name = "Please enter valid name"
    }
    if (validator.isEmpty(form.description)){
        error.description = "Please enter descrition of the movie"
    }
    if (validator.isEmpty(form.cast)){
        error.cast = "Please enter cast of the movie"
    }
    if (validator.isEmpty(form.similarMovie)){
        error.similarMovie = "Please enter similar movie"
    }
    if (validator.isEmpty(form.geners)){
        error.geners = "Please enter geners of movie"
    }

    if (validator.isEmpty(form.language)){
        error.language = "Please enter language od movie"
    }
    if (validator.isEmpty(form.rating)){
        error.rating = "Please enter rating of movie"
    }

    if (validator.isEmpty(form.url)){
      error.url = "Please enter image url of movie"
    }
    return {error, isValid: Object.keys(error).length <= 0 }
  }
