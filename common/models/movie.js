module.exports = Movie => {
  
  Movie.withThumbnails = (order = 'movieId', cb) => {
    
    Movie.find({ order, include: 'versions' }, (err, movies) => {

      if (!err) {
        let results = movies.map(movie => {
          const { movieId, movieName, thumbnailUrl, versions } = movie.toJSON();
          return {
            movieId,
            movieName,
            thumbnailUrl: versions[0].thumbnailUrl,
            versions: versions.length
          }
        });
  
        cb(null, results);
      }
    });
  }

  Movie.remoteMethod('withThumbnails', {
    http: {
      path: '/withThumbnails',
      verb: 'get'
    },
    accepts: {
      arg: 'order',
      type: 'string'
    },
    returns: {
      arg: 'movies',
      type: 'array'
    }
  });
};