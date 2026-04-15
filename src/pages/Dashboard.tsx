import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box w="250px" bg="blue.600" color="white" p={5}>
        <Heading size="md" mb={6}>
          Oumou Salamat
        </Heading>

        <Text mb={3} cursor="pointer">
          Dashboard
        </Text>
        <Text mb={3} cursor="pointer">
          Élèves
        </Text>
        <Text mb={3} cursor="pointer">
          Professeurs
        </Text>
      </Box>

      {/* Main content */}
      <Box flex="1" p={6} bg="gray.50">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg">Dashboard</Heading>

          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>

        <Box p={6} bg="white" borderRadius="xl" boxShadow="md">
          <Heading size="md" mb={2}>
            Bienvenue 👋
          </Heading>
          <Text>Gestion de votre école en cours...</Text>
        </Box>
      </Box>
    </Flex>
  );
}