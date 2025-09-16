use movieDB

// Users
db.users.insertMany([
  { _id: 1, name: "Rahul Sharma", email: "rahul@example.com", city: "Bangalore", plan: "Premium" },
  { _id: 2, name: "Priya Singh", email: "priya@example.com", city: "Delhi", plan: "Basic" },
  { _id: 3, name: "Aman Kumar", email: "aman@example.com", city: "Hyderabad", plan: "Standard" }
]);

// Movies
db.movies.insertMany([
  { _id: 101, title: "Inception", genre: "Sci-Fi", year: 2010, rating: 8.8 },
  { _id: 102, title: "3 Idiots", genre: "Comedy", year: 2009, rating: 8.4 },
  { _id: 103, title: "Bahubali", genre: "Action", year: 2015, rating: 8.1 },
  { _id: 104, title: "The Dark Knight", genre: "Action", year: 2008, rating: 9.0 },
  { _id: 105, title: "Dangal", genre: "Drama", year: 2016, rating: 8.5 }
]);

// Subscriptions
db.subscriptions.insertMany([
  { user_id: 1, start_date: ISODate("2025-01-01"), end_date: ISODate("2025-12-31"), amount: 999 },
  { user_id: 2, start_date: ISODate("2025-02-01"), end_date: ISODate("2025-07-31"), amount: 499 },
  { user_id: 3, start_date: ISODate("2025-01-15"), end_date: ISODate("2025-10-15"), amount: 799 }
]);

// Watch History
db.watchHistory.insertMany([
  { user_id: 1, movie_id: 101, watch_date: ISODate("2025-02-10") },
  { user_id: 1, movie_id: 102, watch_date: ISODate("2025-02-12") },
  { user_id: 2, movie_id: 103, watch_date: ISODate("2025-02-11") },
  { user_id: 3, movie_id: 104, watch_date: ISODate("2025-02-13") },
  { user_id: 3, movie_id: 105, watch_date: ISODate("2025-02-14") }
]);

db.users.insertOne({
  name: "New User",
  email:"newuser@example.com",
  city: "Mumbai",
  plan: "Standard"
});
{
  acknowledged: true,
  insertedId: ObjectId('68c96c75be6a31a83c87ebed')
}
db.movies.updateOne(
  {title: "Bahubali"},
  {$set: {rating: 8.3}}
);
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.movies.deleteOne({ title: "3 Idiots"});
{
  acknowledged: true,
  deletedCount: 1
}
db.users.find({plan: "Premium"});
{
  _id: 1,
  name: 'Rahul Sharma',
  email: 'rahul@example.com',
  city: 'Bangalore',
  plan: 'Premium'
}
db.users.createIndex({email: 1},{unique: true});
email_1
db.movies.createIndex({ genre: 1,rating: -1});
genre_1_rating_-1
db.movies.getIndexes();
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { genre: 1, rating: -1 }, name: 'genre_1_rating_-1' }
]
db.users.getIndexes();
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { email: 1 }, name: 'email_1', unique: true }
]
db.movies.find({genre: "Action"}).sort({rating: -1});
{
  _id: 104,
  title: 'The Dark Knight',
  genre: 'Action',
  year: 2008,
  rating: 9
}
{
  _id: 103,
  title: 'Bahubali',
  genre: 'Action',
  year: 2015,
  rating: 8.3
}
db.movies.find({genre: {$exists: true}}).hint({$natural:1});
{
  _id: 101,
  title: 'Inception',
  genre: 'Sci-Fi',
  year: 2010,
  rating: 8.8
}
{
  _id: 103,
  title: 'Bahubali',
  genre: 'Action',
  year: 2015,
  rating: 8.3
}
{
  _id: 104,
  title: 'The Dark Knight',
  genre: 'Action',
  year: 2008,
  rating: 9
}
{
  _id: 105,
  title: 'Dangal',
  genre: 'Drama',
  year: 2016,
  rating: 8.5
}
db.movies.aggregate([
  {group: {_id:"$genre", count: {$sum: 1}}}
]);
MongoServerError[Location40324]: Unrecognized pipeline stage name: 'group'
db.movies.aggregate([
  {$group: {_id:"$genre", count: {$sum: 1}}}
]);
{
  _id: 'Sci-Fi',
  count: 1
}
{
  _id: 'Action',
  count: 2
}
{
  _id: 'Drama',
  count: 1
}
db.movies.find().sort({ rating: -1 }).limit(2);
{
  _id: 104,
  title: 'The Dark Knight',
  genre: 'Action',
  year: 2008,
  rating: 9
}
{
  _id: 101,
  title: 'Inception',
  genre: 'Sci-Fi',
  year: 2010,
  rating: 8.8
}
db.users.aggregate([
  {
    $lookup: {
      from: "subscriptions",
      localField: "_id",
      foreignField: "user_id",
      as: "subs"
    }
  },
  { $unwind: "$subs" },
  {
    $group: {
      _id: "$plan",
      avgAmount: { $avg: "$subs.amount" }
    }
  }
]);
{
  _id: 'Premium',
  avgAmount: 999
}
{
  _id: 'Standard',
  avgAmount: 799
}
{
  _id: 'Basic',
  avgAmount: 499
}
db.watchHistory.aggregate([
  { $group: { _id: "$movie_id", totalWatch: { $sum: 1 } } }
]);
{
  _id: 101,
  totalWatch: 1
}
{
  _id: 102,
  totalWatch: 1
}
{
  _id: 103,
  totalWatch: 1
}
{
  _id: 104,
  totalWatch: 1
}
{
  _id: 105,
  totalWatch: 1
}
db.users.aggregate([
  { $match: { plan: "Premium" } },
  { $group: { _id: "$city", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);
{
  _id: 'Bangalore',
  count: 1
}
db.watchHistory.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "_id",
      as: "movie"
    }
  },
  { $unwind: "$movie" },
  { $group: { _id: "$movie.genre", watchCount: { $sum: 1 } } },
  { $sort: { watchCount: -1 } },
  { $limit: 1 }
]);
{
  _id: 'Action',
  watchCount: 2
}
db.watchHistory.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "_id",
      as: "movie"
    }
  },
  { $unwind: "$movie" },
  {
    $project: {
      _id: 0,
      userName: "$user.name",
      movieTitle: "$movie.title",
      watch_date: 1
    }
  }
]);
{
  watch_date: 2025-02-10T00:00:00.000Z,
  userName: 'Rahul Sharma',
  movieTitle: 'Inception'
}
{
  watch_date: 2025-02-11T00:00:00.000Z,
  userName: 'Priya Singh',
  movieTitle: 'Bahubali'
}
{
  watch_date: 2025-02-13T00:00:00.000Z,
  userName: 'Aman Kumar',
  movieTitle: 'The Dark Knight'
}
{
  watch_date: 2025-02-14T00:00:00.000Z,
  userName: 'Aman Kumar',
  movieTitle: 'Dangal'
}
db.watchHistory.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  { $match: { "user.name": "Rahul Sharma" } },
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "_id",
      as: "movie"
    }
  },
  { $unwind: "$movie" },
  { $project: { _id: 0, "movie.title": 1 } }
]);
{
  movie: {
    title: 'Inception'
  }
}
db.users.aggregate([
  {
    $lookup: {
      from: "subscriptions",
      localField: "_id",
      foreignField: "user_id",
      as: "subs"
    }
  }
]);
{
  _id: 1,
  name: 'Rahul Sharma',
  email: 'rahul@example.com',
  city: 'Bangalore',
  plan: 'Premium',
  subs: [
    {
      _id: ObjectId('68c96bc1be6a31a83c87ebe5'),
      user_id: 1,
      start_date: 2025-01-01T00:00:00.000Z,
      end_date: 2025-12-31T00:00:00.000Z,
      amount: 999
    }
  ]
}
{
  _id: 2,
  name: 'Priya Singh',
  email: 'priya@example.com',
  city: 'Delhi',
  plan: 'Basic',
  subs: [
    {
      _id: ObjectId('68c96bc1be6a31a83c87ebe6'),
      user_id: 2,
      start_date: 2025-02-01T00:00:00.000Z,
      end_date: 2025-07-31T00:00:00.000Z,
      amount: 499
    }
  ]
}
{
  _id: 3,
  name: 'Aman Kumar',
  email: 'aman@example.com',
  city: 'Hyderabad',
  plan: 'Standard',
  subs: [
    {
      _id: ObjectId('68c96bc1be6a31a83c87ebe7'),
      user_id: 3,
      start_date: 2025-01-15T00:00:00.000Z,
      end_date: 2025-10-15T00:00:00.000Z,
      amount: 799
    }
  ]
}
{
  _id: ObjectId('68c96c75be6a31a83c87ebed'),
  name: 'New User',
  email: 'newuser@example.com',
  city: 'Mumbai',
  plan: 'Standard',
  subs: []
}
db.watchHistory.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "_id",
      as: "movie"
    }
  },
  { $unwind: "$movie" },
  { $match: { "movie.year": { $gt: 2010 } } },
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  { $project: { _id: 0, "user.name": 1, "movie.title": 1 } }
]);
{
  movie: {
    title: 'Bahubali'
  },
  user: {
    name: 'Priya Singh'
  }
}
{
  movie: {
    title: 'Dangal'
  },
  user: {
    name: 'Aman Kumar'
  }
}
db.watchHistory.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $group: {
      _id: "$movie_id",
      users: { $addToSet: "$user.name" }
    }
  }
]);
{
  _id: 103,
  users: [
    'Priya Singh'
  ]
}
{
  _id: 105,
  users: [
    'Aman Kumar'
  ]
}
{
  _id: 104,
  users: [
    'Aman Kumar'
  ]
}
{
  _id: 102,
  users: [
    'Rahul Sharma'
  ]
}
{
  _id: 101,
  users: [
    'Rahul Sharma'
  ]
}
db.watchHistory.aggregate([
  { $group: { _id: "$user_id", movieCount: { $sum: 1 } } },
  { $match: { movieCount: { $gt: 2 } } }
]);
db.subscriptions.aggregate([
  { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
]);
{
  _id: null,
  totalRevenue: 2297
}
db.subscriptions.aggregate([
  {
    $match: {
      end_date: {
        $lte: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
      }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  { $project: { _id: 0, "user.name": 1, end_date: 1 } }
]);
{
  end_date: 2025-07-31T00:00:00.000Z,
  user: {
    name: 'Priya Singh'
  }
}
{
  end_date: 2025-10-15T00:00:00.000Z,
  user: {
    name: 'Aman Kumar'
  }
}
db.watchHistory.aggregate([
  { $group: { _id: "$movie_id", watchCount: { $sum: 1 } } },
  { $sort: { watchCount: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "movies",
      localField: "_id",
      foreignField: "_id",
      as: "movie"
    }
  },
  { $unwind: "$movie" },
  { $project: { "movie.title": 1, watchCount: 1 } }
]);
{
  _id: 101,
  watchCount: 1,
  movie: {
    title: 'Inception'
  }
}
db.watchHistory.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "_id",
      as: "movie"
    }
  },
  { $unwind: "$movie" },
  { $group: { _id: "$movie.genre", watchCount: { $sum: 1 } } },
  { $sort: { watchCount: 1 } },
  { $limit: 1 }
]);
