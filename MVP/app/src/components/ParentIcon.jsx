// import React from 'react';
// import Icon1 from './Icon1';
// import Icon2 from './Icon2';
// import Icon3 from './Icon3';
// import PdfUpdateModal from './PdfUpdateModal';

// const ParentIcon = () => {
//     return (
//         <div style={{ display: 'flex', gap: '20px', marginTop: '20px', }}>
//             <Icon1 />
//             <Icon2 />
//             <Icon3 />
//             {/* <PdfUpdateModal/> */}
//         </div>
//     );
// };

// export default ParentIcon;

// src/components/ParentIcon.js
import React from 'react';
import Icon1 from './Icon1';
import Icon2 from './Icon2';
import Icon3 from './Icon3';
import { useVisibilityContext } from '../contexts/VisibilityContext';

const ParentIcon = () => {
  const { isIcon3Visible } = useVisibilityContext();

  return (
    <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
      <Icon1 />
      <Icon2 />
      {isIcon3Visible && <Icon3 />} {/* Affiche Icon3 seulement si isIcon3Visible est true */}
    </div>
  );
};

export default ParentIcon;
