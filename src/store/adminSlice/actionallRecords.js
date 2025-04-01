import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";



export const AllRecordofUser = createAsyncThunk(
    'allrecord/AllRecordofUser',
    async ({ page = 1, filters, sort }, { rejectWithValue }) => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      const { name, email, status} = filters;
      const { sortBy, sortOrder } = sort;
  
      try {
        const response = await fetch(
          `http://localhost:5000/admin/allUserList?page=${page}&name=${name}&email=${email}&status=${status}&sortOrder=${sortOrder}`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
  
        const data = await response.json();
        //console.log("I am Action" + JSON.stringify(data,null,2));
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  export const updateUserStatus = createAsyncThunk(
    'allrecord/updateUserStatus',
    async ({ userId, newStatus }, { rejectWithValue }) => {
       
      const token = localStorage.getItem('token');
  
      if (!token) {
        const errorMessage = 'No token found in localStorage';
        toast.error(errorMessage);
        return rejectWithValue({ message: errorMessage, status: 'error' });
      }
  
      try {
        const obj = {
          status: newStatus,
          id: userId,
        };
  
        const response = await fetch(`http://localhost:5000/admin/updateuserStatus/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(obj),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          const message = errorData.message || 'Failed to update contact status';
          const status = errorData.status || 'error';
          toast.error(message);
          return rejectWithValue({ message, status });
        }
  
        const data = await response.json();
        toast.success(data.message);
        return data;
  
      } catch (error) {
        const errorMessage = error.message || 'An unexpected error occurred';
        toast.error(errorMessage);
        return rejectWithValue({ message: errorMessage, status: 'error' });
      }
    }
  );

  export const allfetchContacts = createAsyncThunk(
    'allrecord/allfetchContacts',
    async ({ page = 1, filters, sort }, { rejectWithValue }) => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      const { name, email, mobile, category, status } = filters;
      const { sortBy, sortOrder } = sort;
  
      try {
        const response = await fetch(
          `http://localhost:5000/admin/allUserContacts?page=${page}&name=${name}&email=${email}&mobile=${mobile}&category=${category}&sortBy=${sortBy}&status=${status}&sortOrder=${sortOrder}`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
  
        const data = await response.json();
         return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  
  export const updateContactStatusFlag = createAsyncThunk(
    'allrecord/updateContactStatusFlag',
    async ({ userId, newStatus }, { rejectWithValue }) => {
       
      const token = localStorage.getItem('token');
  
      if (!token) {
        const errorMessage = 'No token found in localStorage';
        toast.error(errorMessage);
        return rejectWithValue({ message: errorMessage, status: 'error' });
      }
  
      try {
        const obj = {
          status: newStatus,
          id: userId,
        };
  
        const response = await fetch(`http://localhost:5000/admin/updateContactStatus/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(obj),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          const message = errorData.message || 'Failed to update contact status';
          const status = errorData.status || 'error';
          toast.error(message);
          return rejectWithValue({ message, status });
        }
  
        const data = await response.json();
        toast.success(data.message);
        return data;
  
      } catch (error) {
        const errorMessage = error.message || 'An unexpected error occurred';
        toast.error(errorMessage);
        return rejectWithValue({ message: errorMessage, status: 'error' });
      }
    }
  );
  

  // Total Counts

  
export const fetchTotalContacts = createAsyncThunk(
    'allrecord/fetchTotalContacts',
    async (TotalConatcts,{ rejectWithValue }) => {
     
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      try {
        const response = await fetch(
          `http://localhost:5000/admin/getContactTotalCount`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
  
        const data = await response.json();
        //console.log(JSON.stringify(data,null,2));
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  
  // Get Toatl Favorite Contacts
  export const fetchTotalFavoriteContacts = createAsyncThunk(
    'allrecord/fetchTotalFavoriteContacts',
    async (TotalFavoriteConatcts,{ rejectWithValue }) => {
     
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      try {
        const response = await fetch(
          `http://localhost:5000/admin/getFavoriteContact`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
  
        const data = await response.json();
        console.log(JSON.stringify(data,null,2));
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const fetchTotalGroupsCount = createAsyncThunk(
    'allrecord/fetchTotalGroupsCount',
    async (TotalCountGroups,{ rejectWithValue }) => {
    console.log("I am Action of Group")
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      try {
        const response = await fetch(`http://localhost:5000/admin/gettotalgroups`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
  
        const data = await response.json();
        console.log("Total Group " + data);
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );