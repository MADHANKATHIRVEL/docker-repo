"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import "./wishlist.css";
import { APP_BASE_URL } from "@/constants/Constant";
import noImage from "@/assets/no-images.webp";
import { wishlistProduct } from "@/utils/apiHelpers";
import {
  addEllipsis,
  capitalizeFirstLetter,
  getUrlString,
} from "../../utils/helpers";
import { getUserId } from "../../utils/userUtils";
import Cookies from "js-cookie";
import {
  HeartFilled
} from "@/utils/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

const SEO = dynamic(() => import("@/components/seo/SEO"), {
  ssr : false
})

const WishListCard = ({ item , setRefresh}) => {
  const [showInfo, setshowInfo] = useState(false);
  const router = useRouter();
  return (
    <div
      onMouseEnter={() => setshowInfo(true)}
      onMouseLeave={() => setshowInfo(false)}
      title="Click To Open"
      className="wishlist-card"
    >
      <HeartFilled
        title="Remove From Wishlist"
        className="heart-filled"
        onClick={async () => {
          await wishlistProduct(item.p_id, getUserId(), "remove");
          setRefresh("deleted");
        }}
      />
      <Link
        className="wishlist-property-image"
        href={{
          pathname: `/propertydetails/${getUrlString(item)}-${item.p_id}`,
        }}
        as={`/propertydetails/${getUrlString(item)}-${item.p_id}`}
        target="_blank"
      >
        <Image
          src={item?.images[0]?.image_url ?? noImage}
          alt="Wishlist Image"
          loading="lazy"
          className="wishlisted-image"
          height={150}
          width={150}
        />
        <div class="swiper-lazy-preloader"/>
      </Link>
      <Link
        className="wishlist-card-area"
        href={{
          pathname: `/propertydetails/${getUrlString(item)}-${item.p_id}`,
        }}
        as={`/propertydetails/${getUrlString(item)}-${item.p_id}`}
        target="_blank"
      >
        <span className="property-title">
          {capitalizeFirstLetter(addEllipsis(item?.property_name, 10))}
        </span>
        <span className="property-title">
          {capitalizeFirstLetter(item?.property_type.pt_name)}
        </span>
        <span className="property-price">
          {capitalizeFirstLetter(
            parseInt(item?.expected_price).toLocaleString("en-IN")
          )}
        </span>
        <span className="exact-loc">
          {capitalizeFirstLetter(addEllipsis(item?.locality, 10))}
        </span>
        <span className="property-place">
          {capitalizeFirstLetter(addEllipsis(item?.location, 10))}
        </span>
      </Link>
    </div>
  );
};

const Wishlist = () => {
  const [wishlistItems, setWishListItems] = useState([]);
  const router = useRouter();

  async function getWishlistItems() {
    await axios
      .get(`${APP_BASE_URL}/WishList/show?user_id=${getUserId()}`)
      .then((res) =>
        setWishListItems((prevState) => {
          if (res.data.message) {
            return null;
          } else {
            return res.data.property_data;
          }
        })
      );
  }

  useEffect(() => {
    getWishlistItems();
  }, []);

  useEffect(() => {
    if (!Cookies.get("user-data")) {
      router.push("/login", { scroll: true });
      return;
    }
  }, [])

  return (
    <>
      <SEO titleTemplate={"Wishlist Page"} />
      <div className="wishlist_page">
        {!!wishlistItems ? (
          <div className="list-section">
            {wishlistItems.map((item) => (
              <div className="wishlisted-items" key={item.p_id}>
                <WishListCard item={item} setRefresh={(val) => {
                  if(val){
                    getWishlistItems()
                  }
                }}/>
              </div>
            ))}
          </div>
        ) : (
          <h2>No Wishlisted Items Yet</h2>
        )}
      </div>
    </>
  );
};

export default Wishlist;
