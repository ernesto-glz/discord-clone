import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllMessages } from 'src/api/message';
import { compareDates } from 'src/utils/date';
import { RootState } from '../configure-store';

export interface MessageState {
  entities: object[];
  loading: 'idle' | 'loading' | 'failed';
}

const initialState: MessageState = {
  entities: [],
  loading: 'idle'
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (channelId: string) => {
    const { data } = await getAllMessages(channelId);

    if (data?.docs?.length) {
      let lastMessage: any = null;

      const messagesFound = data.docs.reverse().map((message: any) => {
        let result: any;

        if (
          lastMessage &&
          lastMessage.sender._id === message.sender._id &&
          compareDates(lastMessage.createdAt, message.createdAt)
        ) {
          result = { ...message, stackMessage: true };
        } else {
          result = { ...message };
        }

        lastMessage = message;
        return result;
      });

      return messagesFound;
    }

    return [];
  }
);

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const messages = state.entities;
      let newMessage = action.payload;
      const lastMessage: any = messages[messages.length - 1];
      if (
        lastMessage &&
        lastMessage.sender._id === newMessage.sender._id &&
        compareDates(lastMessage.createdAt, newMessage.createdAt)
      ) {
        newMessage = { ...newMessage, stackMessage: true };
      }

      state.entities.push(newMessage);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = 'failed';
      });
  }
});

export const selectMessages = (state: RootState) => {
  return state.messages.entities;
};
export const isLoadingMessages = (state: RootState) => {
  return state.messages.loading;
};
export const actions = messageSlice.actions;
export default messageSlice.reducer;
