import React from "react";
import { Box, Fill, Flex } from "../css";
import { PageProps } from "./_app";

type State = {};

export default class Page extends React.Component<PageProps, State> {
  state: State = {};

  render() {
    return (
      <Box className="h-full w-full gap-6 flex-col grid grid-cols-2">
        Hello world
      </Box>
    );
  }
}
