import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/users/userAction";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { auth, token, loading, error } = useSelector(
    (state) => state.userReducer
  );
  console.log(auth, token);
  if (auth) {
    navigate("/notes");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(getUser({ email, password }));
  };
  if (loading) return <h1 style={{ marginTop: "80px" }}>loading...</h1>;
  if (error) return <h1 style={{ marginTop: "80px" }}>error</h1>;

  if (error) return;

  return (
    <Flex
      padding={4}
      w="100%"
      minH={"100vh"}
      align={"center"}
      justify={"center"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            To Continue Your <Text color={"blue.400"}>Notes</Text> ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
               
              </Stack>
              <Button
                onClick={handleLogin}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
