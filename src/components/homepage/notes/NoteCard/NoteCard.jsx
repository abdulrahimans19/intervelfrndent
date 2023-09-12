import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Select,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Modal,
  Input,
  ModalOverlay,
  Textarea,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import "./style.css";
import { useDispatch } from "react-redux";
import { deleteNotes, updateNotes } from "../../../../Redux/notes/noteAction";
import { useRef, useState } from "react";
export default function NoteCard({ title, body, textColor, user, _id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");
  const [updateTextColor, setUpdateTextColor] = useState("black");
  const dispatch = useDispatch();

  const updateNote = () => {
    dispatch(
      updateNotes(_id, {
        title: updateTitle,
        body: updateBody,
        textColor: updateTextColor,
      })
    );
  };
  return (
    <Card className="card">
      <CardBody>
        <VStack>
          <Heading>{title}</Heading>
          <Text color={textColor}>{body}</Text>
          <Flex gap={2}>
            <Button onClick={onOpen}>Update</Button>
            <>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Update New Note</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Input
                      value={updateTitle}
                      placeholder="please Update title"
                      onChange={(e) => setUpdateTitle(e.target.value)}
                    ></Input>
                    <Textarea
                      mt={8}
                      value={updateBody}
                      placeholder="please Update description"
                      onChange={(e) => setUpdateBody(e.target.value)}
                    ></Textarea>
                    <Select
                      mt={8}
                      value={updateTextColor}
                      onChange={(e) => setUpdateTextColor(e.target.value)}
                    >
                      <option value="black">Black</option>
                      <option value="red">Red</option>
                      <option value="white">White</option>
                      <option value="green">Green</option>
                      <option value="yellow">Yellow</option>
                    </Select>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={updateNote}>
                      Update
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>

            <Button
              onClick={() => {
                dispatch(deleteNotes(_id));
              }}
            >
              Delete
            </Button>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
}
