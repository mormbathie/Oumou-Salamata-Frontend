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
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidbar"; // ✅ corrigé

export default function Profile() {
  const { user, loadUser } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  if (!form || !user) {
    return (
      <Flex minH="100vh" justify="center" align="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const handleUpdate = async () => {
    setLoading(true);
    setMessage(null);

    try {
      await api.updateProfile(form);
      await loadUser();

      // ✅ message sous formulaire
      setMessage({
        type: "success",
        text: "Profil mis à jour avec succès ✅",
      });

      // ✅ toast
      toast({
        title: "Succès",
        description: "Votre profil a été mis à jour.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur est survenue ❌";

      setMessage({
        type: "error",
        text: errorMessage,
      });

      toast({
        title: "Erreur",
        description: errorMessage,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

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

      {/* Content */}
      <Flex flex="1" justify="center" align="center" bg="gray.100">
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
                    <Input value={form.email || ""} isDisabled />
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

          {/* MESSAGE */}
          {message && (
            <Box
              mt={4}
              p={3}
              rounded="md"
              bg={message.type === "success" ? "green.100" : "red.100"}
              color={message.type === "success" ? "green.700" : "red.700"}
            >
              {message.text}
            </Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}