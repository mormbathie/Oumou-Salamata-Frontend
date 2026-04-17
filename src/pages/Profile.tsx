import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidbar";

export default function Profile() {
  const { user, loadUser } = useAuth();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  if (!form) {
    return (
      <Flex minH="100vh" justify="center" align="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await api.updateProfile(form);
      await loadUser();
    } finally {
      setLoading(false);
    }
  };

  return (
     <Flex minH="100vh">
          {/* Sidebar */}
          <Sidebar
            firstName={user.firstName}
            lastName={user.lastName}
          />
    <Flex minH="100vh" justify="center" align="center" bg="gray.100">
      <Box bg="white" p={8} rounded="xl" shadow="lg" w="600px">
        <Heading mb={6}>Mon Profil</Heading>

        {/* TABLE */}
        <TableContainer mb={6}>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Th>Prénom</Th>
                <Td>
                  <Input
                    value={form.firstName || ""}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  />
                </Td>
              </Tr>

              <Tr>
                <Th>Nom</Th>
                <Td>
                  <Input
                    value={form.lastName || ""}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                  />
                </Td>
              </Tr>

              <Tr>
                <Th>Email</Th>
                <Td>
                  <Input
                    value={form.email || ""}
                    isDisabled
                  />
                </Td>
              </Tr>

              <Tr>
                <Th>Téléphone</Th>
                <Td>
                  <Input
                    value={form.phone || ""}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </Td>
              </Tr>

              <Tr>
                <Th>Rôle</Th>
                <Td>
                  <Input value={form.role || ""} isDisabled />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        {/* BUTTON */}
        <Flex justify="flex-end">
          <Button
            colorScheme="blue"
            onClick={handleUpdate}
            isLoading={loading}
          >
            Mettre à jour
          </Button>
        </Flex>
      </Box>
    </Flex>
    </Flex>
  );
}