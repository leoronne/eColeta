import React from 'react';
import { BeatLoader  } from 'react-spinners';

import './styles.css';

const Loader: React.FC = () => {
  return (
    <main className="Loader">
      <BeatLoader
        css={`
          display: block;
          margin: 0 auto;
          border-color: red;
        `}
        size={18}
        color="#34cb79"
      />
    </main>
  );
};
export default Loader;
