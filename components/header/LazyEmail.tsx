import React from 'react';
import { poppins } from '@/app/fonts';

interface SidebarFooterContent {
  name: string;
  email: string;
  emailRef: string;
}

interface LazyEmailProps {
  sidebarFooterContent: SidebarFooterContent;
}

function LazyEmail({ sidebarFooterContent }: LazyEmailProps) {
  return (
    <div className="author">
      <div className="inner">
        <div className="image">
          <div
            className="main"
            style={{
              backgroundImage: 'url(img/svg/envelope11.svg)',
              border: 'none',
            }}
          ></div>
        </div>

        <div className="short">
          <h2 className={poppins.className}>{sidebarFooterContent.name}</h2>
          <a href={sidebarFooterContent.emailRef} className={poppins.className}>
            {sidebarFooterContent.email}
          </a>
        </div>
      </div>
    </div>
  );
}

export default LazyEmail;
