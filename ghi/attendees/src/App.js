function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <div>
      <table>
        <thead>
          {/* for (let attendee of props.attendees) {
            <tr>
              <td>{ attendee.name }</td>
              <td>{ attendee.conference }</td>
            </tr>
          } */}
          {props.attendees.map(attendee => {
            return (
              <tr key={attendee.href}>
                <td>{ attendee.name }</td>
                <td>{ attendee.conference }</td>
              </tr>
            );
          })}
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  );
}

export default App;