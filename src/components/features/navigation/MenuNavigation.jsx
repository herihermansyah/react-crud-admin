import * as React from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import Home from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function MenuNavigation() {
  return (
    <List sx={{ maxWidth: 400 }}>
      <ListItem>
        <ListItemButton component={Link} to="/">
          <ListItemDecorator>
            <Home />
          </ListItemDecorator>
          Home
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton component={Link} to="products">
          <ListItemDecorator>
            <ProductionQuantityLimitsIcon />
          </ListItemDecorator>
          Products
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <AssignmentIcon />
          </ListItemDecorator>
          Orders
        </ListItemButton>
      </ListItem>
    </List>
  );
}
