import { formatPhpCurrency } from '../../../utils/currency';

function BillingTransactionRow({ transaction }) {
  return (
    <div className="table-row">
      <div className="col-date">
        {new Date(transaction.serviceDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>
      <div className="col-description">
        <div className="description-main">{transaction.description}</div>
        <div className="description-sub">{transaction.category}</div>
      </div>
      <div className="col-provider">{transaction.provider}</div>
      <div className="col-amount">{formatPhpCurrency(transaction.amount)}</div>
      <div className="col-status">
        <span className={`payment-badge ${transaction.paymentStatus}`}>
          {transaction.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
        </span>
      </div>
    </div>
  );
}

export default BillingTransactionRow;
