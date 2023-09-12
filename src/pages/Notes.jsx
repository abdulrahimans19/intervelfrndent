import {
  Box,
  Button,
  Grid,
  IconButton,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, createNotes } from "../Redux/notes/noteAction";
import { useState } from "react";

import {
  Modal,
  Input,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import NoteCard from "../components/homepage/notes/NoteCard/NoteCard";
import { IoIosAdd } from "react-icons/io";

export default function Notes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.noteReducer);
  const [notes, setNotes] = useState([]);
  console.log(data);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [textColor, setTextColor] = useState("black");

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  useEffect(() => {
    setNotes(data);
  }, [data]);

  const createNote = () => {
    dispatch(createNotes({ title, body, textColor }));
    onClose();
  };

  return (
    <Box mt={20} padding={8}>
      <Grid
        gap={10}
        w={"90%"}
        margin={"auto"}
        gridTemplateColumns="repeat(4 ,1fr)"
      >
        {notes?.map((el) => (
          <NoteCard {...el} />
        ))}
      </Grid>
      <IconButton
        boxShadow={
          "rgba(60,64,67,0.3) 0px 1px 2px 0px,rgba(60,64,67,0.15)0px 2px 6px 2px"
        }
        position={"fixed"}
        w={"80px"}
        borderRadius={50}
        bg={"lightblue"}
        h={"80px"}
        bottom={0}
        onClick={onOpen}
        right={0}
        margin={16}
        icon={<IoIosAdd />}
      ></IconButton>
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Input
                value={title}
                placeholder="please enter title"
                onChange={(e) => setTitle(e.target.value)}
              ></Input>
              <Textarea
                mt={8}
                value={body}
                placeholder="please enter description"
                onChange={(e) => setBody(e.target.value)}
              ></Textarea>
              <Select
                mt={8}
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              >
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="white">White</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={createNote}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
}
