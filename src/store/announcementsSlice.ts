import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Announcement } from '../types';

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Mid-Term Examination Schedule Released (Semester Fall 2026)',
    content: 'The official datesheets for the upcoming Mid-Term examinations across Science, Mathematics, and Computing have now been uploaded to the portal. Please review your respective schedule and venue requirements.',
    author: 'Dr. Alistair Vance',
    authorRole: 'institute',
    targetAudience: 'All',
    date: '2026-10-21',
    priority: 'High',
    pinned: true
  },
  {
    id: 'ann-2',
    title: 'Physics Practical Lab Guidelines & Safety Equipment Notice',
    content: 'All students enrolled in Quantum Mechanics and Electromagnetism sessions must bring their lab manuals and wear protective eyewear during Tuesday laboratory experiments.',
    author: 'Prof. Sarah Jenkins',
    authorRole: 'teacher',
    targetAudience: 'Students',
    date: '2026-10-20',
    priority: 'Normal'
  },
  {
    id: 'ann-3',
    title: 'Upcoming Parent-Teacher Consultations & Academic Review',
    content: 'Parent-Teacher conference meetings for Term 3 will be conducted both online and in-campus on Saturday, Nov 14th. Parents can schedule one-on-one appointments through the messages portal.',
    author: 'Central Administration',
    authorRole: 'institute',
    targetAudience: 'Parents',
    date: '2026-10-18',
    priority: 'High',
    pinned: true
  },
  {
    id: 'ann-4',
    title: 'Annual STEM Science Fair 2026 Registrations Open',
    content: 'We invite ambitious projects in Robotics, Renewable Energy, and Applied AI. Selected teams will receive lab sponsorship and research mentorship.',
    author: 'Prof. Sarah Jenkins',
    authorRole: 'teacher',
    targetAudience: 'Students',
    date: '2026-10-15',
    priority: 'Low'
  }
];

interface AnnouncementsState {
  announcements: Announcement[];
  filterAudience: string;
}

const initialState: AnnouncementsState = {
  announcements: INITIAL_ANNOUNCEMENTS,
  filterAudience: 'All'
};

export const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    addAnnouncement: (state, action: PayloadAction<Omit<Announcement, 'id' | 'date'>>) => {
      const newAnn: Announcement = {
        ...action.payload,
        id: `ann-${Date.now()}`,
        date: new Date().toISOString().split('T')[0]
      };
      state.announcements.unshift(newAnn);
    },
    deleteAnnouncement: (state, action: PayloadAction<string>) => {
      state.announcements = state.announcements.filter(a => a.id !== action.payload);
    },
    togglePinAnnouncement: (state, action: PayloadAction<string>) => {
      const ann = state.announcements.find(a => a.id === action.payload);
      if (ann) {
        ann.pinned = !ann.pinned;
      }
    },
    setFilterAudience: (state, action: PayloadAction<string>) => {
      state.filterAudience = action.payload;
    }
  }
});

export const { addAnnouncement, deleteAnnouncement, togglePinAnnouncement, setFilterAudience } = announcementsSlice.actions;
export default announcementsSlice.reducer;
