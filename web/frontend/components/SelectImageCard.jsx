import { DropZone, Stack, Banner, List, Card, MediaCard } from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";


function ImageDrop( props ) {
  const [file, setFile] = useState(null);
  const [existingUrl, setExistingUrl] = useState(props?.Url || null);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      setFile((file) => acceptedFiles[0]);
      setRejectedFiles(rejectedFiles);
      props.PassValue(acceptedFiles[0]);
    },
    []
  );

  const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];

  const fileUpload = (!file && !existingUrl) ? (
    <DropZone.FileUpload actionHint="Accepts .jpg and .png" />
  ) : null;

  const uploadedFile = (file) ? (
    <MediaCard
      portrait
      title={file.name}
      description="New images will be uploaded to Settings -> Files"
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
    </MediaCard>
  ): null;

  const existingFile = (!file && existingUrl) ? (
    <MediaCard
      portrait
      title={existingUrl.substring(existingUrl.lastIndexOf("/")+1)}
      description="New images will be uploaded to Settings -> Files"
    >
      <img
        width="100%"
        height="100%"
        style={{ objectFit: "cover", objectPosition: "center" }}
        src={existingUrl}
      />
    </MediaCard>
  ): null;

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

  const onImageRemove = useCallback(() => {
    props.PassValue(null);
    setFile(null);
    setExistingUrl(null);
  []});

  return (
    <Card title={props.CardTitle} sectioned 
      actions={[
        { content: "Remove image",
          onAction: onImageRemove,
          disabled: !file && !existingUrl,
        }
      ]}
    >
      <Stack vertical>
        {errorMessage}
        <DropZone allowMultiple={false} accept="image/*" type="image" onDrop={handleDropZoneDrop}>
          {uploadedFile}
          {fileUpload}
          {existingFile}
        </DropZone>
      </Stack>
    </Card>
  );
}

export class SelectImageCard extends React.Component {
  render() {
    const cardTitle = this.props.CardTitle;
    const existingUrl = this.props.Content;
    const passValue = this.props.PassValue;

    return(
      <ImageDrop CardTitle={cardTitle} Url={existingUrl} PassValue={passValue}></ImageDrop>
    );
  }
}