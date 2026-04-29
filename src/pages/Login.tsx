import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loadUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = await authApi.login(email, password); // ✅ CORRIGÉ
    localStorage.setItem("token", data.access_token);
    await loadUser();
    navigate("/dashboard");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100">
      <Box bg="white" p={8} rounded="xl" shadow="lg" w="350px">
        <Heading mb={6} textAlign="center">
          Login
        </Heading>

        <Stack spacing={4}>
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button colorScheme="blue" onClick={handleLogin}>
            Se connecter
          </Button>

          <Text textAlign="center">
            Pas de compte ?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              S'inscrire
            </span>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}
