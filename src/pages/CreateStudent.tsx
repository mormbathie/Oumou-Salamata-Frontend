import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import Sidebar from "../components/Sidbar";

export default function CreateStudent() {
  const toast = useToast();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    classId: "",
    parentId: "",
  });

  const [classes, setClasses] = useState<any[]>([]);
  const [parents, setParents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Charger les parents
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const data = await api.getParents();

        if (Array.isArray(data)) {
          setParents(data);
        } else if (data.data) {
          setParents(data.data);
        } else {
          setParents([]);
        }
      } catch (err) {
        console.error(err);
        setParents([]);

        toast({
          title: "Erreur chargement parents",
          status: "error",
        });
      }
    };

    fetchParents();
  }, []);

  // ✅ Charger les classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await api.getClasses();
        setClasses(data);
      } catch {
        toast({
          title: "Erreur chargement classes",
          status: "error",
        });
      }
    };

    fetchClasses();
  }, []);

  // 🚀 Submit
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.createStudent(form);

      toast({
        title: "Élève créé avec succès",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setForm({
        firstName: "",
        lastName: "",
        birthDate: "",
        classId: "",
        parentId: "",
      });
    } catch {
      toast({
        title: "Erreur lors de la création",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh">
      <Sidebar />

      <Flex flex="1" justify="center" align="center" bg="gray.100">
        <Box bg="white" p={8} rounded="xl" shadow="lg" w="500px">
          <Heading mb={6}>Créer un élève</Heading>

          <Stack spacing={4}>
            {/* PRÉNOM */}
            <Box>
              <label>Prénom</label>
              <Input
                placeholder="Ex: Samba"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </Box>

            {/* NOM */}
            <Box>
              <label>Nom</label>
              <Input
                placeholder="Ex: Ndiaye"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </Box>

            {/* DATE NAISSANCE */}
            <Box>
              <label>Date de naissance</label>
              <Input
                type="date"
                value={form.birthDate}
                onChange={(e) =>
                  setForm({ ...form, birthDate: e.target.value })
                }
              />
            </Box>

            {/* CLASSE */}
            <Box>
              <label>Classe</label>
              <Select
                placeholder="Sélectionner une classe"
                value={form.classId}
                onChange={(e) => setForm({ ...form, classId: e.target.value })}
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} - {c.level}
                  </option>
                ))}
              </Select>
            </Box>

            {/* PARENT */}
            <Box>
              <label>Parent</label>
              <Select
                placeholder="Sélectionner un parent"
                value={form.parentId}
                onChange={(e) => setForm({ ...form, parentId: e.target.value })}
              >
                {parents.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.firstName} {p.lastName}
                  </option>
                ))}
              </Select>
            </Box>

            {/* BUTTON */}
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Créer l’élève
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
