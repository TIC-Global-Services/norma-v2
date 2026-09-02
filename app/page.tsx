import Hero from "@/components/Hero";
import Oneplatform from "@/components/Oneplatform";
import SmartScheduling from "@/components/smartScheduling";
import NormaDifferent from "@/components/normaDifferent";
import NormaEcoSystem from "@/components/normaEcoSystem";
import UpdateAfterBooking from "@/components/UpdateAfterBooking";
import ProcessedAutomatically from "@/components/processedAutomaticaly";
import GulfClinic from "@/components/gulfClinic";
import WhoBuiltIt from "@/components/whoBuildit";
import WhatsNext from "@/components/whatsNext";
import Footer from "@/reuseable/Footer";
import GrassScene from "@/components/grass/GrassScene";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <GrassScene />
      <Oneplatform />
      <NormaEcoSystem />
      <SmartScheduling />
      <NormaDifferent />
      <UpdateAfterBooking />
      <ProcessedAutomatically />
      <GulfClinic />
      <WhoBuiltIt />
      <WhatsNext />
      
    </main>
  );
}




