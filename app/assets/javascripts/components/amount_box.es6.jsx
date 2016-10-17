class AmountBox extends React.Component {
  render () {
    classes = "panel panel-" + this.props.type
    console.log(this.props.amount)
    return (
      <div className="col-md-4">
        <div className={classes}>
          <div className="panel-heading">
            {this.props.text}
          </div>
          <div className="panel-body">
            {amountFormat(this.props.amount)}
          </div>
        </div>
      </div>
    );
  }
}
