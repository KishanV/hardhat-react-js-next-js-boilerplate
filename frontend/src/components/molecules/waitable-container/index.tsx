import React, { ReactNode } from "react";
import { Box, Flex } from "../../../css";

export function WaitableContainer(props: {
  loading?: boolean;
  waiter?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Box className={"w-full relative"}>
      <Box className={`${!props.loading || "opacity-0 pointer-events-none"}`}>
        {props.children}
      </Box>
      {props.loading && (
        <Flex
          className={
            "absolute w-full h-full ct-0 cl-0 items-center justify-center"
          }
        >
          {props.waiter}
        </Flex>
      )}
    </Box>
  );
}
