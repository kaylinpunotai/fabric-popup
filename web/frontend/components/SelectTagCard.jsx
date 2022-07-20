import { TextStyle, Stack, Tag, Listbox, EmptySearchResult, Combobox, Card, Select } from "@shopify/polaris";
import { useState, useCallback, useMemo } from "react";

// props 
// TagType = "Material" or "Color"
function SelectTag( props ) {
  const [selectedTags, setSelectedTags] = useState(props.ExistingTags);
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const updateSelection = useCallback(
    (selected) => {
      const nextSelectedTags = new Set([...selectedTags]);

      if (nextSelectedTags.has(selected)) {
        nextSelectedTags.delete(selected);
      } else {
        nextSelectedTags.add(selected);
      }
      setSelectedTags([...nextSelectedTags]);
      setValue("");
      setSuggestion("");
    },
    [selectedTags]
  );

  const removeTag = useCallback(
    (tag) => () => {
      updateSelection(tag);
    },
    [updateSelection]
  );

  const getAllTags = useCallback(() => {
    const savedTags = ["Cotton", "Felt", "Minky", "Silk"];
    return [...new Set([...savedTags, ...selectedTags].sort())];
  }, [selectedTags]);

  const formatOptionText = useCallback(
    (option) => {
      const trimValue = value.trim().toLocaleLowerCase();
      const matchIndex = option.toLocaleLowerCase().indexOf(trimValue);

      if (!value || matchIndex === -1) return option;

      const start = option.slice(0, matchIndex);
      const highlight = option.slice(matchIndex, matchIndex + trimValue.length);
      const end = option.slice(matchIndex + trimValue.length, option.length);

      return (
        <p>
          {start}
          <TextStyle variation="strong">{highlight}</TextStyle>
          {end}
        </p>
      );
    },
    [value]
  );

  const options = useMemo(() => {
    let list;
    const allTags = getAllTags();
    const filterRegex = new RegExp(value, "i");

    if (value) {
      list = allTags.filter((tag) => tag.match(filterRegex));
    } else {
      list = allTags;
    }

    return [...list];
  }, [value, getAllTags]);

  const verticalContentMarkup =
    selectedTags.length > 0 ? (
      <Stack spacing="extraTight" alignment="center">
        {selectedTags.map((tag) => (
          <Tag key={`option-${tag}`} onRemove={removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </Stack>
    ) : null;

  const optionMarkup =
    options.length > 0
      ? options.map((option) => {
          return (
            <Listbox.Option
              key={option}
              value={option}
              selected={selectedTags.includes(option)}
              accessibilityLabel={option}
            >
              <Listbox.TextOption selected={selectedTags.includes(option)}>
                {formatOptionText(option)}
              </Listbox.TextOption>
            </Listbox.Option>
          );
        })
      : null;

  const noResults = value && !getAllTags().includes(value);

  const actionMarkup = noResults ? (
    <Listbox.Action value={value}>{`Add "${value}"`}</Listbox.Action>
  ) : null;

  const emptyStateMarkup = optionMarkup ? null : (
    <EmptySearchResult
      title=""
      description={`No tags found matching "${value}"`}
    />
  );

  const listboxMarkup =
    optionMarkup || actionMarkup || emptyStateMarkup ? (
      <Listbox
        autoSelection="FIRST"
        onSelect={updateSelection}
      >
        {actionMarkup}
        {optionMarkup}
      </Listbox>
    ) : null;
  
    
  return (
    <Combobox
      allowMultiple
      activator={
        <Combobox.TextField
          autoComplete="off"
          label="Search tags"
          labelHidden
          value={value}
          suggestion={suggestion}
          placeholder="Type to search or add new tags"
          verticalContent={verticalContentMarkup}
          onChange={setValue}
        />
      }
    >
      {listboxMarkup}
    </Combobox>
  );
}

export class SelectTagCard extends React.Component {

  render() {
    const tagType = this.props.TagType;
    const existingTags = this.props.Content;

    return(
      <Card title={tagType + " Tags"} sectioned>
        <SelectTag TagType={tagType} ExistingTags={existingTags}></SelectTag>
      </Card>
    );
  }
}