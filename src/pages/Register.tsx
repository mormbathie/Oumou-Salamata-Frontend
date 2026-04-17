import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../api/api"; // ✅ CORRIGÉ
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    await api.register(form); // ✅ CORRIGÉ
    navigate("/login");
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100">
      <Box bg="white" p={8} rounded="xl" shadow="lg" w="400px">
        <Heading mb={6} textAlign="center">
          Register
        </Heading>

        <Stack spacing={3}>
          <Input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
          <Input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
          <Input placeholder="Prénom" onChange={(e)=>setForm({...form,firstName:e.target.value})}/>
          <Input placeholder="Nom" onChange={(e)=>setForm({...form,lastName:e.target.value})}/>
          <Input placeholder="Téléphone" onChange={(e)=>setForm({...form,phone:e.target.value})}/>

          <Button colorScheme="blue" onClick={handleRegister}>
            S'inscrire
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}