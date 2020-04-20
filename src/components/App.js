import React, {Component} from 'react';
import DeckEffect from "./DeckEffect";
import FlashcardHeader from "./FlashcardHeader";
import styled, { keyframes, css } from 'styled-components';
import ReactCardFlip from 'react-card-flip';
import Card from './Card';
import { axiosWithAuth } from "../utils/axiosWithAuth";

import * as animations from 'react-animations';

const BouncyDiv = styled.div`
  ${({animation}) => {
  	if(animation){
	    const anim = keyframes`${animations[animation]}`;
	    return css`animation: 1s ${anim};`
    }}};
  height: 100%;
`;

const AppStyled = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
`;

const Container =  styled.div`  
    display: flex;
	padding: 30px;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
`;

const FixedDeckEffect = styled(DeckEffect)`
	max-width: 600px;
	max-height: 400px;
	
	.react-card-flip,
	.react-card-flipper,
	.react-card-front,
	.react-card-back{
		height: 100%;
	}
`;

const Loading = styled.h4`
	color: white;
`;

export default class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			isFlipped: false,
			isLoading: true,
			cards:[],
			selectedCardIndex: 0,
			animation: ''
		};

		this.handleFlip = this.handleFlip.bind(this);
		this.handleNextCard = this.handleNextCard.bind(this);
		this.handlePreviousCard = this.handlePreviousCard.bind(this);
		this.handleRandomCard = this.handleRandomCard.bind(this);
	}

	componentDidMount() {
		axiosWithAuth()
		.get("/flashcards").then(res => {
			const cards = res.data;
			this.setState({ isLoading: false,
				cards: [...cards] });
			console.log(cards)
		  })
	  }

	handleFlip(){
		this.setState({
			isFlipped: !this.state.isFlipped
		});
	}

	handleNextCard(){
		const {selectedCardIndex, cards} = this.state;
		const index = selectedCardIndex + 1 >= cards.length ? 0 : selectedCardIndex + 1;
		this._unFlipAndChangeIndex(index, 'bounceOutRight');
	}

	handlePreviousCard(){
		const {selectedCardIndex, cards} = this.state;
		const index = selectedCardIndex - 1 < 0 ? cards.length - 1 : selectedCardIndex - 1;
		this._unFlipAndChangeIndex(index, 'bounceOutLeft');
	}

	handleRandomCard(){
		const max = this.state.cards.length - 1;
		const index = Math.floor(Math.random() * (max));
		this._unFlipAndChangeIndex(index, 'hinge');
	}

	_unFlipAndChangeIndex(index, animation){
		this.setState({
			animation: animation,
			isFlipped: false
		}, () => {
			setTimeout(() => {
				this.setState({
					animation: '',
					selectedCardIndex: index
				});
			}, 1000);
		});
	};

	render(){
		return (
			<AppStyled>
				<FlashcardHeader title="Education Flashcards"
						onNext={this.handleNextCard}
				        onPrev={this.handlePreviousCard}
				        onRandom={this.handleRandomCard}
				/>
				<Container>
					{this.state.isLoading ? this.renderLoading() : this.renderCard()}
				</Container>
			</AppStyled>
		)
	}

	renderCard() {
		const card = this.state.cards[this.state.selectedCardIndex];
		return (
			<FixedDeckEffect>
				<BouncyDiv animation={this.state.animation}>
					<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
						<Card key="front" onFlip={this.handleFlip}>{card.frontCard}</Card>
						<Card key="back" onFlip={this.handleFlip}>{card.backCard}</Card>
					</ReactCardFlip>
				</BouncyDiv>
			</FixedDeckEffect>
			
		)
	}

	renderLoading() {
		return (
			<Loading>Loading...</Loading>
		);
	}
};