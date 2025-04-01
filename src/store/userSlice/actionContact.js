import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async ({ page = 1, filters, sort }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    const { name, email, mobile , category, status , isFavorite} = filters;
    const { sortBy, sortOrder } = sort;

    try {
      const response = await fetch(
        `http://localhost:5000/contacts/getcontactsByUser?page=${page}&name=${name}&email=${email}&mobile=${mobile}&category=${category}&isFavorite=${isFavorite}&sortBy=${sortBy}&status=${status}&sortOrder=${sortOrder}`, 
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

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contactData, { rejectWithValue }) => {
      const token = localStorage.getItem('token');
      if (!token) {
        const errorMessage = 'No token found in localStorage';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
  
      try {
        const response = await fetch('http://localhost:5000/contacts/addcontact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(contactData),
        });
  
        if (!response.ok) {
            const errorData = await response.json();
            const status = errorData.status;
            const message = errorData.message || 'Failed to add contact';
            toast.error(message);
            return rejectWithValue({ status, message });
          }
  
        const data = await response.json();
        toast.success("Contact Added Successfully");
        return data;
  
      } catch (error) {
        const errorMessage = error.message || 'An unexpected error occurred';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  );

export const editContacts = createAsyncThunk('contacts/editContacts',
    async (editdataValue, { rejectWithValue }) => {
    
    const token = localStorage.getItem('token');
    if (!token) {
      const errorMessage = 'No token found in localStorage';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
    const id = '67dae622d63d188e6da4327c';
    try {
      const response = await fetch(`http://localhost:5000/contacts/updatecontact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editdataValue),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const status = errorData.status;
        const message = errorData.message || 'Failed to add contact';
        toast.error(message);
        return rejectWithValue({ status, message });
      }

      const data = await response.json();
      toast.success("Contact Updated Successfully");
      return data;

    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }

  })

export const getContactByuserId = createAsyncThunk(
  'contacts/getContactByuserId',
  async (userId, {rejectWithValue}) => {
      try {

        const token = localStorage.getItem('token');

      if (!token) {
          throw new Error('No token found in localStorage');
      }

      const response = await fetch(`http://localhost:5000/contacts/getcontactById/${userId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const status = errorData.status;
        const message = errorData.message || 'Conatct not found';
        toast.error(message);
        return rejectWithValue({ status, message });
      }

      const data = await response.json();
      return data;
      
     } catch (error) {
          console.error('Error fetching contacts:', error);
          toast.error(error.message);
          return rejectWithValue(error.message);
      }
      
  }
);

export const updateConatcts = createAsyncThunk(
  'contacts/updateConatcts',
  async (contactData, { rejectWithValue }) => {
    console.log(">>> " + JSON.stringify(contactData,null,2))
    const token = localStorage.getItem('token');
    
    if (!token) {
      const errorMessage = 'No token found in localStorage';
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }

    try {
      const response = await fetch(`http://localhost:5000/contacts/updatecontact/${contactData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const status = errorData.status || 400;
        const message = errorData.message || 'Failed to update contact';
        
        toast.error(message);
        return rejectWithValue({ status, message });
      }

      const data = await response.json();
      toast.success("Contact Updated Successfully");
      return data;

    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      const errorMessage = 'No token found in localStorage';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
    try {
      const response = await fetch(`http://localhost:5000/contacts/deletecontact/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        const status = errorData.status;  
        const message = errorData.message || 'Failed to delete contact';
        toast.error(message);
        return rejectWithValue({ status, message });
      } 

      const data = await response.json();
      toast.success("Contact Deleted Successfully");
      return data;

    } catch (error) { 
      const errorMessage = error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
}
);

export const updateContactStatus = createAsyncThunk(
  'contacts/updateContactStatus',
  async ({ contactId, newStatus }, { rejectWithValue }) => {
    
    const token = localStorage.getItem('token');

    if (!token) {
      const errorMessage = 'No token found in localStorage';
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage, status: 'error' });
    }

    try {
      const obj = {
        status: newStatus,
        id: contactId,
      };

      const response = await fetch(`http://localhost:5000/contacts/updatecontactstatus/${contactId}`, {
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

export const toggleFavoriteStatus = createAsyncThunk(
  'contacts/toggleFavoriteStatus',
  async ({ contactId, isFavorite }, { rejectWithValue }) => {
    
    const token = localStorage.getItem('token');

    if (!token) {
      const errorMessage = 'No token found in localStorage';
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage, status: 'error' });
    }

    try {
      const obj = {
        status: isFavorite,
        id: contactId,
      };

      const response = await fetch(`http://localhost:5000/contacts/updatecontactisFavorite/${contactId}`, {
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

// Get Total Contacts


export const fetchTotalContacts = createAsyncThunk(
  'contacts/fetchTotalContacts',
  async (TotalConatcts,{ rejectWithValue }) => {
    console.log('Fetching total contacts');
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    try {
      const response = await fetch(
        `http://localhost:5000/contacts/getContactTotalCount`, 
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
  'contacts/fetchTotalFavoriteContacts',
  async (TotalFavoriteConatcts,{ rejectWithValue }) => {
    console.log('Fetching total contacts');
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    try {
      const response = await fetch(
        `http://localhost:5000/contacts/getFavoriteContact`, 
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