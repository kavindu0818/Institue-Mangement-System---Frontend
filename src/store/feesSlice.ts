import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeeInvoice } from '../types';

const INITIAL_INVOICES: FeeInvoice[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-089',
    studentId: 'stu-1',
    studentName: 'Alex Morgan',
    title: 'Term 3 Tuition & Advanced STEM Lab Fee',
    month: 'October 2026',
    amount: 15000.00,
    dueDate: '2026-10-15',
    paidDate: '2026-10-12',
    status: 'Paid',
    paymentMethod: 'Commercial Bank Credit Card (Visa ending in 8841)',
    transactionId: 'TXN-948102948'
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-090',
    studentId: 'stu-1',
    studentName: 'Alex Morgan',
    title: 'Term 4 Tuition Fee & Practical Session Fee',
    month: 'November 2026',
    amount: 15000.00,
    dueDate: '2026-11-15',
    status: 'Pending'
  },
  {
    id: 'inv-103',
    invoiceNumber: 'INV-2026-074',
    studentId: 'stu-1',
    studentName: 'Alex Morgan',
    title: 'Term 2 Tuition & Science Consortium Access',
    month: 'September 2026',
    amount: 15000.00,
    dueDate: '2026-09-15',
    paidDate: '2026-09-10',
    status: 'Paid',
    paymentMethod: 'Direct Bank Transfer (Sampath Bank)',
    transactionId: 'TXN-820193821'
  },
  {
    id: 'inv-104',
    invoiceNumber: 'INV-2026-091',
    studentId: 'stu-3',
    studentName: 'Marcus Williams',
    title: 'Term 3 Tuition Fee',
    month: 'October 2026',
    amount: 12500.00,
    dueDate: '2026-10-15',
    status: 'Pending'
  },
  {
    id: 'inv-105',
    invoiceNumber: 'INV-2026-092',
    studentId: 'stu-5',
    studentName: 'Zackary Taylor',
    title: 'Term 3 Tuition Fee',
    month: 'October 2026',
    amount: 12500.00,
    dueDate: '2026-10-05',
    status: 'Overdue'
  }
];

interface FeesState {
  invoices: FeeInvoice[];
  filterStatus: string;
}

const initialState: FeesState = {
  invoices: INITIAL_INVOICES,
  filterStatus: 'All'
};

export const feesSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    payInvoice: (
      state,
      action: PayloadAction<{ invoiceId: string; paymentMethod: string }>
    ) => {
      const invoice = state.invoices.find(inv => inv.id === action.payload.invoiceId);
      if (invoice) {
        invoice.status = 'Paid';
        invoice.paidDate = new Date().toISOString().split('T')[0];
        invoice.paymentMethod = action.payload.paymentMethod;
        invoice.transactionId = `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`;
      }
    },
    setFeeFilter: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
    }
  }
});

export const { payInvoice, setFeeFilter } = feesSlice.actions;
export default feesSlice.reducer;
