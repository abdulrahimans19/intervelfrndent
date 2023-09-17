import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { getNotes, createNotes } from "../Redux/notes/noteAction";
import { IoIosAdd } from "react-icons/io";
import {
  Modal,
  Input,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Image,
  ModalCloseButton,
} from "@chakra-ui/react";
import NoteCard from "../components/homepage/notes/NoteCard/NoteCard";

export default function Notes() {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const [priority, setPriority] = useState("Medium");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.noteReducer);
  const [selectedPriority, setSelectedPriority] = useState("All");

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  useEffect(() => {
    setNotes(data);
  }, [data]);

  const createNote = () => {
    dispatch(createNotes({ title, body, priority, createdAt, image }));
    onClose();
  };

  const filteredNotes = selectedPriority === "All"
    ? notes
    : notes.filter((note) => note.priority === selectedPriority);

  return (
    <Box mt={20} padding={8}>
      <Select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
        mb={4}
      >
        <option value="All">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>

      <Grid gap={10} w={"90%"} margin={"auto"} gridTemplateColumns="repeat(4 ,1fr)">
        {filteredNotes.map((el) => (
          <NoteCard {...el} />
        ))}
      </Grid>
      <IconButton
        boxShadow={"rgba(60,64,67,0.3) 0px 1px 2px 0px,rgba(60,64,67,0.15)0px 2px 6px 2px"}
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
              <Image
                src={image}
                alt="Note Image"
                boxSize="100px"
                objectFit="cover"
              />
              <Input
                type="file"
                mt={8}
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
              />
              <Select
                mt={8}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
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
