import React from 'react';
import { Button } from 'reactstrap';
import { DotLoader } from 'react-spinners';

interface ButtonLoaderProps {
  loading: boolean;
  func: any;
  size: number;
  color: string;
  defaultText: any;
  height: number;
}
const ButtonLoader: React.FC<ButtonLoaderProps> = (props) => {
  return (
    <>
      <Button className={`round-button full-button full-button-${props.height}`} type="button" onClick={props.func} disabled={props.loading}>
        {props.loading ? (
          <DotLoader
            css={`
              display: block;
              margin: 0 auto;
              border-color: red;
            `}
            size={props.size}
            color={props.color}
          />
        ) : (
          props.defaultText
        )}
      </Button>
    </>
  );
};

export default ButtonLoader;
