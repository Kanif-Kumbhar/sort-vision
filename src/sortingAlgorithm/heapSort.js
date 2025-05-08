export function getHeapSortAnimations(array) {
	const animations = [];
	const n = array.length;
	const arr = array.slice(); // Make a copy so original is not modified

	// Build max heap
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		heapify(arr, n, i, animations);
	}

	// Extract elements from heap one by one
	for (let i = n - 1; i > 0; i--) {
		animations.push([0, i]); // Color swap
		animations.push([0, i]); // Revert color
		animations.push([0, arr[i]]); // Swap height
		animations.push([i, arr[0]]);
		[arr[0], arr[i]] = [arr[i], arr[0]];
		heapify(arr, i, 0, animations);
	}

	return animations;
}

function heapify(arr, n, i, animations) {
	let largest = i;
	const left = 2 * i + 1;
	const right = 2 * i + 2;

	if (left < n && arr[left] > arr[largest]) {
		largest = left;
	}
	if (right < n && arr[right] > arr[largest]) {
		largest = right;
	}

	if (largest !== i) {
		animations.push([i, largest]); // Color swap
		animations.push([i, largest]); // Revert color
		animations.push([i, arr[largest]]); // Swap height
		animations.push([largest, arr[i]]);
		[arr[i], arr[largest]] = [arr[largest], arr[i]];
		heapify(arr, n, largest, animations);
	}
}
