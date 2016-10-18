class Record extends React.Component {
  constructor(){
    super();
    this.state = { edit: false};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.recordRow = this.recordRow.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleToggle(e){
    e.preventDefault();
    this.setState({edit: !(this.state.edit)});
  }

  handleEdit(e){
    e.preventDefault($(this.refs.title).value);
    data = {
      title: $(this.refs.title).val(),
      date: $(this.refs.date).val(),
      amount: $(this.refs.amount).val(),
      id: this.props.data.id
    }
    $.ajax({
     type: "PUT",
     url: '/records/' + this.props.data.id,
     data : { record: data },
     dataType: "json",
     success: function(data){
       this.setState({edit: false});
       this.props.handleEditRecord(this.props.data, data);
     }.bind(this),
     error: function(){
        window.alert("something went wrong!");
     }
   });
  }

  handleDelete(e){
    e.preventDefault();
    $.ajax({
     type: "DELETE",// GET in place of POST
     url: '/records/' + this.props.data.id,
     data : { record: this.state },
     dataType: "json",
     success: function (data) {
       this.props.handleDeleteRecord(this.props.data);
     }.bind(this),
     error: function (){
        window.alert("something went wrong!");
      }
   });
  }

  recordRow(){
    return(
      <tr key={this.props.data}>
        <td>{this.props.data.date}</td>
        <td>{this.props.data.title}</td>
        <td>{amountFormat(this.props.data.amount)}</td>
        <td>
          <a href="javascript:;" className="btn btn-default" onClick={this.handleToggle}>Edit</a>
          <a href="javascript:;" className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    );
  }

  recordForm(){
    return(
      <tr key={this.props.data}>
        <td><input type="text" className="form-control" defaultValue={this.props.data.date} ref="date" /></td>
        <td><input type="text" className="form-control" defaultValue={this.props.data.title} ref="title"/></td>
        <td><input type="text" className="form-control" defaultValue={this.props.data.amount} ref="amount"/></td>
        <td>
          <a href="javascript:;" className="btn btn-default" onClick={this.handleEdit}>Update</a>
          <a href="javascript:;" className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    );
  }

  render(){
    if (this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }
}
