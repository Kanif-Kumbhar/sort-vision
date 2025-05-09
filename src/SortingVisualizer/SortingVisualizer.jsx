import React from "react";
import { getMergeSortAnimations } from "../sortingAlgorithm/mergeSort.js";
import { getBubbleSortAnimations } from "../sortingAlgorithm/bubbleSort.js";
import { getHeapSortAnimations } from "../sortingAlgorithm/heapSort.js";
import { getQuickSortAnimations } from "../sortingAlgorithm/quickSort.js";
import "./SortingVisualizer.css";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
		};
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		const array = [];
		for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
			array.push(randomIntFromInterval(5, 530));
		}
		this.setState({ array });
	}

	mergeSort() {
		const animations = getMergeSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("array-bar");
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else {
				setTimeout(() => {
					const [barOneIdx, newHeight] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	quickSort() {
		const animations = getQuickSortAnimations(this.state.array);
		const arrayBars = document.getElementsByClassName("array-bar");

		for (let i = 0; i < animations.length; i++) {
			const [action, barOneIdx, barTwoOrHeight] = animations[i];
			const barOneStyle = arrayBars[barOneIdx]?.style;
			const barTwoStyle = arrayBars[barTwoOrHeight]?.style;

			if (action === "compare" || action === "revert") {
				const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					if (barOneStyle) barOneStyle.backgroundColor = color;
					if (barTwoStyle) barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else if (action === "swap") {
				setTimeout(() => {
					if (barOneStyle) barOneStyle.height = `${barTwoOrHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	heapSort() {
		const animations = getHeapSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("array-bar");
			const isColorChange = i % 4 < 2;

			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				if (barOneIdx === -1 || barTwoIdx === -1) continue;
				const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					arrayBars[barOneIdx].style.backgroundColor = color;
					arrayBars[barTwoIdx].style.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barIdx, newHeight] = animations[i];
				if (barIdx === -1) continue;
				setTimeout(() => {
					const barStyle = arrayBars[barIdx].style;
					barStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	bubbleSort() {
		const animations = getBubbleSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("array-bar");
			const isColorChange = i % 4 < 2;

			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				if (barOneIdx === -1 || barTwoIdx === -1) continue;
				const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					arrayBars[barOneIdx].style.backgroundColor = color;
					arrayBars[barTwoIdx].style.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else {
				const [barIdx, newHeight] = animations[i];
				if (barIdx === -1) continue;
				setTimeout(() => {
					const barStyle = arrayBars[barIdx].style;
					barStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	render() {
		const { array } = this.state;

		return (
			<div className="container">
				<div className="array-container">
					{array.map((value, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{
								backgroundColor: PRIMARY_COLOR,
								height: `${value}px`,
							}}
						></div>
					))}
				</div>
				<div className="button-container">
					<button onClick={() => this.resetArray()}>Generate New Array</button>
					<button onClick={() => this.mergeSort()}>Merge Sort</button>
					<button onClick={() => this.quickSort()}>Quick Sort</button>
					<button onClick={() => this.heapSort()}>Heap Sort</button>
					<button onClick={() => this.bubbleSort()}>Bubble Sort</button>
				</div>
			</div>
		);
	}
}

function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}