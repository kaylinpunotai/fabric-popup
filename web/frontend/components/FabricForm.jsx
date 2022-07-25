import { useState, useCallback, useMemo } from "react";
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
  Combobox
} from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";
import {
  useAppBridge,
  useNavigate,
  TitleBar
} from "@shopify/app-bridge-react";
import { useAuthenticatedFetch, useAppQuery } from "../hooks";
import { useForm, useField, notEmptyString } from "@shopify/react-form";
import { LoadingCard } from "../components/LoadingCard";
import { TextInputCard } from "../components/TextInputCard";
import { SelectImageCard } from "../components/SelectImageCard";
import { SelectTagCard } from "../components/SelectTagCard";


export function FabricForm ({ Entry: InitialEntry, Title:name, Breadcrumbs:breadcrumbs }) {
  const debug = false;
  const [Entry, setEntry] = useState(InitialEntry);
  const navigate = useNavigate();
  const appBridge = useAppBridge();
  const fetch = useAuthenticatedFetch();

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

  // (async () => {
  //   const materialTags = (await getTags("Material"));
  //   const colorTags = (await getTags("Color"));
  //   console.log(materialTags);
  // })()
  // const materialTags = getTags("Material");
  // console.log(materialTags);

  // Function to save entry
  const onSubmit = useCallback(
    (body) => {
      (async () => {
        const parsedBody = body;
        parsedBody.material = parsedBody.material.value;
        parsedBody.color = parsedBody.color.value;
        parsedBody.status = parsedBody.status.value;
        parsedBody.notes = parsedBody.notes.value;
        const EntryId = Entry?.id;
        const url = EntryId ? `/api/fabric_entries/update/${EntryId}` : "/api/fabric_entries";
        const method = EntryId ? "PATCH" : "POST";
        const response = await fetch(url, {
          method: method,
          body: JSON.stringify(parsedBody),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          navigate(`/fabrics/fabric-table`);
        }
      }) ();
      return { status: "success" };
    },
    [Entry, setEntry]
  );


  // Function to delete entry
  const deleteEntry = useCallback(
    async () => {
      reset();
      if (Entry?.id) {
        const response = await fetch(`/api/fabric_entries/delete/${Entry.id}`, {
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
        value: Entry?.imageSrc || null,
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


  return (
    <Form>
      <TitleBar
        title={name}
        breadcrumbs={breadcrumbs}
        primaryAction={{
          content: "Save",
          onAction: submit,
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
        <SelectTagCard 
          TagType="Material"
          Content={Entry ? Entry.material : []}
          PassValue={handleMatChange}
        />
        <SelectTagCard 
          TagType="Color"
          Content={Entry ? Entry.color : []}
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
    </Form>
  );
}



// Get distinct names of tags
// Category = "Material" or "Color"
// async function getTags(category) {
//   const url = "/api/tag_entries/distinct";
//   const body = {"arg": `category="${category}"`};

//   const response = await fetch(url, {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers: { "Content-Type": "application/json" },
//   });
//   if (response.ok) {
//     const result = await response.json();
//     return result;
//   }
// }
function getTags(category) {
  const url = "/api/tag_entries/distinct";
  const body = {"arg": `category="${category}"`};

  const promise = fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  promise.then((response) => {
    const jsondata = response.json();
    jsondata.then((data) => {
      return data;
    });
  });
  
}