class Record extends React.Component {
  constructor(){
    super()
    this.handleDelete = this.handleDelete.bind(this);
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

  render () {
    return(
      <tr key={this.props.data}>
        <td>{this.props.data.date}</td>
        <td>{this.props.data.title}</td>
        <td>{amountFormat(this.props.data.amount)}</td>
        <td><a href="javascript:;" className="btn btn-danger" onClick={this.handleDelete}>Delete</a></td>
      </tr>
    );
  }
}
