import React, {useEffect, useState} from 'react'
import CardComponent from '../cardComponent/CardComponent'

function Home({movieData, setMovieData}) {


  useEffect(() => {
    const localStorageMovieData = localStorage.getItem('movieData') 
    if (localStorageMovieData){
      setMovieData(JSON.parse(localStorageMovieData))
    }
  }, [])

  return (
    <div className='container-fluid d-flex justify-content-center'>
      <div className='row col-md-12' style={{marginTop:"30px"}}>
        <div className='row col-md-12' style={{marginTop:"100px"}}>
          {movieData?.map(function(item, index){
            return (<div key={index} className="col-md-3">
              <CardComponent 
                title={item.name}
                image={item.url}
                description={item.description}
                cast={item.cast}
                similarMovie={item.similarMovie}
                geners={item.geners}
                language={item.language}
                rating={item.rating}
              />
            </div>)
          })
            
          }
          
        </div>
      </div>
    </div>
  )
}

export default Home