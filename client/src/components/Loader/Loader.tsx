import { ClipLoader } from "react-spinners"
import { css, SerializedStyles } from '@emotion/react'
import React from "react";
import './Loader.css'
const override = css`
  display: flex;
  align-items: 
  margin: 0 auto;
  border-color: red;
  
`;

interface ClipLoaderProps extends React.ComponentProps<typeof ClipLoader>  {
 css?: SerializedStyles,
};

const MyClipLoader: React.FC<ClipLoaderProps> = (props) => {
    return <ClipLoader {...props} />
}
export const SmallLoader = () => {
  return (
    <MyClipLoader color={'#36D7B7'} loading={true} css={override} size={15} />
  ) 
}


export const SmallBlack = () => {
  return (
    <MyClipLoader color={'#4e4d4d'} loading={true} css={override} size={15} />
  ) 
}

export const CustomColorLoader = ({color}: any) => {
  return (
    <MyClipLoader color={color} loading={true} css={override} size={15} />
  ) 
}

export const BigLoader = () => {
  return (
    <MyClipLoader color={'#4e4d4d'} loading={true} css={override}  size={100} />
  )
}

export const MainLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
          <div className="loader"></div>
        </div>
  )
}





