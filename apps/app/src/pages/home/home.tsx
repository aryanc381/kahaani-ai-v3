import Dock from "@/components/dock";
import Map from "@/components/map/map";
import { Searchbar } from "@/components/search-home";
function Home() {
  return (
    <div className="m-[-5vw]">
        <Map />
        <Dock />
        <Searchbar />
    </div>
  )
}




export default Home;