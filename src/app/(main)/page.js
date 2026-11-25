import Banner from "@/components/home/Banner";
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import Categories from "@/components/home/Categories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import RecentlyAdded from "@/components/home/RecentlyAdded";
import Reviews from "@/components/home/Reviews";
import OwnerCta from "@/components/home/OwnerCta";

export const metadata = { title: "Home" };


export default function HomePage() {
  return (
    <>
      <Banner />
      <FeaturedEquipment />
      <Categories />
      <WhyChooseUs />
      <HowItWorks />
      {/* <RecentlyAdded /> */}
      <Reviews />
      {/* <OwnerCta /> */}
    </>
  );
}
