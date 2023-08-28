import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import PopoverForm from '../PopOver/PopOver';
import Form from './Form';
import DeleteForm from './DeleteForm';

export default function ListComp() {
  const [switchEdit, setSwitchEdit] = useState(true);
  const user = useSelector((state) => state.user);
  const allSpec = useSelector((state) => state.specs);
  const dispatch = useDispatch();

  const toggleEdit = () => {
    setSwitchEdit((prevState) => !prevState);
  };

  const handlerEditHour = (event) => {
    const specId = event.currentTarget.dataset.specid;
    const specHour = event.currentTarget.dataset.spechour;
    const inputHour = event.currentTarget.previousElementSibling.childNodes[2];

    const calculatedHour = inputHour.valueAsNumber + Number(specHour);

    const response = fetch('http://localhost:3001', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: specId, userId: user.id, hour: calculatedHour }),
      credentials: 'include',
    });

    response
      .then((res) => {
        if (res.status === 200) {
          const index = allSpec.findIndex((el) => el.id === Number(specId));
          const updatedSpec = [...allSpec];
          updatedSpec[index] = { ...updatedSpec[index], hour: calculatedHour };
          dispatch({ type: 'SPECS', payload: updatedSpec });
          inputHour.value = '';
        }
      })
      .catch((error) => console.log(error));
  };

  const handlerDeleteSpec = (event) => {
    const specId = event.currentTarget.dataset.specid;
    const response = fetch('http://localhost:3001', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: specId }),
      credentials: 'include',
    });
    response
      .then((res) => {
        if (res.status === 200) {
          const specAfterDelete = allSpec?.filter((el) => el?.id !== Number(specId));
          dispatch({ type: 'SPECS', payload: specAfterDelete });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <TableContainer
      my={10}
      mx="10px"
      width="100%"
      maxWidth="600px"
    >
      <Table variant="striped" colorScheme="teal">
        <TableCaption>
          Для прибавления времени нажмите
          <EditIcon />
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Наименование</Th>
            <Th
              textAlign="center"
              px="0px"
              width="50px"
            >
              Часы
            </Th>
            <Th
              textAlign="center"
              width="40px"
              px="10px"
            >
              {switchEdit
                ? (
                  <IconButton
                    colorScheme="teal"
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    onClick={toggleEdit}
                  />
                )
                : (
                  <IconButton
                    colorScheme="teal"
                    aria-label="Delete"
                    icon={<EditIcon />}
                    onClick={toggleEdit}
                  />
                )}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {allSpec?.map((el) => (
            <Tr
              key={`key${el.id}`}
            >
              <Td
                pl="27px"
                pr="5px"
                py={1}
              >
                {el?.title}
              </Td>
              <Td
                px="0px"
                py={1}
                textAlign="center"
                width="50px"
              >
                {el?.hour}

              </Td>
              <Td
                px="10px"
                py={1}
                textAlign="center"
                width="40px"
              >
                {switchEdit
                  ? (
                    <PopoverForm
                      propIcon={<EditIcon />}
                      props={<Form specEl={el} handlerEditHour={handlerEditHour} />}
                    />
                  )
                  : (
                    <PopoverForm
                      propIcon={<DeleteIcon />}
                      props={<DeleteForm el={el} handlerDeleteSpec={handlerDeleteSpec} />}
                    />
                  )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
