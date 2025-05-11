import { Fragment } from 'react';
import ScrollButton from './ScrollButtons';
import { Content, Heading } from './Styles';

export default function Buttom (){
    return (
        <Fragment>
        <Heading >GeeksForGeeks</Heading>
        <Content />
        <ScrollButton />
      </Fragment>
    )
}