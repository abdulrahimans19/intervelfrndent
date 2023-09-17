import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
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
  Select,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import "./style.css";
import { useDispatch } from "react-redux";
import { deleteNotes, updateNotes } from "../../../../Redux/notes/noteAction";

export default function NoteCard({ title, priority, body, image, user, _id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");
  const [updatePriority, setUpdatePriority] = useState(priority); // Initialize with the current priority
  const dispatch = useDispatch();

  const updateNote = () => {
    dispatch(
      updateNotes(_id, {
        title: updateTitle,
        body: updateBody,
        priority: updatePriority,
      })
    );
    onClose();
  };

  return (
    <Card className="card">
      <CardBody>
        <VStack>
          <Heading>{title}</Heading>
          <Text>{body}</Text>
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
                  <ModalHeader>Update Note</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Input
                      value={updateTitle}
                      placeholder="Please update title"
                      onChange={(e) => setUpdateTitle(e.target.value)}
                    />
                    <Textarea
                      mt={4}
                      value={updateBody}
                      placeholder="Please update description"
                      onChange={(e) => setUpdateBody(e.target.value)}
                    />
                    <Select
                      mt={4}
                      value={updatePriority}
                      onChange={(e) => setUpdatePriority(e.target.value)}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
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
          <Image
            src={image}
            alt="Note Image"
            boxSize="100px"
            objectFit="cover"
          />
        </VStack>
      </CardBody>
    </Card>
  );
}
