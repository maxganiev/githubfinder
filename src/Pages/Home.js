import { Fragment } from "react";
import {Section} from '../Components/Layout/Section';
import {Search} from '../Components/Layout/Search';

export const Home = ()=> (
  /**if a single parent element being returned from jsx, no need to return it: */
  <Fragment>
     <Search  />
    <Section />
  </Fragment>
  )
