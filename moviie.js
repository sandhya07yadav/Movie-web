
const buttonElement=document.querySelector("#search");
const inputElement=document.querySelector("#inputvalue");
const movieSearchable=document.querySelector("#movie-searchable");
const movieContainer=document.querySelector("#movie-container");



function movieSection(movies){
  return movies.map((movie)=>{
    if(movie.poster_path){ 
    return `<img 
         src=${img_url + movie.poster_path}
         data-movie-id=${movie.id}/>`;
    }
  })
}
function createMovieContainer(movies,title=''){
  const movieElement=document.createElement('div');
  movieElement.setAttribute("class","movie");

  const movieTemplate=`
   <h2>${title}</h2>
         <section class="section">
           ${movieSection(movies)}                 
         </section>
         <div class="content">
           <p id="content-close">X</p>
         </div>
         
         `;
         movieElement.innerHTML=movieTemplate;
         return movieElement;
  }
  
  function renderSearchMovies(data){
    movieSearchable.innerHTML='';
    const movies=data.results;//ye  jo result h wo jo data fetch kiya husme tha usime sarri mmovies present thi
    const movieBlock= createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    // console.log(data);  
  }
  

  function renderMovies(data){
    const movies=data.results;//ye  jo result h wo jo data fetch kiya husme tha usime sarri mmovies present thi
     const movieBlock= createMovieContainer(movies,this.title);
    movieContainer.appendChild(movieBlock);
     //console.log(data);
  }

function handleError(error){
   console.log('error:',error);
}
   

buttonElement.onclick=function(event){
     event.preventDefault();// y abb  apne appp se refresh nhi hone dega
   //  console.log("clicked");// abhi sirf itna krne p appear hoke httt jata jaldi aesa kyu hora   kuki y click krne p refresh hora page
   const value =inputElement.value;
    // console.log("Value:",value);
    searchMovie(value); 
    inputElement.value='';
     console.log("value:",value);
  }
 
     function createIFrame(video){
      const iframe =document.createElement("iframe");
       iframe.src=`https://www.youtube.com/embed/${video.key}`;
       iframe.width=360;
       iframe.height=315;
       iframe.allowFullscreen=true;
       return iframe;
     }
    
     //             jo dikhana h ,jisme dikhana h
     function createVideoTemplate(data,content){
      content.innerHTML='<p id="content-close">X</p>';
      console.log("hey bhaiu",data);
       const videos=data.results;
       const length=videos.length > 4 ? 4 : videos.length;// 4 return hoganhi to km h to jitne h wo
      // console.log(length);
      const iframeContainer=document.createElement('div');
      
       for(let i=0;i<length;i++){
          const video=videos[i];//video
          const iframe=createIFrame(video);
         iframeContainer.appendChild(iframe);
         content.appendChild(iframeContainer);
            
      }
     }
document.onclick=function(event){
  const target =event.target;
    if(target.tagName.toLowerCase()==="img"){// to lowercase isliye kiya kuki y defa; captilise hajta
        console.log('hello');
      const movieid=target.dataset.movieId;
       console.log(movieid);
      const section = event.target.parentElement;//section
      const content = section.nextElementSibling;//content
      content.classList.add('content-display');

      const path =`/movie/${movieid}/videos`;
      // fetch movie video here 
      fetch(generateUrl(path))
      .then(function(response){
        const resp =response.json();
        return resp;
      })
      .then(function(data){createVideoTemplate(data,content)})
      .catch(function(error){
        console.log(error);
      });
    }
   if(target.id==="content-close"){ 
     const content=target.parentElement;
     content.classList.remove("content-display");
   }
}
 
getUpcomingMovies();
getTopRatedMovies();
getPopularMovies();