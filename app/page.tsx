// app/page.tsx


import HeroHeader from "./Components/Header";
import ChipPortfolio from "./Components/chip";
import What from "./Components/What";
import Ved from "./Components/ved";

export default function HomePage() {
  return (
    <main> 
      <HeroHeader />
      <ChipPortfolio />
      <What />
      <Ved />
    </main>
  );
}
