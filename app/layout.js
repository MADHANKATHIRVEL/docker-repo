import { Poppins } from "next/font/google";
import Parent from "./servercomponent/Parent";
import Script from "next/script";

const poppins = Poppins({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Albion Property Hub: Properties for Buy, Sell, or Rent.",
  description:
    "Discover a diverse range of real estate properties for sale on Albion Property Hub, buy your dream home or find the perfect rental and sell your Property Easily",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" style={{ fontFamily: poppins.style.fontFamily }}>
      <meta name="theme-color" content="#8c193f" />
      <body>
        <Parent fontFamily={poppins.style.fontFamily}>{children}</Parent>
      </body>
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", "GTM-TLTWHTLC")`}
      </Script>
      <Script type="application/ld+json">
        {` {
            "@context": "https://schema.org",
            "@type": "Organization",
            "image": "https://albionpropertyhub.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffootlogo.deb8efd3.webp&w=128&q=75",
            "url": "https://albionpropertyhub.com/",
            "sameAs": ["https://www.instagram.com/albionpropertyhub/", "https://www.facebook.com/albionpropertyhub", "https://x.com/albion_hub"],
            "logo": "https://albionpropertyhub.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffootlogo.deb8efd3.webp&w=128&q=75",
            "name": "Company",
            "description": "Discover a diverse range of real estate properties for sale on Albion Property Hub, buy your dream home or find the perfect rental and sell your Property Easily",
            "email": "support@albionpropertyhub.com",
            "telephone": "+91 9442203866",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Guindy",
              "addressLocality": "Chennai",
              "addressCountry": "IN",
              "addressRegion": "TamilNadu",
              "postalCode": "600032"
            }
          }
      `}
      </Script>
    </html>
  );
}
