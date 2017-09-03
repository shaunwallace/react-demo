'use strict';

module.exports = Movie => {

  Movie.titles = (orderedBy = 'movieId', cb) => {

    Movie.find({
      order: orderedBy
    }, (err, titles) => {

      if (!err) {
        let filtered = {};
        let results = [];

        titles.forEach(title => {
          const key = title[orderedBy];
          if (!filtered[key]) {
            filtered[key] = true;
            results.push(title)
          }
        });
  
        cb(null, results);
      }
    }); 
  }

  Movie.remoteMethod('titles', {
    http: {
      path: '/titles',
      verb: 'get'
    },
    accepts: {
      arg: 'orderedBy',
      type: 'string'
    },
    returns: {
      arg: 'titles',
      type: 'array'
    }
  })
};
