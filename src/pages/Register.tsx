import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  VStack,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register({ email, password });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container centerContent h="100vh" justifyContent="center">
      <Box
        p={8}
        maxW="400px"
        w="100%"
        borderRadius="xl"
        boxShadow="lg"
        bg="white"
      >
        <VStack spacing={4}>
          <Heading size="lg">Créer un compte</Heading>
          <Text color="gray.500">Rejoins Oumou Salamat</Text>

          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Mot de passe"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            colorScheme="blue"
            w="100%"
            onClick={handleRegister}
          >
            S’inscrire
          </Button>

          <Text fontSize="sm">
            Déjà un compte ?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Se connecter
            </span>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
}