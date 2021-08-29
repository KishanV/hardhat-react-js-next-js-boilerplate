import { Box, Flex, Fill } from "../../../css";
import React from "react";
import { ReduxDispatch, ReduxType } from "../../../reducers";
import { NextRouter } from "next/dist/client/router";
const { Finance24 } = require("@carbon/icons-react");
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Header,
  HeaderName,
  Tooltip,
} from "carbon-components-react";
import { checkWeb3Connection } from "../../../utils/web3/Connection";
import Web3 from "web3";
import { stripText } from "../../../utils/common.fn";

type Props = {
  redux: ReduxType;
  reduxDispatch: ReduxDispatch;
  router: NextRouter;
};

type MenuItem = {
  name: string;
  path?: string;
  isSelected?: boolean;
};

export class PageContainer extends React.Component<Props, unknown> {
  constructor(props: Props) {
    super(props);
  }

  drawBreadcrumb() {
    return (
      <Flex className={"bg-white p-18"}>
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
        </Breadcrumb>
      </Flex>
    );
  }

  drawHeader() {
    return (
      <Header aria-label="IBM Platform Name">
        <Flex className={"flex-row w-full"}>
          <HeaderName href="#" prefix="">
            <Flex className={"items-center flex-row fill"}>
              <Finance24 className="text-white mr-6" />
              <Box className={"font-normal"}>Home</Box>
            </Flex>
          </HeaderName>
        </Flex>
      </Header>
    );
  }

  render() {
    return (
      <Flex className="h-full w-full absolute flex-col">
        <Fill className={"auto h-48"}>{this.drawHeader()}</Fill>
        {this.drawBreadcrumb()}
        <Flex className={"auto flex-row"}>
          <Flex className={"flex-col fill p-24 gap-6"}>
            {this.props.children}
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
