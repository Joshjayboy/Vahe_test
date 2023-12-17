import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
export default function SidebarItem(props) {
  const { item, updateSidebar, callComponent } = props;
  return (
    <ListItemButton
      // sx={item.isComponentOpened && { color: "blue" }}
      onClick={() => {
        callComponent({ isComponentOpened: true, ...item });
        if (item.open !== null) {
          updateSidebar({ ...item, open: !item.open });
        }
      }}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.name} />
      {item.open === null ? null : item.open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
  );
}
