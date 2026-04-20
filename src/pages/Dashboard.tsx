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
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [students, setStudents] = useState<any[]>([]);
  const [parents, setParents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 📦 Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, p, c] = await Promise.all([
          api.getStudents(),
          api.getParents(),
          api.getClasses(),
        ]);

        setStudents(s);
        setParents(Array.isArray(p) ? p : p.data || []);
        setClasses(c);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // ⏳ Loading user
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
      <Sidebar firstName={user.firstName} lastName={user.lastName} />

      {/* MAIN */}
      <Box flex="1" p={6} bg="gray.50">
        {/* TOP BAR */}
        <Flex justify="space-between" mb={6}>
          <Heading size="lg">Dashboard</Heading>

          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>

        {/* WELCOME */}
        <Box mb={6} p={6} bg="white" rounded="xl" shadow="md">
          <Heading size="md">Bienvenue {user.firstName} 👋</Heading>
        </Box>

        {/* 📊 CARDS */}
        <Flex gap={4} mb={6}>
          <Box flex="1" p={6} bg="blue.500" color="white" rounded="xl">
            <Heading size="sm">Élèves</Heading>
            <Heading size="2xl">{students.length}</Heading>
          </Box>

          <Box flex="1" p={6} bg="green.500" color="white" rounded="xl">
            <Heading size="sm">Parents</Heading>
            <Heading size="2xl">{parents.length}</Heading>
          </Box>

          <Box flex="1" p={6} bg="purple.500" color="white" rounded="xl">
            <Heading size="sm">Classes</Heading>
            <Heading size="2xl">{classes.length}</Heading>
          </Box>
        </Flex>

        {/* 📋 TABLE ÉLÈVES */}
        <Box bg="white" p={6} rounded="xl" shadow="md" mb={6}>
          <Heading size="md" mb={4}>
            Élèves
          </Heading>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nom</Th>
                  <Th>Classe</Th>
                  <Th>Parent</Th>
                </Tr>
              </Thead>

              <Tbody>
                {students.map((s) => (
                  <Tr key={s.id}>
                    <Td>
                      {s.firstName} {s.lastName}
                    </Td>
                    <Td>{s.class?.name || "-"}</Td>
                    <Td>
                      {s.parent
                        ? `${s.parent.firstName} ${s.parent.lastName}`
                        : "-"}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        {/* 👨‍👩‍👧 TABLE PARENTS */}
        <Box bg="white" p={6} rounded="xl" shadow="md">
          <Heading size="md" mb={4}>
            Parents
          </Heading>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nom</Th>
                  <Th>Email</Th>
                  <Th>Téléphone</Th>
                  <Th>Rôle</Th>
                </Tr>
              </Thead>

              <Tbody>
                {parents.map((p) => (
                  <Tr key={p.id}>
                    <Td>
                      {p.firstName} {p.lastName}
                    </Td>
                    <Td>{p.email}</Td>
                    <Td>{p.phone || "-"}</Td>
                    <Td>
                      <Badge colorScheme="green">{p.role}</Badge>
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
