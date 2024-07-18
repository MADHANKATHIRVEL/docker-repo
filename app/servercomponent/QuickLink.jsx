import { Drawer, Menu } from "@/utils/antd-component";
import Link from "next/link";
import React from "react";
import SubMenu from "antd/es/menu/SubMenu";

export default function QuickLink({ menuitems ,showDrawer,setShowDrawer }) {
  return (
    <Drawer open={showDrawer} onClose={() => setShowDrawer(() => false)}>
      <Menu mode="inline">
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
    </Drawer>
  );
}
