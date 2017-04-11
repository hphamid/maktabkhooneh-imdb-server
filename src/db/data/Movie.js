/**
 * Created by Mine on 6/9/2016.
 */
'use strict';
const Backtory = require("../../provider/LibsProvider").backtory();
var Movie = Backtory.Object.extend('Movie',{
    getId(){return this.get(Movie.Col.Id)},
    getName(){return this.get(Movie.Col.Name)},
    getReleaseDate(){return this.get(Movie.Col.ReleaseDate)},
    getPoster(){return this.get(Movie.Col.Poster)},
    getDirector(){return this.get(Movie.Col.Director)},
    getWriter(){return this.get(Movie.Col.Writer)},
    getProduction(){return this.get(Movie.Col.Production)},
    getActors(){return this.get(Movie.Col.Actors)},
    getGenre(){return this.get(Movie.Col.Genre)},
    getPlot(){return this.get(Movie.Col.Plot)},
    getRunTime(){return this.get(Movie.Col.Runtime)},
    getCountry(){return this.get(Movie.Col.Country)},
    getBoxOffice(){return this.get(Movie.Col.BoxOffice)},
    getTotalRateCount() {return this.get(Movie.Col.TotalRateCount)},
    getTotalStars() {return this.get(Movie.Col.TotalStars)},

    setId(value){this.set(Movie.Col.Id, value)},
    setName(value){this.set(Movie.Col.Name, value)},
    setReleaseDate(value){this.set(Movie.Col.ReleaseDate, value)},
    setPoster(value){this.set(Movie.Col.Poster, value)},
    setDirector(value){this.set(Movie.Col.Director, value)},
    setWriter(value){this.set(Movie.Col.Writer, value)},
    setProduction(value){this.set(Movie.Col.Production, value)},
    setActors(value){this.set(Movie.Col.Actors, value)},
    setGenre(value){this.set(Movie.Col.Genre, value)},
    setPlot(value){this.set(Movie.Col.Plot, value)},
    setRuntime(value){this.set(Movie.Col.Runtime, value)},
    setCountry(value){this.set(Movie.Col.Country, value)},
    setBoxOffice(value){this.set(Movie.Col.BoxOffice, value)},
    setTotalRateCount(value) {return this.set(Movie.Col.TotalRateCount, value)},
    setTotalStars(value) {return this.set(Movie.Col.TotalStars, value)}
},{
    get Name(){return 'Movie'},
});
Movie.Col = {
    get Id(){return '_id'},
    get Name(){return 'name'},
    get ReleaseDate(){return 'releaseDate'},
    get Poster(){return 'poster'},
    get Director(){return 'director'},
    get Writer(){return 'writer'},
    get Production(){return 'production'},
    get Actors(){return 'actors'},
    get Genre(){return 'genre'},
    get Plot(){return 'plot'},
    get Runtime() {return 'runtime'},
    get Country(){return 'country'},
    get BoxOffice(){return 'boxOffice'},
    get CreationDate(){return 'createdAt'},
    get TotalRateCount() {return 'totalRateCount'},
    get TotalStars() {return "totalStars"}
};

Backtory.Object.registerSubclass(Movie.Name, Movie);
module.exports = Movie;