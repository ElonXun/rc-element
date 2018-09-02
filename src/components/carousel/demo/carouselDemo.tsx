import * as React from 'react';
import Carousel from '../src/carousel';
// import CarouselItem from '../src/carousel_item';
export interface ICarouselDemoStates {
    auto: boolean;
    content: string;
    defaultArray: string[];
}
class CarouselDemo extends React.Component<{}, ICarouselDemoStates> {

    constructor(props: object) {
        super(props);
        this.state = {
            auto: false,
            content: '1',
            defaultArray: ['1', '2', '3', '4'],
        }
    }

    public handlerAutoPlay = () => {
        const auto = !this.state.auto;
        console.log('切换后', auto);
        this.setState({
            auto
        })
    }

    public handleContent = () => {
        const arr = this.state.defaultArray.map((item) => {
            return item + new Date().getSeconds();
        });
        this.setState({
            defaultArray: arr,
        });
    }

    public render() {
        return (
            <div className="App">
                <div style={{ width: '400px' }}>
                    <Carousel autoplay={this.state.auto}>
                        {
                            this.state.defaultArray.map((item, index) => {
                                return (
                                    <div style={{ backgroundColor: '#ccc' }} key={index}><h3>{item}</h3></div>
                                );
                            })
                        }
                    </Carousel>
                    <button onClick={this.handlerAutoPlay}>切换auto</button>
                    <button onClick={this.handleContent}>切换内容</button>
                </div>
            </div>
        );
    }
}

export default CarouselDemo;
