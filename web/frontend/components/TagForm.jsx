import { useState, useCallback } from "react";
import {
  Card,
  Form,
  FormLayout,
  Button,
  Stack,
  Checkbox,
  ChoiceList,
  TextField
} from "@shopify/polaris";
import {
  useAppBridge,
  useNavigate,
} from "@shopify/app-bridge-react";
import { useAuthenticatedFetch, useAppQuery } from "../hooks";
import { useForm, useField, notEmptyString } from "@shopify/react-form";


export function TagForm ({ Tag: InitialTag }) {
  const [Tag, setTag] = useState(InitialTag);
  const navigate = useNavigate();
  const appBridge = useAppBridge();
  const fetch = useAuthenticatedFetch();

  const [cat, setCat] = useState(Tag?.category || "Color");
  const handleCategoryChange = useCallback((value) => {
    // Tag.category = value[0]; 
    // setTag(Tag);
    setCat(value[0]);
  });

  const [note, setNote] = useState(Tag?.notes || "");
  const handleNoteChange = useCallback((value) => {
    // Tag.notes = value; 
    // setTag(Tag);
    setNote(value);
  },[]);

  // Function to save tag
  const onSubmit = useCallback(
    (body) => {
      (async () => {
        const parsedBody = body;
        parsedBody.category = parsedBody.category.value;
        parsedBody.notes = parsedBody.notes.value;
        const TagId = Tag?.id;
        const url = TagId ? `/api/tag_entries/update/${TagId}` : "/api/tag_entries";
        const method = TagId ? "PATCH" : "POST";
        const response = await fetch(url, {
          method: method,
          body: JSON.stringify(parsedBody),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          navigate(`/tags/tag-table`);
        }
      }) ();
      return { status: "success" };
    },
    [Tag, setTag]
  );

  // Function to delete tag
  const deleteTag = useCallback(
    async () => {
      reset();
      const response = await fetch(`/api/tag_entries/delete/${Tag.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        navigate(`/tags/tag-table`);
      }
    }, [Tag]
  );

  // Tag values when you click Save
  const {
    fields: {
      name,
      category,
      notes,
    },
    dirty,
    reset,
    submitting,
    submit,
    makeClean,
  } = useForm({
    fields: {
      name: useField({
        value: Tag?.name || "",
        validates: [notEmptyString("Name required")],
      }),
      category: useField({
        value: Tag?.category || cat,
      }),
      notes: useField({
        value: Tag?.notes || note,
      }),
    },
    onSubmit,
  });





  return (
    <Form>
      <Button onClick= {submit}>
        Save
      </Button>
      <Button onClick= {reset}>
        Cancel
      </Button>
      <Button onClick= {deleteTag}>
        Delete
      </Button>
      <FormLayout>
        <Card title="Name" sectioned>
          <TextField
            {...name}
            helpText={"Visible to customers"}
          />
        </Card>
        <Card title="Category" sectioned>
          <ChoiceList
            choices={[
              { label: "Color", value: "Color" },
              { label: "Material", value: "Material" },
            ]}
            selected={cat}
            onChange={handleCategoryChange}
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