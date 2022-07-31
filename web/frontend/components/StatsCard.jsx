import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  Stack
} from "@shopify/polaris";
import { useAppQuery } from "../hooks";

export function StatsCard() {
  const [isLoading, setIsLoading] = useState(true);

  // Get total fabric count from Fabric table
  const {
    data: totalFabric,
    isLoading: isLoadingTotalFabric,
  } = useAppQuery({
    url: "/api/fabric_entries/index",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });
  // Get total active count from Fabric table
  const {
    data: actives,
    isLoading: isLoadingActives,
  } = useAppQuery({
    url: "/api/fabric_entries/active",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });
  // Get total hidden count from Fabric table
  const {
    data: hiddens,
    isLoading: isLoadingHiddens,
  } = useAppQuery({
    url: "/api/fabric_entries/hidden",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });
  // Get total material count from Tag table
  const {
    data: materials,
    isLoading: isLoadingMaterials,
  } = useAppQuery({
    url: "/api/tag_entries/Material",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });
  // // Get total color count from Tag table
  const {
    data: colors,
    isLoading: isLoadingColors,
  } = useAppQuery({
    url: "/api/tag_entries/Color",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });
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

  return (
    <>
      <Card
        title="Database Stats"
        sectioned
        primaryFooterAction={null}
      >
        <Stack>
          <TextContainer spacing="loose">
            <Heading element="h4">
              TOTAL FABRICS
              <DisplayText size="medium">
                <TextStyle variation="strong">
                  {isLoadingTotalFabric ? "-" : totalFabric.length}
                </TextStyle>
              </DisplayText>
            </Heading>
            <Heading element="h4">
              ACTIVE FABRICS
              <DisplayText size="medium">
                <TextStyle variation="strong">
                  {isLoadingActives ? "-" : actives.length}
                </TextStyle>
              </DisplayText>
            </Heading>
            <Heading element="h4">
              HIDDEN FABRICS
              <DisplayText size="medium">
                <TextStyle variation="strong">
                  {isLoadingHiddens ? "-" : hiddens.length}
                </TextStyle>
              </DisplayText>
            </Heading>
            <Heading element="h4">
              TOTAL COLORS
              <DisplayText size="medium">
                <TextStyle variation="strong">
                  {isLoadingColors ? "-" : colors.length}
                </TextStyle>
              </DisplayText>
            </Heading>
            <Heading element="h4">
              TOTAL MATERIALS
              <DisplayText size="medium">
                <TextStyle variation="strong">
                  {isLoadingMaterials ? "-" : materials.length}
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
        </Stack>
      </Card>
    </>
  );
}
