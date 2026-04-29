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
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { studentsApi } from "../api/students.api";
import { classesApi } from "../api/classes.api";
import Sidebar from "../components/Sidbar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      const [s, c] = await Promise.all([
        studentsApi.getAll(),
        classesApi.getAll(),
      ]);

      setStudents(s);
      setClasses(c);
    };

    fetchData();
  }, []);

  // 🔍 FILTER + SORT
  const filteredStudents = students
    .filter((s) => {
      const matchSearch =
        `${s.firstName} ${s.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchClass = selectedClass
        ? s.class?.id === selectedClass
        : true;

      return matchSearch && matchClass;
    })
    .sort((a, b) => {
      const nameA = a.firstName.toLowerCase();
      const nameB = b.firstName.toLowerCase();

      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

  return (
    <Flex minH="100vh">
      <Sidebar firstName={user.firstName} lastName={user.lastName} />

      <Box flex="1" bg="gray.50">
        <Navbar user={user} />

        <Box p={6}>
          <Heading mb={6}>Liste des Élèves</Heading>

          {/* FILTERS */}
          <Stack direction="row" spacing={4} mb={6}>
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select
              placeholder="Filtrer par classe"
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>

            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
            </Select>
          </Stack>

          {/* TABLE */}
          <TableContainer bg="white" rounded="xl" shadow="md">
            <Table>
              <Thead>
                <Tr>
                  <Th>Nom</Th>
                  <Th>Classe</Th>
                  <Th>Parent</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>

              <Tbody>
                {filteredStudents.map((s) => (
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

                    <Td>
                      <Flex gap={2}>
                        <Button
                          size="sm"
                          onClick={() => navigate(`/students/${s.id}`)}
                        >
                          👁️
                        </Button>

                        <Button
                          size="sm"
                          onClick={() =>
                            navigate(`/students/edit/${s.id}`)
                          }
                        >
                          ✏️
                        </Button>
                      </Flex>
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