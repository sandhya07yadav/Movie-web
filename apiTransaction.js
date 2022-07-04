const api_key="2a7ff2aa539ba2fc26f01f5441187fe4";
const img_url="https://image.tmdb.org/t/p/w500";
const url="https://api.themoviedb.org/3/search/movie?api_key=2a7ff2aa539ba2fc26f01f5441187fe4";

function generateUrl(path){
    const url=`https://api.themoviedb.org/3${path}?api_key=2a7ff2aa539ba2fc26f01f5441187fe4`;
    return url;
  }
  

  function requestMovies(url,oncomplete,onerror){
    fetch(url)
    .then(function(response){
     const resp=response.json();
      return resp;
    })
    .then(oncomplete)                                                                                     
    .catch(onerror);
  }


  function searchMovie(taken){
    const path="/search/movie";
    const url=generateUrl(path)+ "&query="+ taken;
   
    requestMovies(url,renderSearchMovies,handleError);
       
  }
    function getUpcomingMovies(){
      const path="/movie/upcoming";
      const url=generateUrl(path);
      const render =renderMovies.bind({title:"upcoming Movies"});
      requestMovies(url,render,handleError);
       
   }
  
   function getTopRatedMovies(){
     const path="/movie/top_rated";
     const url=generateUrl(path);
     const render =renderMovies.bind({title:"top rated Movies"});
    requestMovies(url,render,handleError);
  }
   function getPopularMovies(){
     const path="/movie/popular";
     const url=generateUrl(path);
     const render =renderMovies.bind({title:"popular Movies"});
     requestMovies(url,render,handleError);
       
   }




