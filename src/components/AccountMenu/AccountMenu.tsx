"use client";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export type AccountMenuNavItem = {
  id?: string;
  label: string;
  onClick?: () => void;
};

export type AccountMenuAction = {
  id?: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

export default function AccountMenu({
  userName,
  avatarContent,
  navItems,
  menuItems,
}: {
  userName?: string;
  avatarContent?: React.ReactNode;
  navItems?: AccountMenuNavItem[];
  menuItems?: AccountMenuAction[] | undefined;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const router = useRouter();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getIconForId = (id?: string) => {
    switch (id) {
      case "profile":
        return <AccountCircle fontSize="small" />;
      case "settings":
        return <Settings fontSize="small" />;
      case "logout":
        return <Logout fontSize="small" />;
      default:
        return null;
    }
  };

  const handleNav = (navId?: string) => {
    if (!navId) return;
    switch (navId) {
      case "home":
        router.push("/home");
        break;
      case "transactions":
        router.push("/transactions");
        break;
      case "cards":
        router.push("/cards");
        break;
      default:
        console.log("nav click", navId);
    }
  };

  const handleMenuAction = (actionId?: string) => {
    if (!actionId) return;
    switch (actionId) {
      case "profile":
        router.push("/profile");
        break;
      case "settings":
        router.push("/settings");
        break;
      case "logout":
        router.push("/");
        break;
      default:
        console.log("menu action", actionId);
    }
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          borderRadius: 2,
          boxShadow: 3,
          p: { xs: 1, md: 2 },
          m: { xs: 1, md: 2 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", gap: 1 }}>
          {navItems?.map((item) => (
            <Button
              key={item.id ?? item.label}
              onClick={() => {
                if (item.onClick) item.onClick();
                else handleNav(item.id);
              }}
              sx={{
                minWidth: { xs: 60, md: 100 },
                color: "white",
                fontWeight: "bold",
                fontSize: { xs: "0.8rem", md: "1rem" },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "end" }}>
          {userName ? (
            <Typography
              sx={{ display: { xs: "none", md: "block" }, minWidth: 100, color: "white", fontWeight: "bold" }}
            >
              {userName}
            </Typography>
          ) : null}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: { xs: 28, md: 32 }, height: { xs: 28, md: 32 } }}>{avatarContent ?? ""}</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menuItems?.length
          ? menuItems.map((mi) => (
              <MenuItem
                key={mi.id ?? mi.label}
                onClick={() => {
                  handleClose();
                  if (mi.onClick) mi.onClick();
                  else handleMenuAction(mi.id);
                }}
              >
                {mi.icon ?? getIconForId(mi.id) ? <ListItemIcon>{mi.icon ?? getIconForId(mi.id)}</ListItemIcon> : null}
                {mi.label}
              </MenuItem>
            ))
          : null}
      </Menu>
    </React.Fragment>
  );
}
