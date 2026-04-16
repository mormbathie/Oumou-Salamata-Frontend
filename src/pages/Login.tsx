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
import { login } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
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
          <Heading size="lg">Connexion</Heading>
          <Text color="gray.500">Bienvenue sur Oumou Salamata</Text>

          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Mot de passe"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button colorScheme="blue" w="100%" onClick={handleLogin}>
            Se connecter
          </Button>
          <Text fontSize="sm">
            Pas de compte ?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              S'inscrire
            </span>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
}
