/**
 * Created by Mine on 6/13/2016.
 */
'use strict';
const Movie = require("../data/Movie");
const Promisify = require("../../util/Promisify");
const Backtory = require("../../provider/LibsProvider").backtory();
const ErrorCodes = require("../../util/ErrorCodes");
const fs = require("fs");

/**
 * @Repository()
 */
module.exports = {};


module.exports.getMovies = function (skip, limit) {
    let query = new Backtory.Query(Movie);
    query.descending(Movie.Col.CreationDate);
    query.skip(skip);
    query.limit(limit);
    return Promisify.wrapWithThis(query.find, query);
};

module.exports.getMovieById = function(movieId){
    let query = new Backtory.Query(Movie);
    query.equalTo(Movie.Col.Id, movieId);
    query.limit(1);
    return Promisify.wrapWithThis(query.find, query).then(function(results){
        if(!results || results.length <= 0){
            throw ErrorCodes.make(ErrorCodes.NOT_FOUND, "movie not found!");
        }
        return results[0];
    })
};

module.exports.getMoviesByListOfId = function(movieIds){
    let query = new Backtory.Query(Movie);
    query.containedIn(Movie.Col.Id, movieIds);
    return Promisify.wrapWithThis(query.find, query);
};

module.exports.updateMovieRating = function(movie, starInc, countInc){
        let updatedMovie = new Movie();
        updatedMovie.setId(movie.getId());
        let toSave = false;
        if(starInc){
            toSave = true;
            updatedMovie.increment(Movie.Col.TotalStars, starInc);
        }
        if (countInc) {
            toSave = true;
            updatedMovie.increment(Movie.Col.TotalRateCount, countInc);
        }
        if (toSave) {
            return Promisify.wrapWithThis(updatedMovie.save, updatedMovie);
        }
        return movie;
};


module.exports.saveMovie = saveMovie;
function saveMovie(name, releaseDate, poster, director, writer, production, actors, genre, plot, runtime, country, boxOffice) {
    let toSave = new Movie();
    toSave.setName(name);
    toSave.setReleaseDate(releaseDate);
    toSave.setPoster(poster);
    toSave.setDirector(director);
    toSave.setWriter(writer);
    toSave.setProduction(production);
    toSave.setActors(actors);
    toSave.setGenre(genre);
    toSave.setPlot(plot);
    toSave.setRuntime(runtime);
    toSave.setCountry(country);
    toSave.setBoxOffice(boxOffice);
    toSave.setTotalRateCount(0);
    toSave.setTotalStars(0);
    return Promisify.wrapWithThis(toSave.save, toSave);
}

/**
 * @AutoWired()
 */
module.exports.addAllMoviesToDbIfNeeded = function (UserFavoriteRepo, UserRatingRepo) {
  let query = new Backtory.Query(Movie);
  query.limit(1);
  return Promisify.wrapWithThis(query.find, query).then(function(result){
      if(!result || result.length <= 0){
          return addAllMoviesToDb().then(function(list){
              return UserFavoriteRepo.createTestField(list[0]).then(function(){
                  return list;
              });
          }).then(function (list) {
              return UserRatingRepo.createTestField(list[0]);
          });
      }
      return false;
  })
};

const Path = require("path");
module.exports.addAllMoviesToDb = addAllMoviesToDb;
function addAllMoviesToDb() {
    console.log("adding movies to db");
    return new Promise(function (resolve, reject) {
        fs.readFile(Path.resolve(__dirname, "../../movies.json"), function (err, data) {
            if (err) {
                reject(err);
            } else {
                let promises = [];
                let list = JSON.parse(data);
                Object.keys(list).forEach(function (key) {
                    let item = list[key];
                    let actors = [];
                    if (item["Actors"]) {
                        actors = item["Actors"].split(", ").slice(0, 3);
                    }

                    promises.push(saveMovie(item["Title"], item["Released"], item["Poster"], item["Director"],
                        item["Writer"], item["Production"], actors, item["Genre"], item["Plot"], item["Runtime"],
                        item["Country"], item["BoxOffice"]))
                });
                Promise.all(promises).then(function (list) {
                    resolve(list);
                });
            }
        });
    });
}

