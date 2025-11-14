const Monuments: Record<
  string,
  {
    name: string;
    image: string;
    desc: string;
    highlights: string[];
  }
> = {
  "shaniwar-wada": {
    name: "Shaniwar Wada",
    image: "/monuments/wada.png",
    desc:
      "Shaniwar Wada, built in 1732, served as the seat of the Peshwas of the Maratha Empire. The fortification witnessed major historical events and remains one of Pune’s most iconic landmarks.",
    highlights: [
      "Massive fortified walls",
      "Historical Peshwa architecture",
      "Light & sound show",
      "Beautiful garden area",
      "Main Delhi Darwaza gate"
    ]
  },

  "taj-mahal": {
    name: "Taj Mahal",
    image: "/monuments/taj-mahal.png",
    desc:
      "The Taj Mahal, built by Mughal emperor Shah Jahan in 1632, is a UNESCO World Heritage Site and one of the world’s most admired monuments, symbolizing eternal love.",
    highlights: [
      "White marble architecture",
      "Mausoleum of Mumtaz Mahal",
      "Reflective pools",
      "Persian & Mughal design",
      "UNESCO World Heritage Site"
    ]
  },

  "red-fort": {
    name: "Red Fort",
    image: "/monuments/red-fort.png",
    desc:
      "Red Fort, constructed in 1648 by Shah Jahan, served as the main residence of Mughal emperors. Its massive red sandstone walls and stunning palaces showcase Mughal grandeur.",
    highlights: [
      "Lahori Gate",
      "Diwan-i-Aam",
      "Diwan-i-Khas",
      "Sound & light show",
      "Mughal architecture"
    ]
  }
};

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function MonumentList() {
  return (
    <div className="flex flex-col w-[80vw]">
      <p className="text-[8vw]">Monuments</p>

      <div className="ml-[-5vw] mr-[-5vw] flex overflow-x-auto gap-[3.5vw] mt-[5vw]">
        {Object.entries(Monuments).map(([key, mon]) => (
          <div key={key} className="relative w-[35vw] min-w-[35vw]">
            <Drawer>
              <DrawerTrigger>
                <div className="w-[35vw] h-[35vw]">
                  <img
                    src={mon.image}
                    alt={mon.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <p className="flex justify-center mt-[2vw] text-[4vw] font-semibold">
                    {mon.name}
                  </p>
                </div>
              </DrawerTrigger>

              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>
                    <p className="text-[7vw] font-medium">{mon.name}</p>
                  </DrawerTitle>

                  <DrawerDescription>
                    <div className="flex flex-col mt-[5vw]">
                      <p className="text-[5vw]">Description</p>
                      <p
                        className="text-[4vw] leading-[5vw] m-[4vw] text-justify"
                        style={{ textAlign: "justify" }}
                      >
                        {mon.desc}
                      </p>
                    </div>
                  </DrawerDescription>
                </DrawerHeader>

                <p className="text-[5vw] text-white ml-[10vw] mt-[3vw]">Highlights</p>

                <div className="max-h-[40vh] overflow-y-auto px-[5vw] mt-[1vw] m-[4vw] pb-[4vw]">
                  <ul className="list-disc pl-[5vw] space-y-[2vw] text-[4vw]">
                    {mon.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <DrawerFooter>
                  <div className="flex justify-center gap-[3vw]">
                    <Button className="bg-green-500 text-white">Visit</Button>
                    <DrawerClose>
                      <Button variant="outline">Close</Button>
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
