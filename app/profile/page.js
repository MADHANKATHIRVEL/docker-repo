import dynamic from "next/dynamic";

const Profile = dynamic(() => import("./Profile"));

export default function ProfilePage() {
  return <Profile />;
}
