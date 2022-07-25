import { TextField, Card } from "@shopify/polaris";
import { useState, useCallback } from "react";


// props
// str caption = subtitle under header
// int lines = number of lines for textbox
// str existingText = initial text in textfield
// function passValue(newValue) = updates textfield content in parent form
function MultilineField( props ) {
  const existingText = props.content;

  const [value, setValue] = useState(existingText);

  const handleChange = useCallback((newValue) => {
    setValue(newValue)
    props.passValue(newValue);
  }, []);

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
    const passValue = this.props.PassValue;
    var lines = 1;

    if (multi == "true") {
      lines = 4;
    }

    return(
      <Card title={cardTitle} sectioned>
        <MultilineField caption={caption} lines={lines} content={content} passValue={passValue}></MultilineField>
      </Card>
    );
  }
}