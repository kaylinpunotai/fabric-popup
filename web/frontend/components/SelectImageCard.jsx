import { DropZone, Stack, Banner, List, Card, MediaCard } from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

///// WIP /////

function ImageDrop( props ) {
  const [file, setFile] = useState(props.file);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      setFile((file) => acceptedFiles[0]);
      setRejectedFiles(rejectedFiles);
    },
    []
  );

  const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];

  const fileUpload = !file && (
    <DropZone.FileUpload actionHint="Accepts .jpg and .png" />
  );

  const uploadedFile = file && (
    <MediaCard
      title={file.name}
      description={file.size + " bytes"}
    >
      <img
        alt={file.name}
        width="100%"
        height="100%"
        style={{ objectFit: "cover", objectPosition: "center" }}
        src={
          validImageTypes.includes(file.type)
            ? window.URL.createObjectURL(file)
            : NoteMinor
        }
      />
      {console.log(file)}
    </MediaCard>
  );

  const errorMessage = hasError && (
    <Banner
      title="This file could not be uploaded"
      status="critical"
    >
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {'"${file.name}" is not supported. File type must be .jpg or .png.'}
          </List.Item>
        ))}
      </List>
    </Banner>
  )

  return (
    <Stack vertical>
      {errorMessage}
      <DropZone allowMultiple={false} accept="image/*" type="image" onDrop={handleDropZoneDrop}>
        {uploadedFile}
        {fileUpload}
      </DropZone>
    </Stack>
  );
}

export class SelectImageCard extends React.Component {
  render() {
    const cardTitle = this.props.CardTitle;
    const file = this.props.Content;

    return(
      <Card title={cardTitle} sectioned>
        <ImageDrop file={file}></ImageDrop>
      </Card>
    );
  }
}