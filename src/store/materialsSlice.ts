import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudyMaterial, StudentNote } from '../types';

const INITIAL_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'Wave Particle Duality & Schrödinger Formulation - Complete Lecture Slides',
    subject: 'Quantum Physics',
    batch: 'Batch Alpha (2026)',
    uploadedBy: 'Prof. Sarah Jenkins',
    uploadDate: '2026-10-18',
    fileSize: '4.8 MB',
    fileType: 'pdf',
    downloadUrl: '#'
  },
  {
    id: 'mat-2',
    title: 'Multivariable Calculus: Green & Stokes Theorem Practice Problem Set',
    subject: 'Pure Mathematics',
    batch: 'Batch Alpha (2026)',
    uploadedBy: 'Dr. Alistair Vance',
    uploadDate: '2026-10-15',
    fileSize: '2.1 MB',
    fileType: 'pdf',
    downloadUrl: '#'
  },
  {
    id: 'mat-3',
    title: 'Organic Chemistry Lab Manual: Safe Synthesis Protocols 2026',
    subject: 'Chemistry',
    batch: 'Batch Alpha (2026)',
    uploadedBy: 'Dr. Helen Brooks',
    uploadDate: '2026-10-10',
    fileSize: '6.4 MB',
    fileType: 'doc',
    downloadUrl: '#'
  },
  {
    id: 'mat-4',
    title: 'Recorded Masterclass: Binary Search Trees & Balanced Trees',
    subject: 'Computer Science',
    batch: 'Batch Alpha (2026)',
    uploadedBy: 'Eng. Dev Ray',
    uploadDate: '2026-10-08',
    fileSize: '185 MB',
    fileType: 'video',
    downloadUrl: '#'
  }
];

const INITIAL_NOTES: StudentNote[] = [
  {
    id: 'note-1',
    title: 'Quantum Tunneling Key Formulas',
    subject: 'Quantum Physics',
    content: 'Barrier penetration probability: T ≈ e^(-2γL) where γ = sqrt(2m(V0 - E))/hbar. Useful for alpha decay derivations.',
    date: '2026-10-20',
    tags: ['Physics', 'Exam-Prep', 'Formulas']
  },
  {
    id: 'note-2',
    title: 'Matrix Diagonalization Shortcut',
    subject: 'Pure Mathematics',
    content: 'Remember: If all eigenvalues are distinct, matrix is always diagonalizable. Check determinant and trace first!',
    date: '2026-10-18',
    tags: ['Math', 'Linear-Algebra']
  }
];

interface MaterialsState {
  materials: StudyMaterial[];
  studentNotes: StudentNote[];
  filterSubject: string;
}

const initialState: MaterialsState = {
  materials: INITIAL_MATERIALS,
  studentNotes: INITIAL_NOTES,
  filterSubject: 'All'
};

export const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    uploadMaterial: (state, action: PayloadAction<Omit<StudyMaterial, 'id' | 'uploadDate'>>) => {
      const newMat: StudyMaterial = {
        ...action.payload,
        id: `mat-${Date.now()}`,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      state.materials.unshift(newMat);
    },
    deleteMaterial: (state, action: PayloadAction<string>) => {
      state.materials = state.materials.filter(m => m.id !== action.payload);
    },
    addStudentNote: (state, action: PayloadAction<Omit<StudentNote, 'id' | 'date'>>) => {
      const newNote: StudentNote = {
        ...action.payload,
        id: `note-${Date.now()}`,
        date: new Date().toISOString().split('T')[0]
      };
      state.studentNotes.unshift(newNote);
    },
    deleteStudentNote: (state, action: PayloadAction<string>) => {
      state.studentNotes = state.studentNotes.filter(n => n.id !== action.payload);
    },
    setMaterialSubjectFilter: (state, action: PayloadAction<string>) => {
      state.filterSubject = action.payload;
    }
  }
});

export const {
  uploadMaterial,
  deleteMaterial,
  addStudentNote,
  deleteStudentNote,
  setMaterialSubjectFilter
} = materialsSlice.actions;
export default materialsSlice.reducer;
