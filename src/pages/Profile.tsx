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
  Avatar,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidbar";

export default function Profile() {
  const { user, loadUser } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState<any>(null);
  const [initialForm, setInitialForm] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setForm(user);
      setInitialForm(user);
    }
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

    try {
      await api.updateProfile(form);
      await loadUser();

      toast({
        title: "Profil mis à jour",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setIsEditing(false);
      setInitialForm(form);

    } catch (error: any) {
      toast({
        title: "Erreur",
        description:
          error?.response?.data?.message ||
          "Une erreur est survenue",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setIsEditing(false);
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
        <Box bg="white" p={8} rounded="xl" shadow="lg" w="700px">
          
          {/* HEADER */}
          <HStack spacing={4} mb={6}>
            <Avatar
              name={`${user.firstName} ${user.lastName}`}
              size="lg"
            />
            <Box>
              <Heading size="md">
                {user.firstName} {user.lastName}
              </Heading>
            </Box>
          </HStack>

          {/* ACTION BUTTONS */}
          <Flex justify="space-between" mb={4}>
            <Heading size="md">Informations</Heading>

            {!isEditing ? (
              <Button
                colorScheme="blue"
                onClick={() => setIsEditing(true)}
              >
                Modifier
              </Button>
            ) : (
              <HStack>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  Annuler
                </Button>

                <Button
                  colorScheme="blue"
                  onClick={handleUpdate}
                  isLoading={loading}
                >
                  Sauvegarder
                </Button>
              </HStack>
            )}
          </Flex>

          {/* TABLE */}
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Th>Prénom</Th>
                  <Td>
                    <Input
                      value={form.firstName || ""}
                      isDisabled={!isEditing}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </Td>
                </Tr>

                <Tr>
                  <Th>Nom</Th>
                  <Td>
                    <Input
                      value={form.lastName || ""}
                      isDisabled={!isEditing}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          lastName: e.target.value,
                        })
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
                      isDisabled={!isEditing}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value,
                        })
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
        </Box>
      </Flex>
    </Flex>
  );
}