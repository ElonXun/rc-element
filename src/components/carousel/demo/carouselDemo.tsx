import * as React from 'react';
import Carousel from '../src/carousel';
import CarouselItem from '../src/carousel_item';

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
                    <Carousel>
                        <CarouselItem />
                    </Carousel>
                </div>          
            </div>
        );
    }
}

export default CarouselDemo;
