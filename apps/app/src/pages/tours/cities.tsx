import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

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

import axios from "axios";

export async function handleCheckout(product: {
  name: string;
  image: string;
  price: number;
}) {
  try {
    const res = await axios.post(
      "http://192.168.1.60:5000/v3/api/payment/create-checkout-session",
      { product }
    );

    if (res.data?.url) {
      window.location.href = res.data.url;
    }
  } catch (err) {
    console.error("Checkout error:", err);
  }
}


export function Cities() {
  return (
    <div className="ml-[-5vw] mr-[-5vw] flex flex-col">
      <p className="text-[8vw]">City Tours</p>

      <div className="flex overflow-x-auto gap-[3.5vw] mt-[5vw]">
        {Object.entries(CityMenus).map(([cityKey, city]) => (
          <div key={cityKey} className="relative w-[35vw] h-[35vw] min-w-[35vw]">
           <Drawer>
            <DrawerTrigger>
              <div className="">
                <img src={city.image} className="w-full h-full object-cover rounded-xl" alt={city.title} />
                <p className="absolute inset-0 flex items-center justify-center text-white text-[5vw] font-semibold drop-shadow-lg">
                  {cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}
                </p>
              </div>
            </DrawerTrigger>

            <DrawerContent>
             <DrawerHeader>
              <DrawerTitle>
                <p className="text-[7vw] font-medium">{city.title}</p>
              </DrawerTitle>
              <div className="flex flex-col mt-[5vw]">
                <p className="text-[5vw] text-white">Description</p>
                <p className="text-[4vw] text-gray-400 leading-[5vw] m-[4vw] text-justify">
                  {city.desc}
                </p>
              </div>
            </DrawerHeader>
              <p className="text-[5vw] text-white ml-[10vw] m-[3vw]">Checkpoints</p>
              <div className="max-h-[40vh] overflow-y-auto px-[5vw] mt-[1vw] m-[4vw] pb-[4vw]">
                
                <ul className="list-disc text-gray-400 pl-[5vw] space-y-[2vw] text-[4vw]">
                  {city.places.map((place, idx) => (
                    <li key={idx}>{place}</li>
                  ))}
                </ul>
              </div>
              <DrawerFooter>
                <div className="flex justify-center gap-[3vw]">
                  <Button className="bg-green-500 text-white" onClick={() =>
                      handleCheckout({
                        name: city.title,
                        image: `https://www.kahaani.site${city.image}`,
                        price: city.price,
                        })}>Purchase</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

            
          </div>
        ))}
      </div>
    </div>
  );
}