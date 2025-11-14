const CityMenus: Record<string, {
  title: string;
  desc: string;
  places: string[];
  price: number;
  duration: string;
  image: string;
}> = {
  aurangabad: {
    title: "Aurangabad City Tour",
    desc:
      "Explore the historic city of Aurangabad, home to the world-famous Ajanta and Ellora Caves, ancient forts, Mughal architecture, and unique cultural heritage. A perfect blend of history, spirituality, and breathtaking craftsmanship.",
    places: [
      "Ellora Caves",
      "Ajanta Caves",
      "Bibi Ka Maqbara",
      "Daulatabad Fort",
      "Panchakki",
      "Aurangabad Caves",
      "Ghrishneshwar Temple",
      "Soneri Mahal"
    ],
    price: 1100,
    duration: "12hrs",
    image: "/city/aurangabad.png"
  },

  nagpur: {
    title: "Nagpur City Tour",
    desc:
      "Discover the Orange City, known for its historical monuments, serene lakes, spiritual landmarks, and beautiful green landscapes. Enjoy a peaceful yet enriching travel experience.",
    places: [
      "Deekshabhoomi",
      "Ambazari Lake",
      "Sitabuldi Fort",
      "Futala Lake",
      "Swaminarayan Temple",
      "Seminary Hills",
      "Khindsi Lake",
      "Narrow Gauge Rail Museum"
    ],
    price: 850,
    duration: "8hrs",
    image: "/city/nagpur.png"
  },

  mumbai: {
    title: "Mumbai City Tour",
    desc:
      "Welcome to the City of Dreams! Experience colonial architecture, popular beaches, famous film landmarks, divine temples, and vibrant street culture. Mumbai is a thrilling mix of history, glamour, and sea breeze.",
    places: [
      "Gateway of India",
      "Marine Drive",
      "Bandra-Worli Sea Link",
      "Juhu Beach",
      "Chhatrapati Shivaji Terminus",
      "Colaba Causeway",
      "Siddhivinayak Temple",
      "Haji Ali Dargah",
      "Film City"
    ],
    price: 1200,
    duration: "12hrs",
    image: "/city/mumbai.png"
  },

  nashik: {
    title: "Nashik City Tour",
    desc:
      "Explore India's Wine Capital and a deeply spiritual destination. Visit vineyards, waterfalls, ancient temples, archaeological sites, and scenic ghats along the Godavari River.",
    places: [
      "Sula Vineyards",
      "Panchavati",
      "Trimbakeshwar Temple",
      "Pandavleni Caves",
      "Godavari River Ghats",
      "Kalaram Temple",
      "Someshwar Waterfall",
      "Coin Museum"
    ],
    price: 900,
    duration: "10hrs",
    image: "/city/nashik.png"
  },

  pune: {
    title: "Pune City Tour",
    desc:
      "Explore the cultural heart of Maharashtra, full of ancient forts, iconic temples, buzzing food streets, and lush green viewpoints. Pune is a lively blend of youth energy and historic richness.",
    places: [
      "Shaniwar Wada",
      "Aga Khan Palace",
      "Sinhagad Fort",
      "Dagadusheth Halwai Ganapati Temple",
      "Parvati Hill",
      "Raja Dinkar Kelkar Museum",
      "Khadakwasla Dam",
      "Pataleshwar Cave Temple"
    ],
    price: 800,
    duration: "10hrs",
    image: "/city/pune.png"
  }
};

export function MyTours() {
  return (
    <div className="flex flex-col w-[80vw]">
      <p className="text-[8vw]">My Tours</p>

      <div className="flex overflow-x-auto gap-[3.5vw] mt-[5vw]">
        {Object.entries(CityMenus).map(([cityKey, city]) => (
          <div key={cityKey} className="relative w-[35vw] h-[35vw] min-w-[35vw]">
            <img src={city.image} className="w-full h-full object-cover rounded-xl" alt={city.title} />
            <p className="absolute inset-0 flex items-center justify-center text-white text-[5vw] font-semibold drop-shadow-lg">{cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}