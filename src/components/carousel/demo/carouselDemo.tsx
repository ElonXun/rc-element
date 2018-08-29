import * as React from 'react';
import Carousel from '../src/carousel';
// import CarouselItem from '../src/carousel_item';

class CarouselDemo extends React.Component<{}, {}> {

    constructor(props: object) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return (
            <div className="App">
                <div style={{ width: '500px' }}>
                    <Carousel width={350}>
                        <div style={{ backgroundColor: '#ccc' }}><h3>4</h3></div>
                        <div style={{ backgroundColor: '#ccc' }}><h3>1</h3></div>
                        <div style={{ backgroundColor: '#ccc' }}><h3>2</h3></div>
                        <div style={{ backgroundColor: '#ccc' }}><h3>3</h3></div>
                        <div style={{ backgroundColor: '#ccc' }}><h3>4</h3></div>
                        <div style={{ backgroundColor: '#ccc' }}><h3>1</h3></div>
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default CarouselDemo;
