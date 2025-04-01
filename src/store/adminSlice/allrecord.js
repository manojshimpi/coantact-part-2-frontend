import { createSlice } from "@reduxjs/toolkit";
import { allfetchContacts, AllRecordofUser, fetchTotalContacts, fetchTotalFavoriteContacts, fetchTotalGroupsCount, updateContactStatusFlag, updateUserStatus } from "./actionallRecords";

const initialState = {
    userAllList: [],
    userContacts: [],
    TotalConatcts:0,
    TotalFavoriteConatcts:0,
    TotalCountGroups:0,
    loading: false,
    error: null,
    status: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
        limit: 15
    }
};

const allrecordSlice = createSlice({
    name: 'allrecord',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(AllRecordofUser.pending, (state) => {
            state.status = "loading";
            })
            .addCase(AllRecordofUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.userAllList = action.payload.users;
            state.pagination = action.payload.pagination;
            
            })
            .addCase(AllRecordofUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            });

        // Get All Contacts
        
        builder
           .addCase(allfetchContacts.pending, (state) => {
            state.status = "loading";
            })
            .addCase(allfetchContacts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.userContacts = action.payload.userContacts;
            state.pagination = action.payload.pagination;
            
            })
            .addCase(allfetchContacts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            });

        // Status Update

        builder
           .addCase(updateUserStatus.pending, (state) => {
            state.status = "loading";
            })
            .addCase(updateUserStatus.fulfilled, (state, action) => {
            state.status = "succeeded";
            })
            .addCase(updateUserStatus.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            });

        // Update Contact Status
        builder
           .addCase(updateContactStatusFlag.pending, (state) => {
            state.status = "loading";
            })
            .addCase(updateContactStatusFlag.fulfilled, (state, action) => {
            state.status = "succeeded";
            })
            .addCase(updateContactStatusFlag.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            });

         // Total Counts

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

            //Toatl Group
           builder.addCase(fetchTotalGroupsCount.pending, (state) => {
            state.loading = true;
            })
            .addCase(fetchTotalGroupsCount.fulfilled, (state, action) => {
                state.loading = false;
                
                state.TotalCountGroups = action.payload.totalGroupsCounts;
            })
            .addCase(fetchTotalGroupsCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

            
    }
});


export default allrecordSlice.reducer