class RecordForm extends React.Component {
  constructor(){
    super();
    this.state = {title: '', date: '', amount: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    name = e.target.name
    this.setState({ [e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    $.ajax({
     type: "POST",// GET in place of POST
     url: '/records',
     data : { record: this.state },
     dataType: "json",
     success: function (data) {
       console.log(data)
       this.props.handleNewRecord(data);
       this.setState({title: '', amount: '', date: ''})
     }.bind(this),
     error: function (){
        window.alert("something went wrong!");
      }
   });
  }

  render () {
    return (
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className='form-control' placeholder='Date' name='date' value={this.state.date} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="text" className='form-control' placeholder='Title' name='title' value={this.state.title} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="text" className='form-control' placeholder='Amount' name='amount' value={this.state.amount} onChange={this.handleChange} />
          </div>
          <input type="submit" className="btn btn-primary" name='Create Record' />
        </form>
    );
  }
}
