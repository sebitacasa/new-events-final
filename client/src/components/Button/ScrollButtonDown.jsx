import React, {Component} from 'react'
import ScrollButton from 'react-scroll-button'
 
export default class ScrollComponent extends Component {
    render() {
        return (
            <ScrollButton 
                behavior={'smooth'} 
                buttonBackgroundColor={'black'}
                iconType={'arrow-up'}
                style= {{fontSize: '24px'}}
                
            />
        );
    }
}