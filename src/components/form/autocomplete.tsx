import { Autocomplete, AutocompleteProps } from '@mantine/core'
import React from 'react'

export const AutoComplete = (props: AutocompleteProps) => {
  return (
    <Autocomplete
      {...props}
      styles={{
        dropdown: { padding: 0 },
        option: { display: 'block', padding: 0 },
      }}
    />
  )
}
