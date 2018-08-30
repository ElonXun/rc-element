import * as React from 'react';
import Carousel from '../src/carousel';
// import CarouselItem from '../src/carousel_item';
export interface ICarouselDemoStates {
    auto: boolean;
    content: string;
}
class CarouselDemo extends React.Component<{}, ICarouselDemoStates> {

    constructor(props: object) {
        super(props);
        this.state = {
            auto: true,
            content: '1',
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
        const content = this.state.content + new Date().getSeconds();
        this.setState({
            content
        });
    }

    public render() {
        return (
            <div className="App">
                <div style={{ width: '500px' }}>
                    <Carousel width={350} autoplay={this.state.auto}>
                        <div style={{ backgroundColor: '#ccc' }}><h3>4</h3></div>
                        <div style={{ backgroundColor: '#ccc' }}><h3>{this.state.content}</h3></div>
                        <div style={{ backgroundColor: '#ccc' }}><h3>2</h3></div>
                        <div style={{ backgroundColor: '#ccc' }}><h3>3</h3></div>
                        <div style={{ backgroundColor: '#ccc' }}><h3>4</h3></div>
                        <div style={{ backgroundColor: '#ccc' }}><h3>1</h3></div>
                    </Carousel>
                    <button onClick={this.handlerAutoPlay}>切换auto</button>
                    <button onClick={this.handleContent}>切换内容</button>
                </div>
            </div>
        );
    }
}

export default CarouselDemo;
