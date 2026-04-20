import {
  Flex,
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user }: any) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Flex
      w="100%"
      h="60px"
      px={6}
      bg="white"
      align="center"
      justify="space-between"
      shadow="sm"
      borderBottom="1px solid #eee"
    >
      {/* LEFT */}
      <Text fontSize="lg" fontWeight="bold" color="gray.700">
       Ououm Salamata School
      </Text>

      <Box>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="ghost"
          >
            <Flex align="center" gap={2}>
              <Avatar size="sm" name={user.firstName} />
              <Text>
                {user.firstName} {user.lastName}
              </Text>
            </Flex>
          </MenuButton>

          <MenuList>
            <MenuItem onClick={() => navigate("/profile")}>
              👤 Profil
            </MenuItem>

            <MenuItem onClick={handleLogout} color="red.500">
              🚪 Déconnexion
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}