import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../../Redux/users/userType";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { auth } = useSelector((state) => state.userReducer);
  return (
    <>
      <Box
        zIndex={1000}
        top={0}
        position={"fixed"}
        w={"100%"}
        boxShadow={"rgba(0,0,0,0.16) 0px 3px 6px, rgba(0,0,0,0.23)0px 3px 6px"}
        bg={useColorModeValue("lightblue")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontWeight={"bold"}>Note App</Box>

          <Flex alignItems={"center"}>
            <Stack alignItems={"center"} direction={"row"} spacing={7}>
              <Button
                display={auth === true ? "none" : "block"}
                onClick={() => {
                  navigate("/");
                }}
              >
                Login
              </Button>
              <Button
                display={auth === true ? "none" : "block"}
                onClick={() => {
                  navigate("/register");
                }}
              >
                signup
              </Button>
              <Button
                display={auth === true ? "block" : "none"}
                onClick={() => {
                  navigate("/notes");
                }}
              >
                All Notes
              </Button>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  border="2px solid blue"
                  padding={2}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Happy To see you</p>
                  </Center>
                  <br />
                  <MenuDivider />

                  <MenuItem
                    onClick={() => {
                      dispatch({ type: LOGOUT });
                    }}
                  >
                    Log Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
