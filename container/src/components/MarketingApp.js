import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory();
  // this pulls the browser history object out of container app
  // it is a copy of the browser history object
  // it is what is used in the container app

  useEffect(() => {
    //mount function is defined in marketing app
    //and we are passing the ref to html el into it
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        //current pathname is the current path
        //and next pathname is the path that we are going to
        //if the path is different then only we will update the path
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
          // this updates the browser history object in container app
        }
      },
    });

    history.listen(onParentNavigate);
    // browser history has the same history object as used in marketing app
    // so we are listening to the history object in container app
    // and whenever the history object changes, we call onParentNavigate
    // and onParentNavigate will be called with the new pathname
    // and we will update the container's current pathname
    // with the new pathname
  }, []);

  //taking reference of html element
  //and passing it into div
  return <div ref={ref} />;
};
