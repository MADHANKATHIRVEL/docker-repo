import { capitalizeWords } from "@/utils/helpers";
import { Select, Tabs } from "@/utils/antd-component";
import Cookies from "js-cookie";
import "./scss/property-service.scss";
import { memo, useMemo, lazy, Suspense, useState } from "react";

const DynamicSwiperCard = lazy(() => import("./TabCard"));

function PropertyQuickLinks({ property_action, locations }) {
  const [propertyAction, setPropertyAction] = useState("Buy");
  const items = useMemo(() => {
    const propertyTypes = ["House", "Flat", "Plot", "Office", "Shop", "Villa"];
    return propertyTypes.map((type, index) => ({
      key: `${index + 1}`,
      label: type,
      children: (
        <Suspense fallback={<center>Loading...</center>}>
          <DynamicSwiperCard
            key={type}
            locations={locations}
            propertType={type}
            propertyAction={propertyAction}
          />
        </Suspense>
      ),
    }));
  }, [locations, propertyAction]);

  return (
    <section className="property-quick-links-area">
      <h4>
        <Select
          value={propertyAction}
          onChange={(value) => setPropertyAction(value)}
          className="property-action-select"
        >
          <Select.Option value="buy">Buy</Select.Option>
          <Select.Option value="rent">Rent</Select.Option>
        </Select>{" "}
        a Property in {capitalizeWords(Cookies.get("userLocation"))}
      </h4>
      <Tabs
        defaultActiveKey="1"
        items={!!locations ? items : []}
        onChange={() => {}}
      />
    </section>
  );
}

export default memo(PropertyQuickLinks);
