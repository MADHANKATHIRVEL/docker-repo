'use server'
import dynamic from "next/dynamic";

const DynamicFooter = dynamic(() => import("@/components/footer/Footer"));

export default async function FooterComponent({locationList , districtData}) {
  return <DynamicFooter locationList={locationList} cities={districtData}/>;
}