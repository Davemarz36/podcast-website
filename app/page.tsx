import { ConversationPillars } from "./components/ConversationPillars";
import { FeaturedConversation } from "./components/FeaturedConversation";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { MissionVision } from "./components/MissionVision";
import { Navigation } from "./components/Navigation";
import { PreLaunchCTA } from "./components/PreLaunchCTA";
import { WhyWeExist } from "./components/WhyWeExist";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <MissionVision />
        <WhyWeExist />
        <FeaturedConversation />
        <ConversationPillars />
        <PreLaunchCTA />
      </main>
      <Footer />
    </>
  );
}
