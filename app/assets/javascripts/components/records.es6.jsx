
class Records extends React.Component {
  constructor(context,props){
    super(context,props);
    this.records = this.props.data || [];
    this.state = {records: this.records}
    this.addRecord = this.addRecord.bind(this)
  }

  recordRow(record, index){
    return <Record key= {index} data={record} />;
  }

  addRecord(record){
    let records = this.state.records.slice()
    records.push(record);
    this.setState({records: records})
  }

  render () {
    return (
      <div>
        <h1> Records </h1>
        <RecordForm handleNewRecord = {this.addRecord} />
        <table  className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
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
