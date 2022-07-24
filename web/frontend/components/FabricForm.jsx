import { useState, useCallback } from "react";
import {
  Card,
  Form,
  FormLayout,
  Button,
  Stack,
  Checkbox,
} from "@shopify/polaris";
import {
  useAppBridge,
  useNavigate,
} from "@shopify/app-bridge-react";
import { useAuthenticatedFetch, useAppQuery } from "../hooks";
import { useForm, useField, notEmptyString } from "@shopify/react-form";
import { SelectImageCard } from "./SelectImageCard";
import { SelectTagCard } from "./SelectTagCard";
import { TextInputCard } from "./TextInputCard";

// Toggle active/hidden status
function HiddenCheckbox( props ) {
  // Check existing status and convert to boolean
  var existingState = props.State == "Hidden" ? true : false;
  const [checked, setChecked] = useState(existingState);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  
  return(
    <Card sectioned>
      <Checkbox label="Hide entry" checked={checked} onChange={handleChange}/>
    </Card>
  );
}


export function FabricForm ({ Entry: InitialEntry }) {
  const [Entry, setEntry] = useState(InitialEntry);
  const navigate = useNavigate();
  const appBridge = useAppBridge();
  const fetch = useAuthenticatedFetch();

  // Function to save entry
  // const onSubmit = (body) => console.log("submit", body);
  // const onSubmit = useCallback(
  //   (body) => {
  //     (async () => {
  //       const parsedBody = body;
  //       parsedBody.destination = parsedBody.destination[0];
  //       const entryId = Entry?.id;
  //       const url = entryId ? '/api/fabric_entries/${entryId}' : "/api/fabric_entries";
  //       const method = entryId ? "PATCH" : "POST";
  //       const response = await fetch(url, {
  //         method,
  //         body: JSON.stringify(parsedBody),
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       if (response.ok) {
  //         makeClean();
  //         const Entry = await response.json();
  //         if (!entryId) {
  //           navigate('/fabrics/${Entry.id}');
  //         } else {
  //           setEntry(Entry);
  //         }
  //       }
  //     })();
  //     return { pageStatus: "success" }
  //   },
  //   [Entry, setEntry]
  // );

  // Function to delete entry
  // const isDeleting = false;
  // const deleteEntry = () => console.log("delete");


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
        value: Entry?.imageSrc || "",
      }),
      material: useField({
        value: Entry?.material || [],
      }),
      color: useField({
        value: Entry?.color || [],
      }),
      status: useField({
        value: Entry?.status || "Hidden",
      }),
      notes: useField({
        value: Entry?.notes || "",
      }),
    },
    onSubmit,
  });


  return (
    <Form>
      <FormLayout>
        <TextInputCard 
          CardTitle="Name" 
          Caption="Visible to customers" 
          MultiLine="false"
          Content={Entry ? Entry.title : ""}
        />
        <SelectImageCard 
          CardTitle="Upload Image"
          Content={Entry ? Entry.image : ""}
        />
        <SelectTagCard 
          TagType="Material"
          Content={Entry ? Entry.material : []}
        />
        <SelectTagCard 
          TagType="Color"
          Content={Entry ? Entry.color : []}
        />
        <HiddenCheckbox 
          State={Entry ? Entry.status : false} 
        />
        <TextInputCard 
          CardTitle="Notes" 
          Caption="Only visible to you" 
          MultiLine="true"
          Content={Entry ? Entry.notes : ""}
        />
      </FormLayout>
    </Form>
  );
}