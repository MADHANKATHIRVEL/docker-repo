"use client";
import { useState, useEffect } from "react";
import "./similar-properties.css";
import { ArrowRightOutlined, SwapRightOutlined } from "@/utils/icons";
import noImageFound from "@/assets/no-image-found.webp";
import axios from "axios";
import { getUserId } from "@/utils/userUtils";
import {
  addEllipsis,
  capitalizeFirstLetter,
  formatPrice,
  getUrlString,
} from "@/utils/helpers";
import { APP_BASE_URL } from "@/constants/Constant";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SimilarProperties = () => {
  const router = useRouter();
  const [similarProperties, setSimilarProperties] = useState([]);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    async function getSimilarProperties() {
      await axios
        .get(
          `${APP_BASE_URL}/Properties/show?projects=similar_properties${
            !!getUserId() ? `&user_id=${getUserId()}` : ""
          }`
        )
        .then((res) => {
          setSimilarProperties((prevState) => res.data);
        })
        .catch((err) => console.log("err"));
    }
    getSimilarProperties();
  }, []);

  return (
    similarProperties.length > 0 && (
      <div className="similar-properties">
        <div className="sp-header">
          <span>Similar Properties Nearby</span>
          <div
            onClick={() => router.push("/property/results", { scroll: true })}
            onMouseEnter={() => setShowArrow((prevState) => true)}
            onMouseLeave={() => setShowArrow((prevState) => false)}
            className="see-all"
          >
            <span>See all Properties</span>
            {showArrow ? <ArrowRightOutlined /> : <SwapRightOutlined />}
          </div>
        </div>
        <div className="properties-row">
          {similarProperties.length > 0 &&
            similarProperties?.map((item, index) =>
              index <= 3 &&
              item.property_type?.pt_name?.toLowerCase() != "pg" ? (
                <div key={item.p_id} className="similar_properties_card">
                  <div className="similar-properties-image">
                    <img
                      src={item?.images[0]?.image_url}
                      onError={({ currentTarget }) => {
                        currentTarget.src = noImageFound;
                      }}
                      alt="Similar Property"
                      loading="lazy"
                    />
                  </div>
                  <Link
                    className="similar-properties-detail"
                    href={{
                      pathname: `/propertydetails/${getUrlString(item)}-${
                        item.p_id
                      }`,
                    }}
                    target="_blank"
                    as={`/propertydetails/${getUrlString(item)}-${item.p_id}`}
                  >
                    {item?.features[0]?.title === "bedroom" ? (
                      <span className="similar_property-title">
                        {item?.features[0]?.value} BHK{" "}
                        {capitalizeFirstLetter(item?.item_type?.pt_name)} |{" "}
                        {item?.area?.super_area} {item?.area?.super_area_unit}{" "}
                      </span>
                    ) : (
                      <span className="similar_property-title">
                        {item?.area?.super_area}{" "}
                        {capitalizeFirstLetter(item?.area?.super_area_unit)}{" "}
                        {item?.item_type?.pt_name} in&nbsp;
                      </span>
                    )}
                    <span className="similar_property-location">
                      {addEllipsis(capitalizeFirstLetter(item?.locality), 10)} ,{" "}
                      {capitalizeFirstLetter(addEllipsis(item?.location, 10))}
                    </span>
                    <span>
                      <span className="similar_property-price">
                        &#x20B9; {formatPrice(item.expected_price)}
                      </span>{" "}
                      Onwards
                    </span>
                  </Link>
                </div>
              ) : null
            )}
        </div>
      </div>
    )
  );
};

export default SimilarProperties;
