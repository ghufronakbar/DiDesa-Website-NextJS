import Footer from "@/components/Footer";
import NavbarLanding from "@/components/NavbarLanding";
import BeritaSection from "@/sections/BeritaSection";
import BerandaSection from "@/sections/BerandaSection";
import PemilihanSection from "@/sections/PemilihanSection";
import PengaduanSection from "@/sections/PengaduanSection";
import UMKMSection from "@/sections/UMKMSection";

const DiDesa = () => {
  return (
    <>
      <main>
        <NavbarLanding />
        <BerandaSection />
        <BeritaSection />
        <UMKMSection />
        <PengaduanSection />
        <PemilihanSection />
        <Footer />
      </main>
    </>
  );
};

export default DiDesa;
