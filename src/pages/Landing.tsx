import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tv, Play, Star, Shield, Download, Zap, X, Clock, Calendar, Users } from 'lucide-react'

// Netflix-style trending algorithm - prioritizes recent releases, high engagement, and current popularity
const allTrendingContent = [
  // Current Netflix #1 Trending (TV Show)
  {
    id: "tv-119051",
    title: "Wednesday",
    poster: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    rating: "8.1",
    year: "2022",
    genre: "Comedy",
    duration: "1 Season",
    description: "Follows Wednesday Addams' years as a student at Nevermore Academy, where she attempts to master her emerging psychic ability.",
    mediaType: "tv"
  },
  // Recent blockbuster releases (Movies)
  {
    id: "movie-76600",
    title: "Avatar: The Way of Water",
    poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    rating: "7.6",
    year: "2022",
    genre: "Adventure",
    duration: "192 min",
    description: "Set more than a decade after the events of the first film, Avatar: The Way of Water tells the story of the Sully family and the trouble that follows them.",
    mediaType: "movie"
  },
  {
    id: "movie-361743",
    title: "Top Gun: Maverick",
    poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    rating: "8.3",
    year: "2022",
    genre: "Action",
    duration: "130 min",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, training a new generation of pilots for a specialized mission.",
    mediaType: "movie"
  },
  // Current Netflix trending series (TV Shows)
  {
    id: "tv-66732",
    title: "Stranger Things",
    poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    rating: "8.7",
    year: "2016-2022",
    genre: "Horror",
    duration: "4 Seasons",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    mediaType: "tv"
  },
  {
    id: "tv-71912",
    title: "The Witcher",
    poster: "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    rating: "8.2",
    year: "2019-2023",
    genre: "Fantasy",
    duration: "3 Seasons",
    description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    mediaType: "tv"
  },
  // Recent Marvel/DC hits (Movies)
  {
    id: "movie-505642",
    title: "Black Panther: Wakanda Forever",
    poster: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    rating: "7.3",
    year: "2022",
    genre: "Action",
    duration: "161 min",
    description: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers after King T'Challa's death.",
    mediaType: "movie"
  },
  {
    id: "movie-414906",
    title: "The Batman",
    poster: "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    rating: "7.8",
    year: "2022",
    genre: "Action",
    duration: "176 min",
    description: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    mediaType: "movie"
  },
  // Current trending international content (TV Shows)
  {
    id: "tv-93405",
    title: "Squid Game",
    poster: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    rating: "8.0",
    year: "2021",
    genre: "Thriller",
    duration: "1 Season",
    description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games for a tempting prize, but the stakes are deadly.",
    mediaType: "tv"
  },
  {
    id: "tv-71446",
    title: "Money Heist",
    poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    rating: "8.2",
    year: "2017-2021",
    genre: "Crime",
    duration: "5 Seasons",
    description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    mediaType: "tv"
  },
  // Recent sci-fi and fantasy hits
  {
    id: "tv-94997",
    title: "House of the Dragon",
    poster: "https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
    rating: "8.5",
    year: "2022",
    genre: "Fantasy",
    duration: "1 Season",
    description: "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. But civil war looms.",
    mediaType: "tv"
  },
  {
    id: "movie-438631",
    title: "Dune",
    poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    rating: "8.0",
    year: "2021",
    genre: "Sci-Fi",
    duration: "155 min",
    description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe.",
    mediaType: "movie"
  },
  // Current Disney+ trending (TV Show)
  {
    id: "tv-82856",
    title: "The Mandalorian",
    poster: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
    rating: "8.8",
    year: "2019-2023",
    genre: "Sci-Fi",
    duration: "3 Seasons",
    description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    mediaType: "tv"
  },
  // Recent horror/thriller trending (Movie)
  {
    id: "movie-646385",
    title: "Scream",
    poster: "https://image.tmdb.org/t/p/w500/1m3W6cpgwuIyjtg5nSnPx7yFkXW.jpg",
    rating: "6.3",
    year: "2022",
    genre: "Horror",
    duration: "114 min",
    description: "Twenty-five years after a streak of brutal murders shocked the quiet town of Woodsboro, a new killer has donned the Ghostface mask.",
    mediaType: "movie"
  },
  // Current drama trending (TV Show)
  {
    id: "tv-1399",
    title: "Game of Thrones",
    poster: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    rating: "9.2",
    year: "2011-2019",
    genre: "Fantasy",
    duration: "8 Seasons",
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    mediaType: "tv"
  },
  // Recent comedy trending (TV Show)
  {
    id: "tv-85552",
    title: "Euphoria",
    poster: "https://image.tmdb.org/t/p/w500/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg",
    rating: "8.4",
    year: "2019-2022",
    genre: "Drama",
    duration: "2 Seasons",
    description: "A group of high school students navigate love and friendships in a world of drugs, sex, trauma and social media.",
    mediaType: "tv"
  },
  // Recent action trending (Movie)
  {
    id: "movie-603692",
    title: "John Wick: Chapter 4",
    poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    rating: "7.8",
    year: "2023",
    genre: "Action",
    duration: "169 min",
    description: "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table.",
    mediaType: "movie"
  },
  // Current documentary trending (TV Show)
  {
    id: "tv-63174",
    title: "Lucifer",
    poster: "https://image.tmdb.org/t/p/w500/ekZobS8isE6mA53RAiGDG93hBxL.jpg",
    rating: "8.1",
    year: "2016-2021",
    genre: "Crime",
    duration: "6 Seasons",
    description: "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker.",
    mediaType: "tv"
  },
  // Recent international hit (Movie)
  {
    id: "movie-634649",
    title: "Spider-Man: No Way Home",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    rating: "8.2",
    year: "2021",
    genre: "Action",
    duration: "148 min",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    mediaType: "movie"
  }
]

const Landing: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<typeof allTrendingContent[0] | null>(null)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        
        {/* Subtle animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 p-6 lg:p-8 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="WeFlix" 
                className="h-12 lg:h-14 w-auto"
              />
            </div>
            <Link
              to="/login"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 text-sm lg:text-base shadow-lg shadow-red-600/20"
            >
              Sign In
            </Link>
          </div>
        </nav>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <span className="inline-block bg-red-600/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-full text-xs lg:text-sm font-medium backdrop-blur-sm">
              ✨ Now with 4K Ultra HD
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 lg:mb-8 leading-tight">
            <span className="block text-white drop-shadow-2xl">
              Unlimited Movies
            </span>
            <span className="block text-white drop-shadow-2xl">
              & TV Shows
            </span>
          </h1>
          <p className="text-lg lg:text-xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Watch anywhere, anytime. Discover thousands of movies and TV shows from every genre
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-full text-base lg:text-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center space-x-2 shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 transform"
            >
              <Play className="h-5 w-5 fill-current" />
              <span>Start Watching Free</span>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8 text-sm text-gray-300">
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>4.8/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="h-4 w-4 text-green-400" />
              <span>Ad-Free</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
              <Download className="h-4 w-4 text-blue-400" />
              <span>Offline Downloads</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 lg:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          {/* Trending Now Section */}
          <div className="px-4 lg:px-8 space-y-8 mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Trending Now
              </h2>
            </div>
            
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
              {allTrendingContent.slice(0, 10).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMovie(item)}
                  className="flex-none w-48 group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <div className="relative rounded-lg overflow-hidden bg-gray-900 border border-gray-800 group-hover:border-red-600/50 transition-all duration-300">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-72 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded-lg text-xs font-bold flex items-center">
                      <span className="mr-1">★</span>
                      <span>{item.rating}</span>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-300">
                        <span>{item.year}</span>
                        <span>•</span>
                        <span>{item.genre}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Why Choose WeFlix?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Experience entertainment like never before
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-red-600/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-red-600 to-red-700 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Tv className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Any Device</h3>
              <p className="text-gray-400 leading-relaxed">
                Stream seamlessly across all your devices
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-600/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Ad-Free</h3>
              <p className="text-gray-400 leading-relaxed">
                Enjoy uninterrupted viewing with zero ads
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-green-600/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-green-600 to-green-700 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Offline Mode</h3>
              <p className="text-gray-400 leading-relaxed">
                Download and watch anywhere
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-yellow-600/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">4K Quality</h3>
              <p className="text-gray-400 leading-relaxed">
                Crystal-clear 4K Ultra HD
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 flex-shrink-0">
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="w-full h-64 md:h-96 object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                />
              </div>
              <div className="flex-1 p-6 relative">
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="absolute top-4 right-4 bg-gray-800 rounded-full p-2 text-white hover:bg-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="pt-2">
                  <h2 className="text-white text-2xl font-bold mb-4">{selectedMovie.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{selectedMovie.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedMovie.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedMovie.duration}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-red-600/20 border border-red-500/50 text-red-400 px-3 py-1 rounded-full text-sm">
                      {selectedMovie.genre}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {selectedMovie.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/login"
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Play className="h-5 w-5" />
                      <span>Sign In to Watch</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Users className="h-5 w-5" />
                      <span>Join Free</span>
                    </Link>
                  </div>
                  <p className="text-center text-gray-500 text-sm mt-4">
                    Sign up for free to start watching instantly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo2.png" 
                alt="WeFlix" 
                className="h-10 w-10"
              />
              <span className="text-white font-bold text-xl">WeFlix</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm font-medium mb-1">
                Developed by <span className="text-white font-semibold">Phyo Min Thein</span>
              </p>
              <p className="text-gray-600 text-xs">
                © 2025 WeFlix. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing