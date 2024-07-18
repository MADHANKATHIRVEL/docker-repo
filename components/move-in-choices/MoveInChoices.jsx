"use client";
import "./move-in-choices.scss";
import Link from "next/link";
import Image from "next/image";
import readyToMove from "@/assets/ready_to_move-webp.webp";
import underConstruction from "@/assets/under-construction-webp.webp";
import Cookies from "js-cookie";

const MoveInChoices = () => {
  return (
    <section className="move-in-choices-inner-area">
      <h3>
        Your Move-In <span>Choices</span>
      </h3>
      <div className="availability-ql">
        <Link
          href={{
            pathname: `/property/properties-in-${Cookies.get(
              "userLocation"
            )?.toLowerCase()}?availability=ready_to_move`,
          }}
          className="avalability-link"
          style={{
            background: "#DCF5EC",
          }}
          as={`/property/properties-in-${Cookies.get(
            "userLocation"
          )?.toLowerCase()}?availability=ready_to_move`}
        >
          <div className="availabilty-desc">
            <h4>Ready To Move</h4>
            <span>
              Fully built, immediately available homes with essential services.
            </span>
          </div>
          <Image
            placeholder="blur"
            src={readyToMove}
            loading="lazy"
            alt="Ready To Move"
          />
        </Link>
        <Link
          href={{
            pathname: `/property/properties-in-${Cookies.get(
              "userLocation"
            )?.toLowerCase()}?availability=under_construction`,
          }}
          className="avalability-link"
          style={{
            background: "#FEF3EA",
          }}
          as={`/property/properties-in-${Cookies.get(
            "userLocation"
          )?.toLowerCase()}?availability=under_construction`}
        >
          <div className="availabilty-desc">
            <h4>Upcoming Projects</h4>
            <span>
              Planned developments, under construction, available in the future.
            </span>
          </div>
          <Image
            placeholder="blur"
            src={underConstruction}
            loading="lazy"
            alt="Under Construction"
          />
        </Link>
      </div>
    </section>
  );
};

export default MoveInChoices;
