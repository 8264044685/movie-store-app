import React from 'react';

function CardComponent({title, image, description, cast, similarMovie, geners, language, rating}) {
  return (
    <div key={title}>
    <div className='card text-center'>
      <div className='overflow-hide'>
        <img height={200} width={200} src={image} alt=''></img>
      </div>
      <div className='card-body text-dark'>
        <p className='card-text'>{title}</p>
        <p className='card-text'>description: {description}</p>
        <p className='card-text'>cast: {cast}</p>
        <p className='card-text'>rating: {rating}</p>
        <p className='card-text'>similarMovie: {similarMovie}</p>
        <p className='card-text'>geners: {geners}</p>
        <p className='card-text'>language: {language}</p>

        <p className='card-text text-secondary'>
        </p>        
      </div>
    </div>
   </div>
  );
}

export default CardComponent;