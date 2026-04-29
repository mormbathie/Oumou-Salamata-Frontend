import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  Button,
  Stack,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { studentsApi } from "../api/students.api";
import { classesApi } from "../api/classes.api";
import { parentsApi } from "../api/parents.api";
import Sidebar from "../components/Sidbar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [classes, setClasses] = useState<any[]>([]);
  const [parents, setParents] = useState<any[]>([]);

  const [form, setForm] = useState<any>({
    firstName: "",
    lastName: "",
    birthDate: "",
    classId: "",
    parentId: "",
    gender: "",
  });

  // 📥 LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [student, classesData, parentsData] = await Promise.all([
          studentsApi.getById(id!),
          classesApi.getAll(),
          parentsApi.getAll(),
        ]);

        setForm({
          firstName: student.firstName,
          lastName: student.lastName,
          birthDate: student.birthDate?.split("T")[0],
          classId: student.classId || "",
          parentId: student.parentId || "",
          gender: student.gender || "",
        });

        setClasses(classesData);
        setParents(Array.isArray(parentsData) ? parentsData : parentsData.data || []);
      } catch (err) {
        toast({
          title: "Erreur chargement élève",
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 💾 UPDATE
  const handleUpdate = async () => {
    setSaving(true);

    try {
      await studentsApi.update(id!, form);

      toast({
        title: "Élève modifié avec succès",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/dashboard");
    } catch {
      toast({
        title: "Erreur modification",
        status: "error",
      });
    } finally {
      setSaving(false);
    }
  };

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
            <Heading mb={6}>Modifier Élève</Heading>

            <Stack spacing={4}>
              <Input
                placeholder="Prénom"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />

              <Input
                placeholder="Nom"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />

              <Input
                type="date"
                value={form.birthDate}
                onChange={(e) =>
                  setForm({ ...form, birthDate: e.target.value })
                }
              />

              {/* CLASS */}
              <Select
                placeholder="Classe"
                value={form.classId}
                onChange={(e) =>
                  setForm({ ...form, classId: e.target.value })
                }
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>

              {/* PARENT */}
              <Select
                placeholder="Parent"
                value={form.parentId}
                onChange={(e) =>
                  setForm({ ...form, parentId: e.target.value })
                }
              >
                {parents.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.firstName} {p.lastName}
                  </option>
                ))}
              </Select>

              {/* GENDER */}
              <Select
                placeholder="Sexe"
                value={form.gender}
                onChange={(e) =>
                  setForm({ ...form, gender: e.target.value })
                }
              >
                <option value="MALE">Homme</option>
                <option value="FEMALE">Femme</option>
              </Select>

              <Button
                colorScheme="blue"
                onClick={handleUpdate}
                isLoading={saving}
              >
                Sauvegarder
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}