import useAuth from "@/hooks/useAuth";
import { CardType } from "@/utils/Types";
import React, { ComponentType, ReactNode } from "react";

const withContext = (WrappedComponent: any) => {
  const WithContextComponent = (props: React.JSX.IntrinsicAttributes) => {
    const { auth } = useAuth();
    return <WrappedComponent {...props} auth={auth} />;
  };

  WithContextComponent.displayName = `WithContext(${WrappedComponent.displayName})`;

  return WithContextComponent;
};

export default withContext;
