class Record extends React.Component {
  render () {
    return(
      <tr key={this.props.data}>
        <td>{this.props.data.date}</td>
        <td>{this.props.data.title}</td>
        <td>{this.props.data.amount}</td>
      </tr>
    );
  }
}
