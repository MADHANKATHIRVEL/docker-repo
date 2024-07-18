"use client";
import flatPng from "@/assets/flat.png";
import housePng from "@/assets/house.png";
import villaPng from "@/assets/villa.png";
import plotPng from "@/assets/plot.png";
import shopPng from "@/assets/shop.png";
import officePng from "@/assets/office.png";
import "./scss/link-with-icon.scss";
import Image from "next/image";
import Link from "next/link";

let linkData = [
  {
    key: "flat__ql",
    label: "Flat",
    image: flatPng,
    link: `/property/flat-for-sale-in-`,
  },
  {
    key: "house__ql",
    label: "House",
    image: housePng,
    link: `/property/house-for-sale-in-`,
  },
  {
    key: "villa__ql",
    label: "Villa",
    image: villaPng,
    link: `/property/villa-for-sale-in-`,
  },
  {
    key: "plot__ql",
    label: "Plot",
    image: plotPng,
    link: `/property/plot-for-sale-in-`,
  },
  {
    key: "shop__ql",
    label: "Shop",
    image: shopPng,
    link: `/property/shop-for-sale-in-`,
  },
  {
    key: "office__ql",
    label: "Office",
    image: officePng,
    link: `/property/office-for-sale-in-`,
  },
];
export default function LinkWithIcon({ location }) {
  return (
    <section className="link-with-icon">
      {linkData.map((link) => (
        <Link
          className="link-icon"
          key={link.key}
          href={{
            pathname: `${link.link}${location}`,
          }}
        >
          <Image
            placeholder="blur"
            src={link.image}
            height={45}
            width={45}
            alt={link.label}
            loading="lazy"
          />
          <p>{link.label}</p>
        </Link>
      ))}
    </section>
  );
}
