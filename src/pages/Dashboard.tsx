import {
  Box,
  Flex,
  Heading,
  Button,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Loading state
  if (!user) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Sidebar
        firstName={user.firstName}
        lastName={user.lastName}
      />

      {/* Main content */}
      <Box flex="1" p={6} bg="gray.50">
        {/* Top bar */}
        <Flex justify="space-between" mb={6}>
          <Heading size="lg">Dashboard</Heading>

          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>

        {/* USER TABLE */}
        <Box p={6} bg="white" rounded="xl" shadow="md">
          <Heading size="md" mb={6}>
            Bienvenue {user.firstName} 👋
          </Heading>

          <TableContainer>
            <Table variant="striped" colorScheme="blue">
              <Tbody>
                <Tr>
                  <Th>Prénom</Th>
                  <Td>{user.firstName}</Td>
                </Tr>

                <Tr>
                  <Th>Nom</Th>
                  <Td>{user.lastName}</Td>
                </Tr>

                <Tr>
                  <Th>Email</Th>
                  <Td>{user.email}</Td>
                </Tr>

                <Tr>
                  <Th>Téléphone</Th>
                  <Td>{user.phone || "-"}</Td>
                </Tr>

                <Tr>
                  <Th>Rôle</Th>
                  <Td>
                    <Badge colorScheme="green">
                      {user.role}
                    </Badge>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Flex>
  );
}