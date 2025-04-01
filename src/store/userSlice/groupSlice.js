import { createSlice } from "@reduxjs/toolkit";
import { addGroup, contactAssignToGroup, deleteContactDetailsRecord, deleteGroup, fetchAssignedContacts, fetchContactDetails, fetchContactsToGroup, fetchGroups, fetchTotalGroupsCount, getGrouptByuserId, updateGroup, updateGroupStatus } from "./actionGroup";

const initialState = {
    groups: [],
    loading: false,
    error: null,
    groupsingleRecord: {},
    contactDetailsArrayObject:{},
    TotalCountGroups: 0,
    contactToGroup: [],
    assignedContactToGroup: [], // using for the Assing Contact to Group page 
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalContacts: 0,
        limit: 15
    },
}

const groupSlice = createSlice({
        name: 'group',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          // Fetch groups
          builder
            .addCase(fetchGroups.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
              state.loading = false;
              state.groups = action.payload.groups;
              
            })
            .addCase(fetchGroups.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            });

         // Fetch Contact for Assign to Group
         builder
              .addCase(fetchContactsToGroup.pending, (state) => {
                  state.loading = true;
              })
              .addCase(fetchContactsToGroup.fulfilled, (state, action) => {
                  state.loading = false;
                  state.contactToGroup = action.payload.contacts;
                  state.pagination = action.payload.pagination;
                  //console.log(">>> + " +  JSON.stringify(action.payload.pagination, null, 2));
              })
              .addCase(fetchContactsToGroup.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.error.message;
              });

          // Fetch Group Assign By User Id contacts
          builder
          .addCase(fetchAssignedContacts.pending, (state) => {
              state.loading = true;
          })
          .addCase(fetchAssignedContacts.fulfilled, (state, action) => {
              state.loading = false;
              
              state.assignedContactToGroup = action.payload.userAssignments;
              state.pagination = action.payload.pagination;
              //console.log(">>> + " +  JSON.stringify(action.payload.pagination, null, 2));
          })
          .addCase(fetchAssignedContacts.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
          });

          // Fetch Contact by Group by Ids
          builder.addCase(fetchContactDetails.pending, (state) => {
              state.loading = true;
              state.status = 'loading';
              state.error = null;
          })
          .addCase(fetchContactDetails.fulfilled, (state, action) => {
              state.loading = false;
              state.contactDetailsArrayObject = action.payload.contacts;
              state.status = '200';
          })
          .addCase(fetchContactDetails.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload.message;
              state.status = action.payload.status;
          });
          // Delete ID of collection
          
          builder.addCase(deleteContactDetailsRecord.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteContactDetailsRecord.fulfilled, (state, action) => {
            state.loading = false;
          })
          .addCase(deleteContactDetailsRecord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });

         // Add group
          builder.addCase(addGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addGroup.fulfilled, (state, action) => {
            state.loading = false;
            state.groups.push(action.payload);
          })
          .addCase(addGroup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });

          // update group
          builder.addCase(updateGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateGroup.fulfilled, (state, action) => {
            state.loading = false;
            state.groups.push(action.payload);
          })
          .addCase(updateGroup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });

         // Delete group
         builder.addCase(deleteGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteGroup.fulfilled, (state, action) => {
            state.loading = false;
          })
          .addCase(deleteGroup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });

          builder.addCase(updateGroupStatus.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateGroupStatus.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateGroupStatus.rejected, (state, action) => {
                state.loading = false;
                if (action.payload && action.payload.status) {
                    state.status = action.payload.status;
                } else {
                    state.status = 'error';
                }
                state.error = action.payload ? action.payload.message : 'Failed to update status';
            });

             //Get Single Group
             builder.addCase(getGrouptByuserId.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getGrouptByuserId.fulfilled, (state, action) => {
                state.loading = false;
                state.groupsingleRecord = {...state.groupsingleRecord, ...action.payload};
                state.status = '200';
            })
            .addCase(getGrouptByuserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = action.payload.status;
            });

            // Contact Slice add to group
              builder.addCase(contactAssignToGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(contactAssignToGroup.fulfilled, (state, action) => {
                state.loading = false;
                //state.groups.push(action.payload);
              })
              .addCase(contactAssignToGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
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
        },
    });
    
    export default groupSlice.reducer;