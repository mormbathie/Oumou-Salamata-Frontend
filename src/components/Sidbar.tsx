import {
  Box,
  VStack,
  Text,
  Divider,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  AtSignIcon,
  CalendarIcon,
  SearchIcon,
  SettingsIcon,
  AddIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ firstName, lastName }: any) {
  const navigate = useNavigate();

  const LinkItem = ({ icon, label, path }: any) => (
    <Flex
      align="center"
      gap={3}
      p={3}
      borderRadius="lg"
      cursor="pointer"
      _hover={{ bg: "blue.600" }}
      onClick={() => navigate(path)}
      w="100%"
    >
      <Icon as={icon} />
      <Text>{label}</Text>
    </Flex>
  );

  return (
    <Box w="260px" minH="100vh" bg="blue.700" color="white" p={5}>
      {/* USER */}
      <Box mb={6}>
        <Text fontSize="lg" fontWeight="bold">
          {firstName} {lastName}
        </Text>
        <Text fontSize="sm" opacity={0.7}>
          Admin Panel
        </Text>
      </Box>

      <Divider mb={4} />

      <VStack align="start" spacing={2}>
        <LinkItem icon={AtSignIcon} label="Dashboard" path="/dashboard" />
        <LinkItem icon={CalendarIcon} label="Élèves" path="/students" />
        <LinkItem icon={AddIcon} label="Ajouter Élève" path="/create-student" />
        <LinkItem icon={SearchIcon} label="Recherche" path="/students/search" />
        <LinkItem icon={SettingsIcon} label="Classes" path="/classes" />
        <LinkItem icon={AtSignIcon} label="Parents" path="/parents" />
        <LinkItem icon={SettingsIcon} label="Profil" path="/profile" />
      </VStack>
    </Box>
  );
}