const apiURL = "http://localhost:8888/api/movies?_format=json";

new Vue({
    el: '#app',

    data: {
        movies: {},
        liveFilter: '',
        genreFilter: '',
        genres: []
    },
    ready: function(){
        this.getMovies();
    },
    methods: {
        getMovies: function() {
            this.$http.get(apiURL).then(response => {
                console.log(response.body)
                const movies = response.body;
                this.$set('movies', movies);

                let genresArr=[];

                movies.forEach(movie => {
                    movie.field_genre.forEach(genre => {
                        genresArr.push(genre.value)
                    });
                });
                genresArr = [...new Set(genresArr)];
                this.$set('genres', genresArr);

              }, response => {
                  console.log('something went wrong')
              });
        }
    }
})