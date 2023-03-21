import { Puff, InfinitySpin } from "react-loader-spinner";

export const LineLoader = () => {
  return (
    <Puff
      height="25"
      width="80"
      radius={1}
      color="#fff"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export const InfinitySpinner = () => {
  return <InfinitySpin width="80" color="#4fa94d" />;
};
