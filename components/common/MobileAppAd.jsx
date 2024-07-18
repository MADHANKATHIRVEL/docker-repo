'use client'
import newMobileAppImg from "../../assets/newmobilead.webp";
import playStore from "../../assets/play-store-albion-propertyhub.webp";
import appStore from "../../assets/app-store-albion-propertyhub.webp";
import "./mobile-ad.css";
import Image from "next/image";

const MobileAppAd = () => {
  return (
    <div className="mobileAppImgAd">
      <Image
        src={newMobileAppImg}
        className="appImage"
        loading="lazy"
        alt="Mobile App"
      />
      <div className="downloadBtns">
        <div className="image-Containers">
          <Image 
            src={playStore}
            className="downldImgs"
            loading="lazy"
            alt="Play Store"
            height={"auto"}
            width={"auto"}
            onClick={() => {
              if(typeof window != undefined){
                window.open("https://play.google.com/store/apps/details?id=com.albionNew&pcampaignid=web_share")
              }
            }
          }
          />
          <Image placeholder="blur"
            src={appStore}
            className="downldImgs"
            alt="App Store"
            onClick={() => {
              if(typeof window != undefined){
                window.open("https://apps.apple.com/us/app/albion-property-hub/id6476275094")
              }
            }
          }
          />
        </div>
      </div>
    </div>
  );
};

export default MobileAppAd;
