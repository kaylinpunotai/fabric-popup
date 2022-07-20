import { useState, useCallback } from "react";
import {
  Card,
  Form,
  FormLayout,
  Button,
  Stack,
  Checkbox,
  ChoiceList,
} from "@shopify/polaris";
import {
  useAppBridge,
  useNavigate,
} from "@shopify/app-bridge-react";
import { useAuthenticatedFetch, useAppQuery } from "../hooks";
import { useForm, useField, notEmptyString } from "@shopify/react-form";
import { TextInputCard } from "./TextInputCard";

// Radio button card to select tag category (Material or Color)
function CategoryCard() {
  const [selected, setSelected] = useState(["color"]);

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <Card title="Category" sectioned>
      <ChoiceList
        choices={[
          { label: "Color", value: "color" },
          { label: "Material", value: "material" },
        ]}
        selected={selected}
        onChange={handleChange}
      />
    </Card>
  );
}


export function TagForm ({ Tag: InitialTag }) {
  const [Tag, setProps] = useState(InitialTag);
  const navigate = useNavigate();
  const appBridge = useAppBridge();
  const fetch = useAuthenticatedFetch();

  // Function to save tag
  const onSubmit = (body) => console.log("submit", body);

  // Function to delete tag
  const isDeleting = false;
  const deleteTag = () => console.log("delete");

  // Tag values when you click Save
  const {
    fields: {
      name,
      category,
      notes,
      count,
    },
    dirty,
    reset,
    submit,
    makeClean,
  } = useForm({
    fields: {
      name: useField({
        value: Tag?.name || "",
        validates: [notEmptyString("Name required")],
      }),
      category: useField({
        value: Tag?.category || "",
      }),
      notes: useField({
        value: Tag?.notes || "",
      }),
      count: useField({
        value: 1,
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
          Content={Tag ? Tag.name : ""}
        />
        <CategoryCard/>
        <TextInputCard 
          CardTitle="Notes" 
          Caption="Only visible to you" 
          MultiLine="true"
          Content={Tag ? Tag.notes : ""}
        />
      </FormLayout>
    </Form>
  );
}