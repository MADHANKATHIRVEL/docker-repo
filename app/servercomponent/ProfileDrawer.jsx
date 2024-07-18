import playStoreAppLogo from "@/assets/play-store-albion-propertyhub.webp";
import appStoreAppLogo from "@/assets/app-store-albion-propertyhub.webp";
import { capitalizeWords, removeAllCookies } from "@/utils/helpers";
import { getUserTypeText } from "@/components/common/reusable-component/propertyimageslider/PropertyImagesSlider";
import { getUserType, getUsername } from "@/utils/userUtils";
import { Button, Drawer, Menu, Tag } from "@/utils/antd-component";
import Image from "next/image";
import Cookies from "js-cookie";
import userDefault from "@/assets/user-default.webp";
import SubMenu from "antd/es/menu/SubMenu";
import Link from "next/link";
import './scss/profile-drawer.scss';

export default function ProfileDrawer({ menuitems ,profileDrawer, setProfileDrawer }) {
  return (
    <Drawer open={profileDrawer} onClose={() => setProfileDrawer(() => false)}>
      <div
        className="profile-drawer-head"
      >
        {!!Cookies.get("user-data") ? (
          <div
            className="profile-hero-section"
          >
            <Image
                src={Cookies.get("profile_image") ?? userDefault}
                alt="Profile Image"
                className="user-profile-image"
                height={40}
                width={40}
              />
            <span className="logged-in-user-name">
              Hi {capitalizeWords(getUsername())}{" "}
              <Tag className="user-typetag">
                {getUserTypeText(getUserType())}
              </Tag>
            </span>
          </div>
        ) : (
          <div className="login-quick-link">
            <Image placeholder="blur"
              src={userDefault}
              alt="Profile User Default"
              className="user-default-image"
              height={40}
              width={40}
            />
            <div className="not-logged-in">
              <p>You're Not Logged In!</p>
              <Button className="quickLoginBtn" href="/login">
                Login
              </Button>
            </div>
          </div>
        )}
        {!!Cookies.get("user-data") && (
          <Menu>
            <Menu.Item>
              <a href="/profile" target="_blank">
                My Profile
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/profile?setState=my_properties" target="_blank">
                My Properties
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/profile?setState=my_responses" target="_blank">
                My Responses
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/wishlist" target="_blank">
                My Wishlist
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/profile?setState=my_contacts" target="_blank">
                My Contacts
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/profile?setState=my_payments" target="_blank">
                My Payments
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/plans" target="_blank">
                Albion Prime
              </a>
            </Menu.Item>
            <Menu.Item onClick={() => removeAllCookies()}>
              <a href="/login">
                Logout
              </a>
            </Menu.Item>
          </Menu>
        )}
        <Menu mode="inline" defaultActiveFirst="buy">
          {menuitems.map((item) =>
            item.children ? (
              <SubMenu key={item.key} title={item.label}>
                {item.children.map((child) =>
                  child.children ? (
                    <SubMenu key={child.key} title={child.label}>
                      {child.children.map((subchild) => (
                        <Menu.Item key={subchild.key}>
                          <Link href={`${subchild.url}`} target="_blank">
                            {subchild.label}
                          </Link>
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  ) : (
                    <Menu.Item key={child.key}>
                      <Link href={`${child.url}`} target="_blank">
                        {child.label}
                      </Link>
                    </Menu.Item>
                  )
                )}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key}>
                <Link href={{ pathname: `${item.url}` }} target="_blank">
                  {item.label}
                </Link>
              </Menu.Item>
            )
          )}
        </Menu>
        <div className="download-our-app-adv">
          <p>Download Albion Property Hub Mobile App</p>
          <div className="application-store-link">
            <a href="https://play.google.com/store/apps/details?id=com.albionNew&pcampaignid=web_share">
              <Image placeholder="blur" src={playStoreAppLogo} height={40} width={125} className="Play Store Logo"/>
            </a>
            <a href="https://apps.apple.com/us/app/albion-property-hub/id6476275094">
              <Image placeholder="blur" src={appStoreAppLogo} height={40} width={125} className="App Store Logo"/>
            </a>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
