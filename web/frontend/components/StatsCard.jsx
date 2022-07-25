import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

async function getCount(dataset, key, value) {
  let count;
  const url = `/api/${dataset}/filter`;
  const body = {"tag_entry": {"category":value}};

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    count = await response.json();
    console.log(count);
    // return count.length;
  }
  // else {
  //   return 1;
  // }
}

export function StatsCard() {
  // const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  // const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();


  // Get total material count from Tag table
  // const {
  //   data: materials,
  //   isLoading: isLoadingMaterials,
  // } = useAppQuery({
  //   url: "/api/tag_entries/filter",
  //   fetchInit: {
  //     method: "POST",
  //     body: JSON.stringify({"category":"Material"}),
  //     headers: { "Content-Type": "application/json" },
  //   },
  //   reactQueryOptions: {
  //     onSuccess: () => {
  //       setIsLoading(false);
  //     },
  //   },
  // });
  // // Get total color count from Tag table
  // const {
  //   data: colors,
  //   isLoading: isLoadingColors,
  // } = useAppQuery({
  //   url: "/api/tag_entries/filter",
  //   fetchInit: {
  //     method: "POST",
  //     body: JSON.stringify({"category":"Color"}),
  //     headers: { "Content-Type": "application/json" },
  //   },
  //   reactQueryOptions: {
  //     onSuccess: () => {
  //       setIsLoading(false);
  //     },
  //   },
  // });async function getCount(dataset, key, value) {
    
  // const [isLoadingMaterials, setLoadingMaterials] = useState(true);
  // const materials = async() => {
  //   const url = `/api/tag_entries/filter`;
  //   const body = {"tag_entry": {"category":"Material"}};

  //   const response = await fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify(body),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   if (response.ok) {
  //     // materials = await response.json();
  //     console.log("done");
  //     setLoadingMaterials(false);
  //   }
  // }
  // const materials = getCount("tag_entries", "category", "Material");
  // Get total products from Shopify table
  const {
    data: products,
    isLoading: isLoadingProducts,
  } = useAppQuery({
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });


  // const toastMarkup = toastProps.content && !isRefetchingCount && (
  //   <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  // );

  // const handlePopulate = async () => {
  //   setIsLoading(true);
  //   const response = await fetch("/api/products/create");

  //   if (response.ok) {
  //     await refetchProductCount();
  //     setToastProps({ content: "5 products created!" });
  //   } else {
  //     setIsLoading(false);
  //     setToastProps({
  //       content: "There was an error creating products",
  //       error: true,
  //     });
  //   }
  // };

  return (
    <>
      {/* {toastMarkup} */}
      <Card
        title="Database Stats"
        sectioned
        primaryFooterAction={ null
          // {content: "Populate 5 products",
          // onAction: handlePopulate,
          // loading: isLoading,}
        }
      >
        <TextContainer spacing="loose">
          <Heading element="h4">
            TOTAL FABRICS
            <DisplayText size="medium">
              <TextStyle variation="strong">
              </TextStyle>
            </DisplayText>
          </Heading>
          <Heading element="h4">
            ACTIVE FABRICS
            <DisplayText size="medium">
              <TextStyle variation="strong">
              </TextStyle>
            </DisplayText>
          </Heading>
          <Heading element="h4">
            HIDDEN FABRICS
            <DisplayText size="medium">
              <TextStyle variation="strong">
              </TextStyle>
            </DisplayText>
          </Heading>
          <Heading element="h4">
            TOTAL COLORS
            <DisplayText size="medium">
              <TextStyle variation="strong">
                {/* {isLoadingColors ? "-" : colors.length} */}
                {/* {getCount("tag_entries", "category", "Color").length} */}
              </TextStyle>
            </DisplayText>
          </Heading>
          <Heading element="h4">
            TOTAL MATERIALS
            <DisplayText size="medium">
              <TextStyle variation="strong">
                {/* {isLoadingMaterials ? "-" : materials.length} */}
                {/* {getCount("tag_entries", "category", "Material").length} */}
              </TextStyle>
            </DisplayText>
          </Heading>
          <Heading element="h4">
            TOTAL PRODUCTS
            <DisplayText size="medium">
              <TextStyle variation="strong">
                {isLoadingProducts ? "-" : products.count}
              </TextStyle>
            </DisplayText>
          </Heading>
        </TextContainer>
      </Card>
    </>
  );
}
