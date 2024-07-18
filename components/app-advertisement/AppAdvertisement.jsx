import "./app-advertisement.scss";
import appStoreWebp from "@/assets/app-store.png";
import playStoreWebp from "@/assets/play-store.png";
import mobileScreenShot from "@/assets/mobile-app-ss.png";
import Image from "next/image";

const AppAdvertisement = () => {
  return (
    <section className="app-advertisement-inner-area">
      <div className="store-links">
        <span>Real Estate on the Go</span>
        <h2>
          Real Estate at Your <span>Fingertips</span>
        </h2>
        <p>
          Simply sign into your albion mobile app account and look for the more
          updates.
        </p>
        <div>
          <a href="https://play.google.com/store/apps/details?id=com.albionNew&pcampaignid=web_share">
            <Image src={playStoreWebp} loading="lazy" alt="Play Store Webp" height={50} width={150}/>
          </a>
          <a href="https://apps.apple.com/us/app/albion-property-hub/id6476275094">
            <Image src={appStoreWebp} loading="lazy" alt="App Store Webp" height={50} width={150}/>
          </a>
        </div>
      </div>
      <Image
        src={mobileScreenShot}
        loading="lazy"
        alt="Mobile Screen Shot"
        className="app-ss"
      />
    </section>
  );
};

export default AppAdvertisement;
