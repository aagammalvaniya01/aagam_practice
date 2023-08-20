import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Container,
  Heading,
  Box,
  Button,
  useToast,
  Spacer,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import UserTable from '../table/UserTable';
import UserForm from '../modals/UserFormModal';
import SearchBar from '../common/SearchBar';

const Dashboard = () => {
  const toast = useToast();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/users')
      .then(data => setUsers(data.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleCreateUser = newUser => {
    setUsers([...users, newUser]);
    axios
      .post('http://localhost:5000/users', newUser)
      .then(() =>
        toast({
          title: 'User Added',
          description: 'The user has been Added successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        })
      )
      .catch(() =>
        toast({
          title: 'Error',
          description: 'An error occurred while user adding.',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        })
      );
  };

  const handleEditUser = editedUser => {
    const newUpdatedUsers = users.map(user =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(newUpdatedUsers);
    axios
      .put(`http://localhost:5000/users/${editedUser.id}`, editedUser)
      .then(() =>
        toast({
          title: 'User Updated',
          description: 'The user has been updated successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      )
      .catch(() =>
        toast({
          title: 'Error',
          description: 'An error occurred while updating the user.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      );
  };

  const onDeleteUser = userId => {
    const newUpdatedUsers = users?.filter(user => user.id !== userId);
    setUsers(newUpdatedUsers);
    axios
      .delete(`http://localhost:5000/users/${userId}`)
      .then(() =>
        toast({
          title: 'User Deleted',
          description: 'The user has been successfully deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      )
      .catch(() =>
        toast({
          title: 'Error',
          description: 'An error occurred while deleting the user.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      );
  };

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
  };

  const onEditClick = user => {
    setIsFormModalOpen(true);
    setSelectedUser(user);
  };

  return (
    <ChakraProvider>
      <Container maxW={1200} mt={10}>
        <Heading as="h1" mb={5}>
          User Dashboard
        </Heading>
        <Box mb={20} display="flex" justifyContent="space-between">
          <SearchBar onSearch={handleSearch} />
          <Button
            colorScheme='cyan'
            variant='outline'
            leftIcon={<AddIcon />}
            onClick={() => setIsFormModalOpen(true)}
          >
            Create User
          </Button>
        </Box>
        <Spacer />
        <UserTable
          users={users?.filter(
            user =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.role.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          onDelete={onDeleteUser}
          onEdit={onEditClick}
        />
        <UserForm
          isModalOpen={isFormOpen}
          onCloseModal={() => {
            setIsFormModalOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={selectedUser ? handleEditUser : handleCreateUser}
          user={selectedUser}
        />
      </Container>
    </ChakraProvider>
  );
};

export default Dashboard;
