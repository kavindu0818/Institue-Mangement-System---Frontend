import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle2, AlertCircle, ShieldCheck, DollarSign } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { payInvoice, setFeeFilter } from '../../store/feesSlice';
import { FeeInvoice } from '../../types';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const ParentFeesView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { invoices, filterStatus } = useAppSelector((state) => state.fees);

  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Visa ending in 8841)');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleOpenPay = (inv: FeeInvoice) => {
    setSelectedInvoice(inv);
    setIsPayModalOpen(true);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    dispatch(
      payInvoice({
        invoiceId: selectedInvoice.id,
        paymentMethod,
      })
    );
    setIsPayModalOpen(false);
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 3000);
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (filterStatus === 'All') return true;
    return inv.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Tuition Fees & Invoices
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Figma Screens: "Fees" & "Payment history" — Review tuition installments, lab fees, and download official payment receipts
          </p>
        </div>
      </div>

      {paymentSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-sm font-bold text-emerald-950">
              Payment Confirmed & Verified!
            </p>
            <p className="text-xs text-emerald-700">
              Official tax invoice & receipt has been sent to your registered email.
            </p>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm w-fit">
        {['All', 'Paid', 'Pending', 'Overdue'].map((status) => (
          <button
            key={status}
            onClick={() => dispatch(setFeeFilter(status))}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === status
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3.5 pl-6">Invoice No</th>
                <th className="py-3.5">Description</th>
                <th className="py-3.5">Billing Month</th>
                <th className="py-3.5">Amount</th>
                <th className="py-3.5">Due Date</th>
                <th className="py-3.5">Status</th>
                <th className="py-3.5 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 pl-6 font-mono text-xs font-bold text-slate-600">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-4 font-semibold text-slate-900">
                    <div>{inv.title}</div>
                    {inv.transactionId && (
                      <span className="text-[10px] text-slate-400 font-mono block">
                        Txn: {inv.transactionId} ({inv.paymentMethod})
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-slate-600">{inv.month}</td>
                  <td className="py-4 font-bold text-slate-900 text-sm">
                    Rs. {inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 text-slate-500">{inv.dueDate}</td>
                  <td className="py-4">
                    <Badge
                      variant={
                        inv.status === 'Paid'
                          ? 'success'
                          : inv.status === 'Pending'
                          ? 'warning'
                          : 'danger'
                      }
                      dot={true}
                    >
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="py-4 pr-6 text-right">
                    {inv.status === 'Paid' ? (
                      <button
                        onClick={() =>
                          alert(`Downloading Official Payment Receipt for ${inv.invoiceNumber}`)
                        }
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" /> Receipt
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenPay(inv)}
                        className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors inline-flex items-center gap-1.5"
                      >
                        <CreditCard className="w-3.5 h-3.5" /> Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Checkout Modal */}
      <Modal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title={`Tuition Fee Checkout - ${selectedInvoice?.invoiceNumber}`}
        description="Figma Component: 'Fees' — Secure online student tuition payment gateway."
        maxWidth="md"
      >
        <form onSubmit={handleConfirmPayment} className="space-y-4">
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
            <span className="text-xs text-purple-700 font-medium block">
              Total Amount Due
            </span>
            <span className="text-3xl font-extrabold text-purple-950 mt-1 block">
              Rs. {selectedInvoice?.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-purple-600 mt-1 block">
              Invoice for: {selectedInvoice?.title}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-semibold"
            >
              <option value="Commercial Bank Visa Card (ending in 8841)">
                Commercial Bank Visa Card ending in 8841 (Default)
              </option>
              <option value="Sampath Bank Mastercard (ending in 2041)">
                Sampath Bank Mastercard ending in 2041
              </option>
              <option value="Hatton National Bank (HNB) Direct Transfer">
                Hatton National Bank (HNB) Direct Transfer
              </option>
              <option value="Bank of Ceylon (BOC) Online Banking">
                Bank of Ceylon (BOC) Online Banking
              </option>
              <option value="Frimi / Genie / LANKAQR Mobile Wallet">
                Frimi / Genie / LANKAQR Mobile Wallet
              </option>
            </select>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>256-bit encrypted SSL checkout with instant receipt generation.</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsPayModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md shadow-purple-600/20"
            >
              Confirm & Pay Rs. {selectedInvoice?.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
