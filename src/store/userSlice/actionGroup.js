import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

export const fetchGroups = createAsyncThunk(
    'group/fetchGroups',
    async ({ page = 1, filters, sort }, { rejectWithValue }) => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      const { name, status} = filters;
      const { sortBy, sortOrder } = sort;
  
      try {
        
        const response = await fetch(
          `http://localhost:5000/groups/getgroups?page=${page}&name=${name}&sortBy=${sortBy}&status=${status}&sortOrder=${sortOrder}`, 
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

  // Fetch Contacts to Group
  export const fetchContactsToGroup = createAsyncThunk(
    'group/fetchContactsToGroup',
    async ({ page = 1, filters, sort }, { rejectWithValue }) => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
      //console.log("I am Action" + JSON.stringify(filters,null,2));
      const { name, email, mobile , category, status} = filters;
      const { sortBy, sortOrder } = sort;
       console
      try {
        const response = await fetch(
          `http://localhost:5000/contacts/getcontactsByGroups?page=${page}&name=${name}&email=${email}&mobile=${mobile}&category=${category}&sortBy=${sortBy}&status=${status}&sortOrder=${sortOrder}`, 
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


  // Fetch Assigned Conatct by user Ids
   // Fetch Contacts to Group
   export const fetchAssignedContacts = createAsyncThunk(
    'group/fetchAssignedContacts',
    async ({ page = 1, filters, sort }, { rejectWithValue }) => {
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
      
      //console.log("I am Action" + JSON.stringify(filters,null,2));
      const { group_name} = filters;
      //console.log("I am Action" + JSON.stringify(group_name,null,2));
      const { sortBy, sortOrder } = sort;
      
      try {
        const response = await fetch(
          `http://localhost:5000/assigncontactgroup/UserwiseAssignedContact?page=${page}&group_name=${group_name}&sortBy=${sortBy}&sortOrder=${sortOrder}`, 
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
        //console.log("I am Action Assigned by contact " + JSON.stringify(data,null,2));
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  //Group Wise contact fetch 
  export const fetchContactDetails = createAsyncThunk(
    'group/fetchContactDetails',
    async (groupID, {rejectWithValue}) => {
        try {
          const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found in localStorage');
        }
  
        const response = await fetch(`http://localhost:5000/assigncontactgroup/${groupID}`, {
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
        //console.log("I am Action 1 " + JSON.stringify(data,null,2));
        return data;
        
       } catch (error) {
            console.error('Error fetching contacts:', error);
            toast.error(error.message);
            return rejectWithValue(error.message);
        }
        
    }
  );

  // Constact Deatils Record Delete

  export const deleteContactDetailsRecord = createAsyncThunk(
    'group/deleteContactDetailsRecord',
    async (collectionID, { rejectWithValue }) => {
     const token = localStorage.getItem('token');
      if (!token) {
        const errorMessage = 'No token found in localStorage';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
      try {
        const response = await fetch(`http://localhost:5000/assigncontactgroup/${collectionID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          const status = errorData.status;  
          const message = errorData.message || 'Failed to delete group';
          toast.error(message);
          return rejectWithValue({ status, message });
        } 
  
        const data = await response.json();
        toast.success(data.message? data.message:"Remove contact from group successfully");
        return data;
  
      } catch (error) { 
        const errorMessage = error.message || 'An unexpected error occurred';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
  }
  );


  export const addGroup = createAsyncThunk(
    'group/addGroup',
    async (contactData, { rejectWithValue }) => {
        //console.log("I am Action" + JSON.stringify(contactData,null,2));
      const token = localStorage.getItem('token');
      if (!token) {
        const errorMessage = 'No token found in localStorage';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
  
      try {
        const response = await fetch('http://localhost:5000/groups/creategroup', {
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
            const message = errorData.message || 'Failed to add group';
            toast.error(message);
            return rejectWithValue({ status, message });
          }
  
        const data = await response.json();
        toast.success("Group Added Successfully");
        return data;
  
      } catch (error) {
        const errorMessage = error.message || 'An unexpected error occurred';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  );


  export const deleteGroup = createAsyncThunk(
    'group/deleteGroup',
    async (contactId, { rejectWithValue }) => {
     const token = localStorage.getItem('token');
      if (!token) {
        const errorMessage = 'No token found in localStorage';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
      try {
        const response = await fetch(`http://localhost:5000/groups/deletegroup/${contactId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          const status = errorData.status;  
          const message = errorData.message || 'Failed to delete group';
          toast.error(message);
          return rejectWithValue({ status, message });
        } 
  
        const data = await response.json();
        toast.success("Group Deleted Successfully");
        return data;
  
      } catch (error) { 
        const errorMessage = error.message || 'An unexpected error occurred';
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
  }
  );


  export const updateGroupStatus = createAsyncThunk(
    'group/updateGroupStatus',
    async ({ groupId, newStatus }, { rejectWithValue }) => {
      
      const token = localStorage.getItem('token');
  
      if (!token) {
        const errorMessage = 'No token found in localStorage';
        toast.error(errorMessage);
        return rejectWithValue({ message: errorMessage, status: 'error' });
      }
  
      try {
        const obj = {
          status: newStatus,
          id: groupId,
        };
  
        const response = await fetch(`http://localhost:5000/groups/updategroupstatus/${groupId}`, {
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

  // Get Single Group
  export const getGrouptByuserId = createAsyncThunk(
    'group/getGrouptByuserId',
    async (userId, {rejectWithValue}) => {
        try {
          const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found in localStorage');
        }
  
        const response = await fetch(`http://localhost:5000/groups/getgroupbyid/${userId}`, {
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


  // Update Group
  export const updateGroup = createAsyncThunk(
    'group/updateGroup',
    async (contactData, { rejectWithValue }) => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        const errorMessage = 'No token found in localStorage';
        toast.error(errorMessage);
        return rejectWithValue({ message: errorMessage });
      }
  
      try {
        const response = await fetch(`http://localhost:5000/groups/updategroup/${contactData.id}`, {
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
          const message = errorData.message || 'Failed to update group';
          
          toast.error(message);
          return rejectWithValue({ status, message });
        }
  
        const data = await response.json();
        toast.success("Group Updated Successfully");
        return data;
  
      } catch (error) {
        const errorMessage = error.message || 'An unexpected error occurred';
        toast.error(errorMessage);
        return rejectWithValue({ message: errorMessage });
      }
    }
  );

// Contact add to group
export const contactAssignToGroup = createAsyncThunk(
  'group/contactAssignToGroup',
  async ({ contactIds, groupId }, { rejectWithValue }) => {
    //console.log("I am Action" + JSON.stringify(contactIds,null,2) + JSON.stringify(groupId,null,2));
    const token = localStorage.getItem('token');
    
    if (!token) {
      const errorMessage = 'No token found in localStorage';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }

    try {
      // Make the API request to assign the contact(s) to the group
      const response = await fetch('http://localhost:5000/assigncontactgroup/assignContactsingleToGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ contactIds, groupId }), // Pass contactIds and groupId in the request body
      });

      // If the response is not OK, handle error
      if (!response.ok) {
        const errorData = await response.json();
        const status = errorData.status;
        const message = errorData.message || 'Failed to add contacts to group';
        toast.error(message);
        return rejectWithValue({ status, message });
      }

      // Successful response
      const data = await response.json();
      toast.success("Contacts added to the group successfully");
      return data;

    } catch (error) {
      // Handle unexpected errors
      const errorMessage = error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Get Toatl Group Contacts
export const fetchTotalGroupsCount = createAsyncThunk(
  'contacts/fetchTotalGroupsCount',
  async (TotalCountGroups,{ rejectWithValue }) => {
   
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in localStorage');
    }

    try {
      const response = await fetch(
        `http://localhost:5000/groups/gettotalgroups`, 
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

