import { TextField, Card } from "@shopify/polaris";
import { useState, useCallback } from "react";


// props
// str caption = subtitle under header
// int lines = number of lines for textbox
function MultilineField( props ) {
  const existingText = props.content;

  const [value, setValue] = useState(existingText);

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      helpText={props.caption}
      value={value}
      onChange={handleChange}
      multiline={props.lines}
      autoComplete="off"
    />
  );
}

export class TextInputCard extends React.Component {
  render() {
    const cardTitle = this.props.CardTitle;
    const caption = this.props.Caption;
    const multi = this.props.MultiLine;
    const content = this.props.Content;
    var lines = 1;

    if (multi == "true") {
      lines = 4;
    }

    return(
      <Card title={cardTitle} sectioned>
        <MultilineField caption={caption} lines={lines} content={content}></MultilineField>
      </Card>
    );
  }
}