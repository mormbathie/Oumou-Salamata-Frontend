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
  useToast,
} from "@chakra-ui/react";

import {
  EditIcon,
  DeleteIcon,
  ViewIcon,
  EmailIcon,
  AtSignIcon,
} from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidbar";
import { useEffect, useState } from "react";
import { studentsApi } from "../api/students.api";
import { parentsApi } from "../api/parents.api";
import { classesApi } from "../api/classes.api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const [students, setStudents] = useState<any[]>([]);
  const [parents, setParents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, p, c] = await Promise.all([
          studentsApi.getAll(),
          parentsApi.getAll(),
          classesApi.getAll(),
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

  // 🗑 DELETE student
  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous supprimer cet élève ?")) return;

    try {
      await studentsApi.delete(id);

      setStudents((prev) => prev.filter((s) => s.id !== id));

      toast({
        title: "Élève supprimé",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Erreur suppression",
        status: "error",
      });
    }
  };

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
          <Navbar user={user} />
        </Flex>

        {/* WELCOME */}

        <Flex gap={4} mb={6}>
          <Box flex="1" p={6} bg="blue.500" color="white" rounded="xl">
            <Heading size="sm">
              <ViewIcon mr={2} />
              Élèves
            </Heading>
            <Heading size="2xl">{students.length}</Heading>
          </Box>

          <Box flex="1" p={6} bg="green.500" color="white" rounded="xl">
            <Heading size="sm">
              <EmailIcon mr={2} />
              Parents
            </Heading>
            <Heading size="2xl">{parents.length}</Heading>
          </Box>

          <Box flex="1" p={6} bg="purple.500" color="white" rounded="xl">
            <Heading size="sm">
              <AtSignIcon mr={2} />
              Classes
            </Heading>
            <Heading size="2xl">{classes.length}</Heading>
          </Box>
        </Flex>

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
                  <Th>Actions</Th>
                </Tr>
              </Thead>

              <Tbody>
                {students.map((s) => (
                  <Tr key={s.id}>
                    <Td>
                      <Flex align="center" gap={2}>
                        <ViewIcon color="blue.500" />
                        {s.firstName} {s.lastName}
                      </Flex>
                    </Td>

                    <Td>{s.class?.name || "-"}</Td>

                    <Td>
                      {s.parent
                        ? `${s.parent.firstName} ${s.parent.lastName}`
                        : "-"}
                    </Td>

                    <Td>
                      <Flex gap={2}>
                        <Button
                          size="sm"
                          leftIcon={<EditIcon />}
                          colorScheme="blue"
                          variant="outline"
                          onClick={() => navigate(`/students/edit/${s.id}`)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          leftIcon={<DeleteIcon />}
                          colorScheme="red"
                          variant="outline"
                          onClick={() => handleDelete(s.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          size="sm"
                          leftIcon={<ViewIcon />}
                          colorScheme="gray"
                          variant="outline"
                          onClick={() => navigate(`/students/${s.id}`)}
                        >
                          View
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
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
