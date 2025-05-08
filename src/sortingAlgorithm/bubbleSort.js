export function getBubbleSortAnimations(array) {
	const animations = [];
	const n = array.length;
	const arr = array.slice();
	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			// Step 1: Push indices being compared
			animations.push([j, j + 1]);
			// Step 2: Push again to revert color
			animations.push([j, j + 1]);

			if (arr[j] > arr[j + 1]) {
				// Step 3: Push swap info
				animations.push([j, arr[j + 1]]);
				animations.push([j + 1, arr[j]]);
				// Perform actual swap in the copy
				const temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			} else {
				// Still need to push dummy height updates for consistent timing
				animations.push([-1, -1]);
				animations.push([-1, -1]);
			}
		}
	}
	return animations;
}
