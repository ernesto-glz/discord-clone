import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllMessages } from 'src/api/message';
import { Message } from 'src/models/message.model';
import { compareDates } from 'src/utils/date';
import { RootState } from '../configure-store';

export interface MessageState {
  entities: Message[];
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
      const messagesFound = data.docs
        .reverse()
        .map((message: Message, index: number) => {
          const prev = data.docs[index - 1];
          const { sender } = message;

          if (!prev || prev.sender !== sender) return { ...message };

          return {
            ...message,
            stackMessage: compareDates(prev.createdAt, message.createdAt)
          };
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
    addMessage: (state, { payload }) => {
      const message = payload;
      const prev = state.entities[state.entities.length - 1];
      const { sender } = message;

      if (!prev || prev.sender !== sender) {
        state.entities.push({ ...message });
        return;
      }

      state.entities.push({
        ...message,
        stackMessage: compareDates(prev.createdAt, message.createdAt)
      });
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

export const isLoadingMessages = (state: RootState) => {
  return state.messages.loading;
};
export const actions = messageSlice.actions;
export default messageSlice.reducer;
