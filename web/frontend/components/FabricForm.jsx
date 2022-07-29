import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Card,
  Form,
  FormLayout,
  Button,
  Stack,
  Checkbox,
  ChoiceList,
  TextField,
  DropZone,
  Banner,
  MediaCard,
  List,
  TextStyle,
  Tag,
  Listbox,
  EmptySearchResult,
  Combobox,
  Frame,
  Toast
  
} from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";
import {
  useAppBridge,
  useNavigate,
  TitleBar
} from "@shopify/app-bridge-react";
import { useAuthenticatedFetch, useAppQuery } from "../hooks";
import { useForm, useField, notEmptyString } from "@shopify/react-form";
import FormData from "form-data";
import { LoadingCard } from "../components/LoadingCard";
import { SelectImageCard } from "../components/SelectImageCard";
import { SelectTagCard } from "../components/SelectTagCard";


export function FabricForm ({ Entry: InitialEntry, Title:name, Breadcrumbs:breadcrumbs }) {
  const debug = false;
  const [Entry, setEntry] = useState(InitialEntry);
  const navigate = useNavigate();
  const appBridge = useAppBridge();
  const authFetch = useAuthenticatedFetch();

  // imgFile = full image file
  // imgUrl = image url from Shopify Files
  // imgCreated = datetime of image upload to Shopify Files
  const [imgFile, setImgFile] = useState();
  const [imgUrl, setImgUrl] = useState(Entry?.image || "");
  const [uploading, setUploading] = useState(false);
  const [doneUploading, setDoneUploading] = useState(false);
  const [imgAdded, setImgAdded] = useState(false);

  const toggleUploading = useCallback(() => setUploading((uploading) => !uploading), []);
  const toggleDoneUploading = useCallback(() => setDoneUploading((doneUploading) => !doneUploading), []);

  const handleImgFileChange = useCallback((value) => {
    setImgFile(value);
    if (value==null) {
      setImgUrl("");
    }
    else {
      setImgAdded(true);
    }
  });

  const [mat, setMat] = useState(Entry?.material || []);
  const handleMatChange = useCallback((value) => {
    setMat(value);
  });
  const [col, setCol] = useState(Entry?.color || []);
  const handleColChange = useCallback((value) => {
    setCol(value);
  });
  const [stat, setStat] = useState(Entry?.status || "Active");
  const handleStatChange = useCallback((value) => {
    value ? setStat("Hidden") : setStat("Active");
  });
  const [note, setNote] = useState(Entry?.notes || "");
  const handleNoteChange = useCallback((value) => {
    setNote(value);
  });

  // Function for async delay
  const delay = ms => new Promise(res => setTimeout(res, ms));


  // Function to save entry
  const onSubmit = useCallback( (body) => {

    (async () => {
      let parsedBody = body;
      parsedBody.material = parsedBody.material.value;
      parsedBody.color = parsedBody.color.value;
      parsedBody.status = parsedBody.status.value;
      parsedBody.notes = parsedBody.notes.value;
      parsedBody.image = parsedBody.image.value;

      const EntryId = Entry?.id;
      const url = EntryId ? `/api/fabric_entries/update/${EntryId}` : "/api/fabric_entries";
      const method = EntryId ? "PATCH" : "POST";
      const response = await authFetch(url, {
        method: method,
        body: JSON.stringify(parsedBody),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        addNewTags("Material", parsedBody.material);
        addNewTags("Color", parsedBody.color);
        navigate(`/fabrics/fabric-table`);
      }
    }) ();

    return { status: "success" };
  },[imgAdded]);


  // Function to upload new images
  useEffect( () => {

    const checkForUpload = async() => {
      if (imgAdded) {
        setUploading(true);
        await sendUpload(imgFile);
        await delay(2000);
        setImgAdded(false);
      }
    }
    checkForUpload();

    return { status: "success" };
  },[imgAdded]);



  // Function to delete entry
  const deleteEntry = useCallback(
    async () => {
      reset();
      if (Entry?.id) {
        const response = await authFetch(`/api/fabric_entries/delete/${Entry.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          navigate(`/fabrics/fabric-table`);
        }
      } else {
        navigate("/fabrics/fabric-table")
      } 
    [Entry]}
  );

  // Function to compare submitted tags to existing tags. Add any tags that don't exist.
  // str type = "Material" or "Color"
  // str submitted = tags that were submitted in the form. Need to parse to be str[]
  async function addNewTags(type, submitted) {
    // Get existing tags
    const getExisting = await authFetch(`/api/tag_entries/${type}`);
    if (getExisting.ok) {
      const existing = await getExisting.json();
      const parsedSubmitted = JSON.parse(submitted);

      // Compare submitted to existing tags
      parsedSubmitted.forEach( (tag) => {
        // If the tag doesn't exist, then add it to the database
        if (!existing.includes(String(tag))) {
          authFetch("/api/tag_entries", {
            method: "POST",
            body: JSON.stringify({"tag_entry": {
              "category": type,
              "name": String(tag),
              "notes": "Generated by fabric form",
            }}),
            headers: { "Content-Type": "application/json" },
          });
        }
      });
    }
  }


  // Function to upload the submitted image to Files
  async function sendUpload(upload){
    const input = {
      "input": {
        "fileSize": upload.size,
        "filename": upload.name,
        "httpMethod": "POST",
        "mimeType": upload.type,
        "resource": "IMAGE",
      }
    };
    // Create temp url for image uplaod
    const create = await authFetch("/api/images/create", 
      {
        method: "POST",
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (create.ok) {
      const createResult = await create.json();

      // Temp url is hosted by Shopify's AWS servers. Must generate a form to 
      // post file data to Shopify's aws s3 bucket
      const awsUrl = createResult.url;
      const resourceUrl = createResult.resourceUrl;
      const params = createResult.parameters;
      const awsForm = new FormData();
      params.forEach(( {name, value} ) => {
        awsForm.append(name, value);
      });
      awsForm.append("file", upload);
      const aws = await fetch(awsUrl, {
        method: "POST",
        body: awsForm,
        headers: { 
          "Content-Length": upload.size + 5000,
         }
      });
      if (aws.ok) {
        await aws.text();

        // Upload the posted file to Shopify
        const uploadFile = await authFetch("/api/images/upload", 
          {
            method: "POST",
            body: JSON.stringify({"resourceUrl": resourceUrl}),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (uploadFile.ok) {
          const uploadResult = await uploadFile.json();

          // wait 5 seconds for Shopify to finish processing the image
          await delay(5000); 
          const createdAt = uploadResult.createdAt;
          const getFile = await authFetch("/api/images/get",
            {
              method: "POST",
              body: JSON.stringify({"creation": createdAt}),
              headers: { "Content-Type": "application/json" },
            }
          )
          if (getFile.ok) {
            const getFileResult = await getFile.json();
            setDoneUploading(true);
            setImgUrl(getFileResult.image.url);
            console.log(getFileResult.image.url);
          }
        }
      }
    }
  };


  // Entry values when you click Save
  const {
    fields: {
      title,
      image,
      material,
      color,
      status,
      notes,
    },
    dirty,
    reset,
    submit,
    makeClean,
  } = useForm({
    fields: {
      title: useField({
        value: Entry?.title || "",
        validates: [notEmptyString("Name required")],
      }),
      image: useField({
        value: imgUrl,
      }),
      material: useField({
        value: mat,
      }),
      color: useField({
        value: col,
      }),
      status: useField({
        value: stat,
      }),
      notes: useField({
        value: note,
      }),
    },
    onSubmit,
  });

  const uploadingMarkup = uploading ? (
    <Toast content="Uploading image..." onDismiss={toggleUploading} duration={10000}/>
  ) : null;

  const doneUploadingMarkup = (doneUploading && imgUrl != "")  ? (
    <Toast content="Upload completed" onDismiss={toggleDoneUploading}/>
  ) : null;


  return (
    <Form>
      <TitleBar
        title={name}
        breadcrumbs={breadcrumbs}
        primaryAction={{
          content: "Save",
          onAction: submit,
          disabled: uploading && !doneUploading,

        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => navigate("/fabrics/fabric-table"),
          },
          {
            content: "Delete",
            onAction: deleteEntry,
            destructive: true,
            disabled: name == "New Fabric",
          }
        ]}
      />
      <FormLayout>
        <Card title="Name" sectioned>
          <TextField
            {...title}
            helpText={"Visible to customers"}
          />
        </Card>
        <SelectImageCard 
          CardTitle="Upload Image"
          Content={Entry ? Entry.image : null}
          PassValue={handleImgFileChange}
        />
        <SelectTagCard 
          TagType="Material"
          Content={Entry ? Entry.material : "[]"}
          PassValue={handleMatChange}
        />
        <SelectTagCard 
          TagType="Color"
          Content={Entry ? Entry.color : "[]"}
          PassValue={handleColChange}
        />
        <Card sectioned>
          <Checkbox 
            label="Hide entry" 
            checked={stat=="Hidden" ? true : false} 
            onChange={handleStatChange}
            helpText={"Hidden entries will not be visible to customers"}
          />
        </Card>
        <Card title="Notes" sectioned>
          <TextField
            value={note}
            onChange={handleNoteChange}
            helpText={"Only visible to you"}
            multiline={4}
          />
        </Card>
      </FormLayout>
      <Frame>
        {uploadingMarkup}
        {doneUploadingMarkup}
      </Frame>
    </Form>
  );
}