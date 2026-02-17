import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

// 비동기 액션 생성
export const getLectureSno = createAsyncThunk(
  "lectures/getLectureSno",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get('/lecture/sno');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLectureList = createAsyncThunk(
  "lectures/getLectureList",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get('/lecture', {params: {...query}});

      if(response.status !== 200) {
        throw new Error(response.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLectureDetail = createAsyncThunk(
  "lectures/getLectureDetail",
  async (id, { rejectWithValue }) => {}
);

export const createLecture = createAsyncThunk(
  "lectures/createLecture",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/lecture', formData);

      if(response.status !== 200){
        throw new Error(response.error);
      }

      dispatch(showToastMessage({message: '강의 등록 완료', status: 'success'}));
      dispatch(getLectureList({page: 1}));

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteLecture = createAsyncThunk(
  "lectures/deleteLecture",
  async (id, { dispatch, rejectWithValue }) => {}
);

export const editLecture = createAsyncThunk(
  "lectures/editLecture",
  async ({ id, ...formData }, { dispatch, rejectWithValue }) => {}
);

// 슬라이스 생성
const lectureSlice = createSlice({
  name: "lectures",
  initialState: {
    lectureList: [],
    selectedLecture: null,
    lectureSno: '',
    loading: false,
    error: "",
    totalPageNum: 1,
    success: false,
  },
  reducers: {
    setSelectedLecture: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilteredList: (state, action) => {
      state.filteredList = action.payload;
    },
    clearError: (state) => {
      state.error = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
  builder
    .addCase(getLectureSno.pending, (state) => {
      state.error = "";
    })
    .addCase(getLectureSno.fulfilled, (state, action) => {
      state.lectureSno = action.payload.sno;
    })
    .addCase(getLectureSno.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(createLecture.pending, (state) => {
      state.loading = true;
    })
    .addCase(createLecture.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.success = true;
    })
    .addCase(createLecture.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase(getLectureList.pending, (state) => {
      state.loading = true;
    })
    .addCase(getLectureList.fulfilled, (state, action) => {
      state.loading = false;
      state.lectureList = action.payload.data;
      state.totalPageNum = action.payload.totalPageNum;
      state.error = '';
    })
    .addCase(getLectureList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setSelectedLecture, setFilteredList, clearError } =
  lectureSlice.actions;
export default lectureSlice.reducer;
