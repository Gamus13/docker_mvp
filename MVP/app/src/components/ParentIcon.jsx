import React from 'react';
import Icon1 from './Icon1';
import Icon2 from './Icon2';
import Icon3 from './Icon3';
import PdfUpdateModal from './PdfUpdateModal';

const ParentIcon = () => {
    return (
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', }}>
            <Icon1 />
            <Icon2 />
            {/* <Icon3 /> */}
            {/* <PdfUpdateModal/> */}
        </div>
    );
};

export default ParentIcon;
