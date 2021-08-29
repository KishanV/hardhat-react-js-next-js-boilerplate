import React from "react";

export const SingleElement = <T, K extends keyof T>(param: {
  className: string;
  styles?: T;
  wrapper?: React.FunctionComponent;
}) => {
  return (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > & {
      variant?: K;
    }
  ) => {
    const element = (
      <div
        {...props}
        className={`${param.className} ${props.className || ""} ${
          props.variant && param.styles ? param.styles[props.variant] : ""
        }`}
      >
        {props.children}
      </div>
    );
    const Wrapper = param.wrapper;
    if (Wrapper) {
      return <Wrapper>{element}</Wrapper>;
    } else {
      return element;
    }
  };
};
