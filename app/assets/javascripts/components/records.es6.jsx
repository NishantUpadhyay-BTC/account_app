
class Records extends React.Component {
  constructor(context,props){
    super(context,props);
    this.records = this.props.data || [];
    this.state = {records: this.records}
    this.addRecord = this.addRecord.bind(this)
    this.credits = this.credits.bind(this);
    this.debits = this.debits.bind(this);
    this.balance = this.balance.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.recordRow = this.recordRow.bind(this);
  }

  addRecord(record){
    records = React.addons.update(this.state.records, { $push: [record] })
    this.setState({records: records})
  }

  credits() {
    var credits;
    credits = this.state.records.filter(function(val) {
      return val.amount >= 0;
    });
    return credits.reduce((function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }), 0);
  }

  debits() {
    var debits;
    debits = this.state.records.filter(function(val) {
      return val.amount < 0;
    });
    return debits.reduce((function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }), 0);
  }

  balance() {
    return this.debits() + this.credits();
  }

  deleteRecord(record){
    //we can use $splice from react addon to make it more compact but as we are using
    // filter of es6, no need to make it more compact.
    records = this.state.records
    t = records.filter((data) => {
      return (data.id) != (record.id);
    });
    this.setState({records: t})
  }

  recordRow(record, index){
    return <Record key= {index} data={record} handleDeleteRecord={this.deleteRecord} />;
  }

  render () {
    return (
      <div>
        <h1> Records </h1>
        <AmountBox type='success' amount={this.credits()} text='CREDIT' />
        <AmountBox type='danger' amount={this.debits()} text='DEBITS' />
        <AmountBox type='info' amount={this.balance()} text='BALANCE' />
        <RecordForm handleNewRecord = {this.addRecord} />
        <table  className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {this.state.records.map(this.recordRow)}
        </tbody>
        </table>
      </div>
    );
  }
}

Records.defaultProps = { data: [] };
