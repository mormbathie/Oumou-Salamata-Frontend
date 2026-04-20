import { Box, VStack, Text, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ firstName, lastName }: any) {
  const navigate = useNavigate();

  const linkStyle = {
    cursor: "pointer",
    padding: "10px",
    borderRadius: "8px",
    _hover: { bg: "blue.600" },
    w: "100%",
  };

  return (
    <Box
      w="260px"
      minH="100vh"
      bg="blue.700"
      color="white"
      p={5}
    >
      {/* USER INFO */}
      <Box mb={6}>
        <Text fontSize="lg" fontWeight="bold">
          {firstName} {lastName}
        </Text>
        <Text fontSize="sm" opacity={0.8}>
          Administration
        </Text>
      </Box>

      <Divider mb={4} />

      {/* NAVIGATION */}
      <VStack align="start" spacing={2}>
        
        <Text {...linkStyle} onClick={() => navigate("/dashboard")}>
          📊 Dashboard
        </Text>

        <Text {...linkStyle} onClick={() => navigate("/students")}>
          🧑‍🎓 Élèves
        </Text>

        <Text {...linkStyle} onClick={() => navigate("/students/create")}>
          ➕ Ajouter Élève
        </Text>

        <Text {...linkStyle} onClick={() => navigate("/students/search")}>
          🔎 Rechercher Élèves
        </Text>

        <Text {...linkStyle} onClick={() => navigate("/classes")}>
          🏫 Classes
        </Text>

        <Text {...linkStyle} onClick={() => navigate("/parents")}>
          👨‍👩‍👧 Parents
        </Text>

        <Text {...linkStyle} onClick={() => navigate("/profile")}>
          👤 Profil
        </Text>

      </VStack>
    </Box>
  );
}