import React from 'react';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css'; // Import Flickity CSS

const MyFlickityComponent = ({children}) => {
  // Options for Flickity
  const flickityOptions = {
    initialIndex: 0,
    cellAlign: 'right',
    wrapAround: true,
    autoPlay: 2500,
    lazyLoad: 1
    
  };

  return (
    <Flickity
      className={'carousel'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      reloadOnUpdate={true} // default false
      static={false} // default false
    >
      {
        children
      }
    </Flickity>
  );
};

export default MyFlickityComponent;
