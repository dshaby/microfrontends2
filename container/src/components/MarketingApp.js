import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    //mount function is defined in marketing app
    //and we are passing the ref to html el into it
    mount(ref.current);
  }, []);

  //taking reference of html element
  //and passing it into div
  return <div ref={ref} />;
};
