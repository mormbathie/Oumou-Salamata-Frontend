import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Badge,
  useToast,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { usersApi } from "../api/users.api";
import Sidebar from "../components/Sidbar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function AdminUsers() {
  const { user } = useAuth();
  const toast = useToast();

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await usersApi.getAll();
      setUsers(data);
    };

    fetchUsers();
  }, []);
  if (!user) {
    return <Box p={6}>Chargement...</Box>;
  }

  // 🔄 CHANGE ROLE
  const handleChangeRole = async (id: string, role: string) => {
    try {
      await usersApi.updateRole(id, role);

      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));

      toast({
        title: "Rôle mis à jour",
        status: "success",
      });
    } catch {
      toast({
        title: "Erreur",
        status: "error",
      });
    }
  };

  return (
    <Flex minH="100vh">
      <Sidebar firstName={user.firstName} lastName={user.lastName} />

      <Box flex="1" bg="gray.50">
        <Navbar user={user} />

        <Box p={6}>
          <Heading mb={6}>Gestion des utilisateurs</Heading>

          <TableContainer bg="white" rounded="xl" shadow="md">
            <Table>
              <Thead>
                <Tr>
                  <Th>Nom</Th>
                  <Th>Email</Th>
                  <Th>Rôle</Th>
                  <Th>Modifier</Th>
                </Tr>
              </Thead>

              <Tbody>
                {users.map((u) => (
                  <Tr key={u.id}>
                    <Td>
                      {u.firstName} {u.lastName}
                    </Td>

                    <Td>{u.email}</Td>

                    <Td>
                      <Badge
                        colorScheme={
                          u.role === "ADMIN"
                            ? "red"
                            : u.role === "MANAGER"
                              ? "purple"
                              : "gray"
                        }
                      >
                        {u.role}
                      </Badge>
                    </Td>

                    <Td>
                      <Select
                        value={u.role}
                        onChange={(e) => handleChangeRole(u.id, e.target.value)}
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="USER">USER</option>
                        <option value="USER">PARENT</option>
                      </Select>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Flex>
  );
}
