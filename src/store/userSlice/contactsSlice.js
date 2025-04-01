import { createSlice} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { addContact, deleteContact, editContacts, fetchContacts, fetchTotalContacts, fetchTotalFavoriteContacts, getContactByuserId, toggleFavoriteStatus, updateConatcts, updateContactStatus } from './actionContact';

const initialState = {
    contacts: [],
    contactsingleRecord: {},
    TotalConatcts: 0,
    TotalFavoriteConatcts: 0,
    loading: false,
    error: null,
    status: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalContacts: 0,
        limit: 15
    }
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload.contacts;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

            builder.addCase(addContact.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts.push(action.payload);
                state.status = '201';
            })
            .addCase(addContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = action.payload.status;
            });

            builder.addCase(editContacts.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(editContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts.push(action.payload);
                state.status = '201';
            })
            .addCase(editContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = action.payload.status;
            });

            builder.addCase(getContactByuserId.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getContactByuserId.fulfilled, (state, action) => {
                state.loading = false;
                state.contactsingleRecord = {...state.contactsingleRecord, ...action.payload};
                state.status = '200';
            })
            .addCase(getContactByuserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = action.payload.status;
            });

           builder
                .addCase(updateConatcts.pending, (state) => {
                    state.loading = true;
                    state.status = 'loading';
                    state.error = null;
                })
                .addCase(updateConatcts.fulfilled, (state, action) => {
                    state.loading = false;
                    state.status = 'success';
                    state.contactsingleRecord = { ...state.contactsingleRecord, ...action.payload };
                    state.error = null;
                })
                .addCase(updateConatcts.rejected, (state, action) => {
                    state.loading = false;
                    state.status = 'error';
                    if (action.payload && action.payload.message) {
                        state.error = action.payload.message;
                    } else {
                        state.error = 'Failed to update contact';
                    }
                    toast.error(state.error);
                });

            builder.addCase(deleteContact.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.status = '200';
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.loading = false;  
                state.error = action.payload;
                state.status = action.payload.status;
            });

            builder.addCase(updateContactStatus.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateContactStatus.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateContactStatus.rejected, (state, action) => {
                state.loading = false;
                if (action.payload && action.payload.status) {
                    state.status = action.payload.status;
                } else {
                    state.status = 'error';
                }
                state.error = action.payload ? action.payload.message : 'Failed to update status';
            });

            builder.addCase(toggleFavoriteStatus.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(toggleFavoriteStatus.rejected, (state, action) => {
                state.loading = false;
                if (action.payload && action.payload.status) {
                    state.status = action.payload.status;
                } else {
                    state.status = 'error';
                }
                state.error = action.payload ? action.payload.message : 'Failed to update status';
            });
             //TotalConatcts
            builder.addCase(fetchTotalContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTotalContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.TotalConatcts = action.payload.totalContacts;
            })
            .addCase(fetchTotalContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

            // Get Total Favorite Contacts
              //TotalConatcts
              builder.addCase(fetchTotalFavoriteContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTotalFavoriteContacts.fulfilled, (state, action) => {
                state.loading = false;
                //console.log("action.payload.totalFavoriteContacts", action.payload.totalFavoriteContacts);
                state.TotalFavoriteConatcts = action.payload.totalFavoriteContacts;
            })
            .addCase(fetchTotalFavoriteContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default contactsSlice.reducer;
