import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Stack,
  Badge,
  Button,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { studentsApi } from "../api/students.api";
import Sidebar from "../components/Sidbar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await studentsApi.getById(id!);
        setStudent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (!user || loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex minH="100vh">
      <Sidebar firstName={user.firstName} lastName={user.lastName} />

      <Box flex="1" bg="gray.50">
        <Navbar user={user} />

        <Flex justify="center" mt={10}>
          <Box bg="white" p={8} rounded="xl" shadow="md" w="500px">
            <Heading mb={6}>Détails Élève</Heading>

            <Stack spacing={4}>
              <Box>
                <Text fontWeight="bold">Nom</Text>
                <Text>{student.firstName} {student.lastName}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Date de naissance</Text>
                <Text>
                  {new Date(student.birthDate).toLocaleDateString()}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Sexe</Text>
                <Badge colorScheme="purple">
                  {student.gender}
                </Badge>
              </Box>

              <Box>
                <Text fontWeight="bold">Classe</Text>
                <Text>{student.class?.name || "-"}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Parent</Text>
                <Text>
                  {student.parent
                    ? `${student.parent.firstName} ${student.parent.lastName}`
                    : "-"}
                </Text>
              </Box>
            </Stack>

            {/* ACTIONS */}
            <Flex mt={6} gap={3}>
              <Button
                colorScheme="blue"
                onClick={() => navigate(`/students/edit/${student.id}`)}
              >
                Modifier
              </Button>

              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Retour
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}