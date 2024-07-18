'use client';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
} from "react-share";

const ShareButton = ({ url, title }) => {
  return (
    <div
      className="share-button-container"
    >
      <FacebookShareButton url={url} quote={title} title="Facebook" >
        <FacebookIcon 
            className="social-media-icons"
        />
      </FacebookShareButton>
      <TwitterShareButton url={url} quote={title} title={"Twitter"}>
        <TwitterIcon className="social-media-icons"/>
      </TwitterShareButton>
      <WhatsappShareButton url={url} quote={title} title={"Whatsapp"}>
        <WhatsappIcon className="social-media-icons"/>
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButton;
