import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
  firstName?: string;
  lastName?: string;
}

export default function Sidebar({ firstName, lastName }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <Box w="250px" bg="blue.600" color="white" p={5} minH="100vh">
      <Heading size="md" mb={8}>
        {firstName} {lastName}
      </Heading>

      <Text mb={3} cursor="pointer" onClick={() => navigate("/dashboard")}>
        Dashboard
      </Text>

      <Text mb={3} cursor="pointer" onClick={() => navigate("/profile")}>
        Profile
      </Text>
      <VStack p={4}>
        <Link to="/create-student">
          <Button w="100%">Créer élève</Button>
        </Link>
      </VStack>
    </Box>
  );
}
