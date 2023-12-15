import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from '@material-ui/core';
import { BACKEND_BASE_URL } from '../Constants/AppConstants';
import DeleteCustomerDialog from './DeleteCustomerDialog';
import EditCustomerDialog from './EditCustomerDialog';
import { Button } from '@mui/material';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function CustomerList() {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [editCustomerModalOpen, setEditCustomerModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [deleteCustomerDialog, setDeleteCustomerDialog] = useState(false);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setDeleteCustomerDialog(true);
  };
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`${BACKEND_BASE_URL}/customers/${customerToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      if (response.status === 200) {
        setCustomers(customers.filter(customer => customer.id !== customerToDelete.id));
        setDeleteCustomerDialog(false);
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/customers`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      setCustomers(response.data);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };
  const handleSaveChangesClick = async (editedCustomer) => {
    try {
      const response = await axios.put(`${BACKEND_BASE_URL}/customers/${editedCustomer.id}`, editedCustomer, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log('Customer edited successfully');
        setEditCustomerModalOpen(false);
        setEditingCustomer(null);
        await fetchCustomers();
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };
  const sortedAndSearchedCustomers = customers
    .filter(customer =>
      `${customer.firstname} ${customer.lastname} ${customer.email} ${customer.role}`
        .toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1) * (order === 'asc' ? 1 : -1));
  return (
    <>
      <TextField
        label='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleSort('id')}>
                  Id
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'firstname'}
                  direction={orderBy === 'firstname' ? order : 'asc'}
                  onClick={() => handleSort('firstname')}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'lastname'}
                  direction={orderBy === 'lastname' ? order : 'asc'}
                  onClick={() => handleSort('lastname')}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'role'}
                  direction={orderBy === 'role' ? order : 'asc'}
                  onClick={() => handleSort('role')}
                >
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAndSearchedCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell component='th' scope='row'>{customer.id}</TableCell>
                <TableCell align='right'>{customer.firstname}</TableCell>
                <TableCell align='right'>{customer.lastname}</TableCell>
                <TableCell align='right'>{customer.email}</TableCell>
                <TableCell align='right'>{customer.role}</TableCell>
                <TableCell align='right'>
                  <Button onClick={() => {
                    setEditingCustomer(customer);
                    setEditCustomerModalOpen(true);
                  }}>Edit</Button>
                  <Button variant='contained' color='secondary'
                          onClick={() => handleDeleteClick(customer)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <EditCustomerDialog
          open={editCustomerModalOpen}
          onClose={() => setEditCustomerModalOpen(false)}
          customer={editingCustomer}
          setUpdatedCustomer={setEditingCustomer}
          handleClose={() => setEditCustomerModalOpen(false)}
          handleUpdate={fetchCustomers}
        />
        <DeleteCustomerDialog
          open={deleteCustomerDialog}
          onClose={() => setDeleteCustomerDialog(false)}
          onConfirm={handleConfirmDelete}
        />
      </TableContainer>
    </>
  );
}